const Prescription = require("../models/Prescription");
const Consultation = require("../models/Consultation");
const { generatePrescriptionPDF } = require("../utils/pdfGenerator");
const { sendPrescriptionEmail } = require("../utils/sendEmail");

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

exports.sendPrescriptionEmail = async (req, res) => {
  try {
    const { consultationId } = req.body;

    const prescription = await Prescription.findOne({ consultationId })
      .populate("patientId")
      .populate("doctorId");

    if (!prescription) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    await sendPrescriptionEmail({
      to: prescription.patientId.email,
      pdfUrl: prescription.pdfUrl,
      patientName: prescription.patientId.name
    });

    return res.status(200).json({ message: "Email sent successfully ✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};