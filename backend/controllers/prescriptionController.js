const Prescription = require("../models/Prescription");
const Consultation = require("../models/Consultation");
const { generatePrescriptionPDF } = require("../utils/pdfGenerator");

exports.createPrescription = async (req, res) => {
  try {
    const { consultationId, careToBeTaken, medicines } = req.body;

    const consultation = await Consultation.findById(consultationId)
      .populate("doctorId")
      .populate("patientId");

    const pdfPath = await generatePrescriptionPDF({
      doctorName: consultation.doctorId.name,
      patientName: consultation.patientId.name,
      careToBeTaken,
      medicines
    });

    const prescription = await Prescription.create({
      consultationId,
      doctorId: consultation.doctorId._id,
      patientId: consultation.patientId._id,
      careToBeTaken,
      medicines,
      pdfUrl: pdfPath
    });

    // mark consultation completed
    consultation.status = "Completed";
    await consultation.save();

    res.json(prescription);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.getByConsultation = async (req, res) => {
  try {
    const data = await Prescription.find({
      consultationId: req.params.consultationId
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};