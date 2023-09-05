const Requirement = require("../../../../models/requirment");
const Organization = require("../../../../models/organaization");

module.exports = {
  addRequirement: async (req, res) => {
    try {
      const { orgId } = req.params;
      const { body } = req;
      const reuirement = await new Requirement({
        organization: orgId,
        item: body.item,
        requirement: body.requirement,
        requirementUnit: body.requirementUnit,
        totalPrice: body.totalPrice,
        unitPrice: body.unitPrice,
        needs: body.requirement,
        balancePrice:body.totalPrice,
      }).save();

      const organaization = await Organization.findByIdAndUpdate(
        orgId,
        {
          $push: { requirement: reuirement._id },
        },
        { new: true }
      );
      console.log(organaization);
      res.status(200).json({ message: "Requirement added successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  getRequiremnt: async (req, res) => {
    try {
      const { orgId } = req.params;
      const { requirement } = await Organization.findById(orgId)
        .populate("requirement")
        .sort({ createdAt: -1 });
      if (!requirement) {
        return res.status(404).json({ message: "Organaization not found" });
      }
      res.status(200).json(requirement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { reqId } = req.params;
      const { status } = req.body;
      console.log(status);

      console.log(reqId);
      const updateStatus = await Requirement.findByIdAndUpdate(
        reqId,
        {
          status: status,
        },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Status updated successfully", updateStatus });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { reqId } = req.params;
      const requirement = await Requirement.findById(reqId);
      res.status(200).json(requirement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateRequirement: async (req, res) => {
    try {
      const { reqId } = req.params;
      const { body } = req;
      console.log(body);
      await Requirement.findByIdAndUpdate(reqId, {
        item: body.item,
        requirement: body.requirement,
        requirementUnit: body.requirementUnit,
        totalPrice: body.totalPrice,
        unitPrice: body.unitPrice,
        needs: body.requirement,
        
      });
      res.status(200).json({ message: "Requirement updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
