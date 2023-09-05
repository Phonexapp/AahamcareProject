const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const recidenceSchema = mongoose.Schema(
  {
    organaization: {
      type: ObjectId,
      ref: 'Organization'
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,

    },
    place: {
      type: String,
    },
    photo: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    status: { type: String, required: true, enum: ['Active', 'Inactive'], default: 'Active', }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recidence", recidenceSchema);
