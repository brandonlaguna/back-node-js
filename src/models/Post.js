// src/models/Post.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    content: { type: String, required: true },
    // ROLE
    TYPE: { type: mongoose.Schema.Types.ObjectId, ref: "Type", required: true },
    postBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", UserSchema);
