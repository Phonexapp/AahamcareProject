const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const eventDonationSchema = mongoose.Schema({
    userId:{type:ObjectId, ref:"User"},
    eventId:{type:ObjectId, ref:"Event"},
    paymentId:{type:String, require:true},
    donatedTickets:{type:Number, require:true},
    unitPrice:Number,
    totalAmount:{type:Number, require:true},
    invoiceNo:{type:String, require:true},
    status:{type:String, require:true, enum:["Pending", "Processing", "Completed"], default:"Pending"}
},
{
    timestamps: true,
})

module.exports = mongoose.model("EventDonation",eventDonationSchema)