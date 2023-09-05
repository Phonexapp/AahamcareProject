const { number } = require("@google/maps/lib/internal/validate");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const divisionSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    discription: { type: String, require: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    order: { type: Number, require: true },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Division", divisionSchema);
