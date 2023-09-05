const { response } = require("express");
const DivisionSchema = require("../../../../models/division");
module.exports = {
  createDivison: async (req, res) => {
    try {
      const { body } = req;
      const division = await DivisionSchema.find();
      const savedDivision = await new DivisionSchema({
        name: body.name,
        discription: body.discription,
        order: division.length,
      }).save();

      res.status(200).json({ message: "Division Added Successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllDivision: async (req, res) => {
    try {
      const allDivisions = await DivisionSchema.find().sort({ order: 1 });
      res.status(200).json(allDivisions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getDivisionById: async (req, res) => {
    try {
      const { id } = req.params;
      const division = await DivisionSchema.findById(id);
      res.status(200).json(division);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  changeDivisionOrder: async (req, res) => {
    try {
      const arrayData = req.body;
      const newOrder = arrayData.map(async (item) => {
        const items = await DivisionSchema.findByIdAndUpdate(
          item._id,
          {
            order: item?.order,
          },
          { new: true }
        );
        console.log(items, "<-");
      });

      res.status(200).json({ message: "OK" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  },

  updateDivision: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const updatedDivison = await DivisionSchema.findByIdAndUpdate(id, {
        name: body?.name,
        discription: body?.discription,
      });

      res.status(200).json({ message: "Division updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  changeStatus : async (req, res) => {
    try {
      const {id} =req.params
      const {status} = req.body

      console.log(id);

      await DivisionSchema.findByIdAndUpdate(id,{
        status:status,
      })

      res.status(200).json({message:'Ok'})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
