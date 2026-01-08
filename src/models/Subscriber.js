// src/models/Type.js
const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    type: { type: String, enum: ["newsletter", "contact", "member"] },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Subscriber", TypeSchema);
