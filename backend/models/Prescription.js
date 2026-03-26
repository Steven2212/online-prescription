const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  consultationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Consultation",
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient"
  },

  careToBeTaken: {
    type: String,
    required: true
  },
  medicines: {
    type: String
  },

  pdfUrl: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Prescription", prescriptionSchema);