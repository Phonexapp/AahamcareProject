const Organization = require("../../models/organaization");

module.exports = {
  getAllorganaization: async (req, res) => {
    try {
      const { typeId } = req.params;
      const organization = await Organization.find({typeId}).sort({
        createdAt: -1,
      });

      res.status(200).json({organization})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrganaizationById: async (req, res) => {
    try {
        const {orgId} =req.params;
        console.log(orgId);
        const organization = await Organization.findById(orgId).populate({
          path: 'residence',
          match: { status: 'Active' }
        })
        .sort({ createdAt: -1 })
        .populate({
          path: 'requirement',
          match: { status: 'Active' }
        })
        .sort({ createdAt: -1 });
        res.status(200).json({ organization});
        
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
