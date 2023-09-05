const EventDonation = require("../../models/eventDonation");
const Event = require("../../models/event");
const generateInvoiceNo = require("../../lib/generateInvoiceNo");
const getPaymentDetails = require("../../lib/getPaymentDetails");
const checkPaymentAmount = require("../../lib/compareWithTolerance");

  module.exports = async (req, res) => {
  try {
    const { body } = req;
    const event = await Event.findById(body.eventId);
    const userId = req?.user?.id

    if (event?.remainingTickets <= 0) {
      return res.status(400).json({ message: "No more tickets available" });
    }

    if (event?.remainingTickets < body.donatedTickets) {
      return res
        .status(400)
        .json({ message: `only ${event?.remainingTickets} tickets are available` });
    }

    const invoiceNo= await generateInvoiceNo()
    const paymentDetails = await getPaymentDetails(body?.paymentId);
    const grandTotal = event?.unitPrice * body?.count

    const isAmountCurect = await checkPaymentAmount(
      grandTotal,
      paymentDetails?.amount / 100
    );

    if (!isAmountCurect) {
      console.log('Amount not crct');
    }



    const savedEventDonation = await new EventDonation({
      userId,
      eventId: body?.eventId,
      paymentId: body?.paymentId,
      donatedTickets: body?.count,
      totalAmount: grandTotal,
      invoiceNo,
      unitPrice:event?.unitPrice,
    }).save();

    const updatedEvent = await Event.findByIdAndUpdate(
      savedEventDonation.eventId,
      {
        $push: { donations: savedEventDonation._id },
        $set: {
          remainingTickets:
            event ?. remainingTickets - savedEventDonation.donatedTickets,
            balancePrice:event.balancePrice - grandTotal
        },
      },
      { new: true }
    );

    if(updatedEvent?.remainingTickets <= 0){
      await Event.findByIdAndUpdate(updatedEvent._id,{
        status:'Fullfilled'
      })
    }

    res.status(200).json({ message: "Thankyou for your donation" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
