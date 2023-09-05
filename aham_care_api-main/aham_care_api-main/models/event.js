const { string } = require("@google/maps/lib/internal/validate");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const eventSchema = mongoose.Schema(
  {
    event: { type: String, required: true },
    discription: { type: String, required: true },
    totalTickets: { type:Number, required: true },
    startDateTime: { type: String, required: true },
    endDateTime: { type: String, required: true },
    remainingTickets: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    balancePrice: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    status: {
      type: String,
      require: true,
      enum: ["Due date end", "Active", "Deleted", 'Fullfilled'],
      default:"Active"
    },
    donations: [
      {
        type: ObjectId,
        ref: "EventDonation",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
