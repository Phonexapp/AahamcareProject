const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const donationSchema = mongoose.Schema(
  {
    organaizationId: { type: ObjectId, ref: "Organization" },
    userId: { type: ObjectId, ref: "User" },
    invoiceNo: { type: String },
    totalPrice: Number,
    paymentId: String,

    donatedItems: [
      {
        requirmentId: { type: ObjectId, ref: "Requirement" },
        item: String,
        quantity: String,
        unitPrice:String,
        totalPrice: String,

      },
    ],

    status: {
      type: String,
      enum: ["Received", "Processing", "Completed"],
      default: "Received",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Donation", donationSchema);
