const organizationScheama = require("../../models/organaization");

module.exports = async (req, res) => {
    console.log("RequestComing");
    const UserPet = await organizationScheama.find({ type: "Pet" })
        .populate("residence").sort({ createdAt: -1 })
        .populate("requirement").sort({ createdAt: -1 });
    res.status(200).json({ UserPet })
    console.log(UserPet);
}