const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const requirementScheam = mongoose.Schema(
  {
    organization: { type: ObjectId, ref: "Organization" },
    item: { type: String, required: true },
    requirement: { type: Number, required: true },
    requirementUnit: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    status: { type: String, default:'Active', enum: ['Active','Inactive','Fulfilled']},
    needs: String,
    balancePrice: { type: Number, required: true}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Requirement", requirementScheam);
