const OrgOrders = require("../../../models/donation");
const EventOrders = require("../../../models/eventDonation");
const StoreOrders = require("../../../models/storeDonation");

module.exports = {
  // Organization Orders
  getAllOrgOrders: async (req, res) => {
    try {
      const organizationOrders = await OrgOrders.find()
        .populate("organaizationId")
        .populate("userId");


        console.log(organizationOrders)
      res.status(200).json(organizationOrders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrgOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await OrgOrders.findById(id)
        .populate("organaizationId")
        .populate("userId")
        
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllstoreOrders: async (req, res) => {
    try {
      const storeOrders = await StoreOrders.find()
        .populate("userId")
        .populate("storeId")
        .sort({ createdAt: -1 });

      res.status(200).json(storeOrders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllEventOrders: async (req, res) => {
    try {
      const eventOrders = await EventOrders.find()
        .populate("userId")
        .populate("eventId")
        .sort({ createdAt: -1 });
        res.status(200).json(eventOrders)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
