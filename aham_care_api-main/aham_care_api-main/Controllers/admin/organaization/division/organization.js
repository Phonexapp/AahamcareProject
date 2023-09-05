const Organaization = require("../../../../models/organaization");

module.exports = {
  getOrgnaizationByType: async (req, res) => {
    const { typeId } = req.params;
    
    try {
      const organaizations = await Organaization.find({ typeId });
      res.status(200).json(organaizations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrgnaizationById: async (req, res) => {
    try {
      const { id } = req.params;
      const organaization = await Organaization.findById(id);
      if (!organaization) {
        return res.status(404).json({ message: "Organaization not found" });
      }
      res.status(200).json(organaization);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

 
};
