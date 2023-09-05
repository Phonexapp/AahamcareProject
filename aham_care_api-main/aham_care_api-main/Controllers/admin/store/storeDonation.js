const StoreDonations = require("../../../models/storeDonation");

module.exports = {
  getStoreDonationById: async (req, res) => {
    try {
        console.log('ssssss');
      const { id } = req.params;
      console.log('id=========>', id);
      const donationDetails = await StoreDonations.findById(id)
        .populate("userId")
        .populate("storeId");

        console.log("donationDetails",donationDetails );
        res.status(200).json(donationDetails)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  },
};
