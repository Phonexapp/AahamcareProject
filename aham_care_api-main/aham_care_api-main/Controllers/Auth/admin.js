const bcrypt = require("bcrypt");
const {
    generateAccessToken,
    generateRefreshToken,
  } = require("../../utils/JWT");
  const Admin = require("../../models/Admin");
  
  
  module.exports = {
    register: async (req, res) => {
      try {
        const {body} = req;
        const existingEmail = await Admin.findOne({ email: body.email });
  
        if (existingEmail) {
          return res
            .status(400)
            .json({ message: "This email is already exists" });
        }

        const cryptedPassword = await bcrypt.hash(body.password, 12);
  
        const newAdmin = await new Admin({
          email:body.email,
          password:cryptedPassword,
        })
  
        const accessToken = generateAccessToken({ id: newAdmin._id });
        const refreshToken = generateRefreshToken({ id: newAdmin._id });
  
        await newAdmin.save();
  
        res.send({
          user: newAdmin,
          accessToken,
          refreshToken,
          message: "Registretion successfully completed",
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  
    login: async (req, res) => {
        try {
          const { email, password } = req.body;
          const user = await Admin.findOne({ email });
    
          if (!user) {
            return res.status(401).json({ message: "Email does not exist" });
          }
    
          const check = await bcrypt.compare(password, user.password);
    
          if (!check) {
            return res.status(401).json({ message: "Incorrect Password" });
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
  
  };
  