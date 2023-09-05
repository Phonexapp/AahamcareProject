const Organaization = require("../../../models/organaization");
const Recidence = require("../../../models/recidence");
const deleteFile = require('../../../lib/deleteFiles');
const uploadFiles = require("../../../utils/uploads/uploadFiles");
const deleteCloudeFile = require("../../../utils/uploads/deleteCloudeFile");

module.exports = {
  addRecidence: async (req, res) => {
    try {
      const { body } = req;
      const { orgId } = req.params;
      const { file } = req;

      const uploadFile = await uploadFiles(file)

      const savedRecidence = await new Recidence({
        organaization: orgId,
        name: body.name,
        age: body.age,
        place: body.place,
        photo: uploadFile[0].path,
      }).save();

      await deleteFile(file?.destination)

      const addId = await Organaization.findByIdAndUpdate(
        orgId,
        {
          $push: { residence: savedRecidence._id },
        },
        { new: true }
      );
      console.log(addId);

      res
        .status(200)
        .json({ recidence: savedRecidence, message: "Successfully added" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  getAllRecidenceByOrg: async (req, res) => {
    try {
      const { orgId } = req.params;
      console.log(orgId, "orgId");
      const recideces = await Recidence.find({ organaization: orgId }).sort({
        createdAt: -1,
      });
      res.status(200).json(recideces);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id, "id");
      const { status } = req.body;
      const updateStatus = await Recidence.findByIdAndUpdate(id, {
        status,
      });
      res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { attId } = req.params;
      const recident = await Recidence.findById(attId);
      res.status(200).json(recident);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateRecidence: async (req, res) => {
    try {
      const { attId } = req.params;
      const { body } = req;
      const { file } = req;

     const updatedRecident = await Recidence.findByIdAndUpdate(attId, {
        name: body.name,
        age: body.age,
        place: body.place,
      }, {new: true});

      if(file){
       const uploadedFile = await uploadFiles(file);
        await Recidence.findByIdAndUpdate(attId, {
          photo: uploadedFile[0].path,
        });

        const respo = await deleteCloudeFile(updatedRecident.photo);
        console.log('cl->', respo);
        const response = await deleteFile("public" + uploadedFile[0].path);
        console.log('dl->', response);
      }

      res.status(200).json({message:'Updated successfully'})
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
};
