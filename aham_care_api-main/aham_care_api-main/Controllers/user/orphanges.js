const Orphange = require("../../models/organaization");

module.exports = {
  getAllOrphanage: async (req, res) => {
    try {
      const orphanges = await Orphange.find({ type: "Orphanage" })
        .populate("residence").sort({createdAt:-1})
        .populate("requirement").sort({createdAt:-1});

      res.status(200).json({orphanges})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrphangeById: async (req, res) => {
    try {
      const { id } = req.params;
      const orphange = await Orphange.findById(id)
        .populate("residence")
        .sort({ createdAt: -1 })
        .populate("requirement")
        .sort({ createdAt: -1 });
      res.status(200).json({ orphange });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
