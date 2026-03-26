const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  profileImage: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
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
  surgeryHistory: [{
    type: String
  }],
  illnessHistory: [{
    type: String
  }],
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);