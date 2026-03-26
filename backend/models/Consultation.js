const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },

  // STEP 1
  currentIllness: String,
  recentSurgery: String,

  // STEP 2
  isDiabetic: {
    type: String,
    enum: ["Diabetic", "Non-Diabetic"]
  },
  allergies: String,
  otherConditions: String,

  // STEP 3 (Payment)
  transactionId: String,
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending"
  },

  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Consultation", consultationSchema);