const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema(
  {
    item: { type: String, required: true },
    discription: String,
    requirement: { type: Number, required: true },
    unit: { type: String, required: true },
    unitPrice: Number,
    totalPrice: Number,
    remaining: { type: Number, required: true },
    remainingPrice: { type: Number, required: true },
    status: { type: String, required: true, default: "Active", enum:['Active', 'Inactive', 'Fullfilled'] },
    donations: [
      {
        type: ObjectId,
        ref: "StoreDonation",
      },
    ],

    photo: String,

    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Store", storeSchema);
