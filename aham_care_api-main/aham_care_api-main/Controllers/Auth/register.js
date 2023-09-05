const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/JWT");
const User = require("../../models/user");
const { dosms, otpVerify } = require("../../lib/OTP");

module.exports = {
  register: async (req, res) => {
    try {
      const userDetails = req.body;
      const existingUser = await User.findOne({ email: userDetails.email });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "This email address already exists" });
      }

      const cryptedPassword = await bcrypt.hash(userDetails.password, 12);

      const saveUser = await new User({
        name: userDetails.name,
        email: userDetails.email,
        phone_no: userDetails.phone_no,
        password: cryptedPassword,
        image: `${req.file.destination}` + `${req.file.filename}`
      }).save();

      const accessToken = generateAccessToken({ id: saveUser._id });
      const refreshToken = generateRefreshToken({ id: saveUser._id });

      res.send({
        user: saveUser,
        accessToken,
        refreshToken,
        message: "Registretion successfully completed",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    console.log(req);
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        res.status(401).json({ message: "Email does not exist" });
      }

      const check = await bcrypt.compare(password, user.password);

      if (!check) {
        return res.status(401).send({ message: "Incorrect Password" });
      }

      const accessToken = generateAccessToken({ id: user._id });
      const refreshToken = generateRefreshToken({ id: user._id });

      res.status(200).json({
        user,
        accessToken,
        refreshToken,
        message: "Login successfully",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOtp: async (req, res) => {
    console.log(req);
    try {
      const { phone_no } = req.body;
      const sms = await dosms(phone_no);
      res.send(sms);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { phone_no, otp } = req.body;
      const verify = await otpVerify(otp, phone_no);
      if (!verify) {
        return res.status(400).json({ message: "invalid otp number" });
      }

      res.status(200).json({ otp: true, message: "Success" });
    } catch (error) { }
  },
};
