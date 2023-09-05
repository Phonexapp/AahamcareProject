const Organaization = require("../../../models/organaization");
const Divisions = require("../../../models/division");
const uploadFiles = require("../../../utils/uploads/uploadFiles");
const deleteFile = require("../../../lib/deleteFiles");

module.exports = async (req, res) => {
  try {
    const { body } = req;
    const { files } = req;
    const { name } = await Divisions.findById(body.typeId);
    const uploadedFile = await uploadFiles(files);
    const pdf = uploadedFile.filter((item, i) => item.fieldname === "pdf");
    const photo = uploadedFile.filter((item, i) => item.fieldname === "photo");

    console.log("pdf", pdf);
    console.log("photo", photo);

    const savedOrganaization = await new Organaization({
      typeId: body.typeId,
      type: name,
      name: body.name,
      address: body.address,
      discription: body.discription,
      photo: photo[0].path,
      documents: pdf[0].path,
      place: body.place,
      email: body.email,
      phone: body.phone_no,
    }).save();

    await deleteFile("public/"+ pdf.path);
    await deleteFile("public/"+ photo.path);

    res.status(200).json({
      message: "Organaization created successfully",
    });


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
