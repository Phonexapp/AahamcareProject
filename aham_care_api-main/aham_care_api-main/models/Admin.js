const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "eamil is required"],
    },
    password: {
      type: String,
      required: [true, "password is Required"],
    },
   
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
