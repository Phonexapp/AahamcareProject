const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const organizationScheama = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
    },
    type: { type: String,  require: true },
    typeId:{type:ObjectId, ref:'Division', require:true, index: true},
    address: { type: String, require: true },
    photo: { type: String },
    discription: { type: String },
    galleryPhotos: [],
    residence: [{ type: ObjectId, ref: "Recidence" }],
    requirement: [{ type: ObjectId, ref: "Requirement" }],
    donations: [{ type: ObjectId, ref: "Donations" }],
    documents: { type: String },
    email:{type:String, require:true},
    phone:{type:String, require:true},
    place:{type:String, require:true},
    status:{type:String, require:true, enum:['Active', 'Inactive'], default: 'Active'},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Organization", organizationScheama);
