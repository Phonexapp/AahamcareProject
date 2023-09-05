const User = require("../../models/user");
const Donations = require("../../models/donation");
const EventDonation = require("../../models/eventDonation");
const StoreDonation = require("../../models/storeDonation");
const deleteFile = require("../../lib/deleteFiles");
const { dosms, otpVerify } = require("../../lib/OTP");
const uploadedFiles = require("../../utils/uploads/uploadFiles");
const deleteCloudeFiles = require("../../utils/uploads/deleteCloudeFile");
const organaization = require("../../models/organaization");
const bcrypt = require("bcrypt");

module.exports = {
  getProfileById: async (req, res) => {
    try {
      const Id = req.params.id;
      const user = await User.findById(Id);
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  editProfile: async (req, res) => {
    console.log(req);
    try {
      const id = req.params.id;
      const { body } = req;

      const updatedProfile = await User.findByIdAndUpdate(
        id,
        {
          name: body?.name,
          email: body?.email,
          phone_no: body?.phone_no,
          dateOfBirth: body?.dateOfBirth,
          address: body?.address,
          work: body?.work,
          panCardNo: body?.panCardNo,
          aadharNo: body?.aadharNo,
          image: `${req.file.destination}` + `${req.file.filename}`
        },
        { new: true }
      );
      // if (file) {
      //   const uploadedFile = await uploadedFiles(file);
      //   const updateProfileImage = await User.findByIdAndUpdate(id, {
      //     profilePicture: uploadedFile[0].path,
      //   });

      //   const respo = await deleteCloudeFiles(updatedProfile?.profilePicture);
      //   await deleteFile("public" + uploadedFile[0].path);
      // }

      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getDonations: async (req, res) => {
    try {
      console.log("donations");
      // const { id } = req.params;
      const id = req.user.id;
      const donations = await Donations.find({ userId: id })
        .populate({
          path: "organaizationId",
          select: "name",
        })
        .select("organaizationId  totalPrice createdAt");
      const storeDonation = await StoreDonation.find({ userId: id })
        .populate({ path: "storeId", select: "item" })
        .select("storeId  totalPrice createdAt");
      const eventDonation = await EventDonation.find({ userId: id })
        .populate({ path: "eventId", select: "event" })
        .select("eventId totalAmount createdAt");

      const orgDon = donations.map((item) => ({
        _id: item?._id,
        name: item?.organaizationId?.name,
        totalPrice: item?.totalPrice,
        createdAt: item?.createdAt,
        type: "organaization",
      }));
      const evnDon = eventDonation.map((item) => ({
        _id: item?._id,
        name: item?.eventId.event,
        totalPrice: item?.totalAmount,
        createdAt: item?.createdAt,
        type: "event",
      }));

      const strDon = storeDonation.map((item) => ({
        _id: item?._id,
        name: item?.storeId.event,
        totalPrice: item?.totalPrice,
        createdAt: item?.createdAt,
        type: "store",
      }));
      let allDonations = [...orgDon, ...evnDon, ...strDon];

      allDonations.sort(
        (a, b) => new Date(a.createdAt) + new Date(b.createdAt)
      );
      res.status(200).json({ allDonations });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.user;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const check = await bcrypt.compare(body.password, user.password);

      if (!check) {
        return res.status(404).json({ message: "Invalid password" });
      }

      const cryptedPassword = await bcrypt.hash(body.newPassword, 12);

      const changePassword = await User.findByIdAndUpdate(id, {
        password: cryptedPassword,
      });

      res.status(200).json({ message: "Password changed" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
