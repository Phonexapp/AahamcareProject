const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const OrganizationTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
    },
    image: { type: String },
    description: { type: String },
    status: { type: String, default: "active", enum: ["active", "inactive"] },
  },
  {
    timestamps: true,
  }
);

OrganizationTypeSchema.methods.toggleStatus = function () {
  this.status = this.status === "active" ? "inactive" : "active";
};

module.exports = mongoose.model("OrganizationType", OrganizationTypeSchema);
