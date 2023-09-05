const Store = require("../../models/store");
const StoreDonation = require("../../models/storeDonation");
const generateInvoiceNo = require("../../lib/generateInvoiceNo");
const getPaymentDetails = require("../../lib/getPaymentDetails");
const checkPaymentAmount = require("../../lib/compareWithTolerance");

module.exports = async (req, res) => {
  try {
    const { body } = req;
    const {id} = req.user

    const store = await Store.findById(body.storeId);
    const paymentDetails = await getPaymentDetails(body?.paymentId);

    if(!paymentDetails){
      return res.status(500).json({message:"Invalid paymentId"})
    }

    if(store?.remaining <= 0 ){
        return res.status(200).json({message:"This is full filled"})
    }
    console.log("->",paymentDetails)

    if(store?.remaining < body?.paymentDetails?.amount){
        return res.status(400).json({message:`we want only ${store?.remaining} rupees`} )
    }
    const invoiceNo= await generateInvoiceNo()
    const grandTotal = store?.unitPrice * body?.count

    console.log(grandTotal,"GT");

    const isAmountCurect = await checkPaymentAmount(
      grandTotal,
      paymentDetails?.amount / 100
    );

    if(!isAmountCurect) {
      res.status(400).json({message:"Amount is not current"})
    }

    console.log(isAmountCurect,'is');

    const savedStoreDonation = await new StoreDonation({
      userId: id,
      storeId: body.storeId,
      paymentId: body.paymentId,
      donatedAmount: grandTotal,
      count : body?.count,
      unitPrice: store?.unitPrice,
      invoiceNo,
    }).save();

    const addDonationToStore = await Store.findByIdAndUpdate(savedStoreDonation.storeId, {
      $push: { donations: savedStoreDonation._id },
      $set: {remaining:store?.remaining - savedStoreDonation.count, remainingPrice:store?.remainingPrice - grandTotal }
    });

    res.status(200).json({message:"Thankyou"})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
