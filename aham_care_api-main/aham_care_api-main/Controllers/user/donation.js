const Donation = require("../../models/donation");
const Requirement = require("../../models/requirment");
const User = require("../../models/user");
const { sendMail } = require("../../lib/regardMail");
const getPaymentDetails = require("../../lib/getPaymentDetails");
const chechPaymentAmount = require("../../lib/compareWithTolerance");
const generateInvoice = require("../../lib/generateInvoiceNo");
const user = require("../../models/user");
const Orgnaization = require("../../models/organaization");

module.exports = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.user;

    const invoiceNo = await generateInvoice();
    const paymentDetails = await getPaymentDetails(body?.paymentId);

    if (!paymentDetails) {
      res.status(400).json({ message: "invalid payment id" });
    }

    const { organization } = await Requirement.findById(
      body?.donatedItems[0]?.id
    );

    let grandTotal = 0;

    // Analyse Order Details
    const donatedItems = await Promise.all(
      body?.donatedItems.map(async (item) => {
        console.log("item", item);
        const requirement = await Requirement.findById(item?.id);
        const price = requirement?.unitPrice * item?.count;
        grandTotal = +price;

        const Items = {
          requirmentId: requirement._id,
          item: requirement?.item,
          quantity: item?.count,
          unitPrice: requirement?.unitPrice,
          totalPrice: price,
        };

        const updatedRequirement = await Requirement.findByIdAndUpdate(
          item?.id,
          {
            needs: requirement.needs - item?.count,
            balancePrice: requirement?.balancePrice - price,
          },
          { new: true }
        );

        if (0 >= updatedRequirement.needs) {
          await Requirement.findByIdAndUpdate(
            item.id,
            {
              status: "Fulfilled",
            },
            { new: true }
          );
        }

        console.log(updatedRequirement, "up");

        return Items;
      })
    );

    // Verify Amount
    const isAmountCurect = await chechPaymentAmount(
      grandTotal,
      paymentDetails?.amount / 100
    );
    console.log(isAmountCurect);

    // Save Donation Order Information
    const savedDonation = await new Donation({
      organaizationId: organization,
      userId: id,
      invoiceNo,
      donatedItems,
      totalPrice: grandTotal,
      paymentId: body.paymentId,
    }).save();

    // Push Donation To Organaization
    await Orgnaization.findByIdAndUpdate(savedDonation.organaizationId, {
      $push: { donations: savedDonation._id },
    });

    // Send Email Notification
    const { email, name } = await User.findById(id);
    const eMail = await sendMail(
      email,
      "Heartfelt Thanks for Your Donation via AahamCare",
      name,
      body?.totalPrice || '0',
      "org-invoice",
      savedDonation._id
    );

    let message = "";
    if (eMail) {
      console.log("email send successful");
      message = ",Please check your email";
    } else {
      console.log("email failed");
    }

    res
      .status(200)
      .json(`Heartfelt Thanks for Your Donation via AahamCare ${message}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
