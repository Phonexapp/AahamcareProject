const Organaization = require("../../../models/organaization");

module.exports = async (req, res) => {
  try {
    const images = req.files;
    const { id } = req.params;
    const gallery = images.map((item, i) => `/uploads/images/${item.filename}`);
    console.log(gallery);
    await Organaization.findByIdAndUpdate(id, {
      $push: { galleryPhotos: { $each: gallery } },
    });

    res.status(200).json({ message: "Image Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
