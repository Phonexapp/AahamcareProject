const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { dosms, otpVerify } = require("../../lib/OTP");

module.exports = {
  verifyUser: async (req, res) => {
    try {
      const { phone_no } = req.body;
      const user = await User.findOne({ phone_no: phone_no });
      if (!user) {
        res.status(404).json({ message: "User does not exist" });
      }
      await dosms(phone_no);

      res.status(200).json({ message: "OTP send to the phone number" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { body } = req;
      const otp = await otpVerify(body?.otp, body?.phone_no);

      if (!otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      const cryptedPassword = await bcrypt.hash(body?.newPassword, 12);

      const resetPassword = await User.findOneAndUpdate(
        { phone_no: body.phone_no },
        { password: cryptedPassword },
        { new: true }
      );

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
