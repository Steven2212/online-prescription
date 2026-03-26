const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  profileImage: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  experience: {
    type: Number, // supports decimal like 1.5
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);