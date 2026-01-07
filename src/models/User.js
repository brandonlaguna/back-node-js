// src/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    firstName: { type: String, required: true },
    secondName: { type: String },
    lastName: { type: String, required: true },
    secondLastName: { type: String },
    description: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    photo: { type: String },
    birthDate: { type: Date },
    facebookId: { type: String },
    instagramId: { type: String },
    twitterId: { type: String },
    linkedinId: { type: String },
    // ROLE
    ROLE: {
      type: String,
      required: true,
      enum: ["ADMIN", "BUSINESS", "MEMBER", "CLIENT"],
    },
    // CLAIMS
    CLAIMS: {
      type: [String], // array de strings
      default: ["CREATE_POST", "UPDATE_USER"], // valores iniciales
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
