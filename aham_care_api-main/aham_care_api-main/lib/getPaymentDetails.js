const Razorpay = require("razorpay");

module.exports = async (paymentId) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    console.log(paymentId);
    const paymentDetails = await razorpay.payments.fetch(paymentId);
    return paymentDetails;
  } catch (error) {
    console.log(error);
  }
};
