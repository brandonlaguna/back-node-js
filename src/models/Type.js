// src/models/Type.js
const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Type", TypeSchema);
