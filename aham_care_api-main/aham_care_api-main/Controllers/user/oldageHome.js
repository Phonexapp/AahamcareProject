const OldageHome = require("../../models/organaization");

module.exports = {
  getAllOldageHome: async (req, res) => {
    try {
      
      const oldAgeHomes = await OldageHome.find({ type: "Oldage Home" })
        .populate("residence")
        .sort({ createdAt: -1 })
        .populate("requirement")
        .sort({ createdAt: -1 });

      res.status(200).json({ oldAgeHomes });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOldageHomeById: async (req, res) => {
    try {
      const { id } = req.params;
      const oldAgeHome = await OldageHome.findById(id)
        .populate("residence")
        .sort({ createdAt: -1 })
        .populate("requirement")
        .sort({ createdAt: -1 });
      res.status(200).json({ oldAgeHome });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
