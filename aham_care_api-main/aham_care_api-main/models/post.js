const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      require: true,
    },

    image: {
      type: String,
      require: true,
    },

    discription: {
      type: String,
    },

    like: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],

    dislike: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);