const axios = require('axios');

module.exports = async (req,res)=>{

const pan = 'HADPP5442R'; // PAN card number
const dob = '19/05/1998'; // Date of birth in the format DD/MM/YYYY
const mobile = '6238266413'; // Registered mobile number

const otpUrl = `https://incometaxindiaefiling.gov.in/e-Filing/Services/OTP/GenerateOTP?pan=${pan}&dob=${dob}&mobileNo=${mobile}&requestType=1&otpType=2`;

axios.get(otpUrl)
  .then((response) => {
    const txnId = response.data.txnId; // Extract the transaction ID from the response
    console.log(`Transaction ID: ${txnId}`);
    res.send(`Transaction ID: ${txnId}`)
  })
  .catch((error) => {
    console.log(error);
    res.send(error)
  });
}