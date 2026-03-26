const Consultation = require("../models/Consultation");

exports.createConsultation = async (req, res) => { 
  try {
    const consultation = await Consultation.create(req.body);
    return res.status(200).json(consultation);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

exports.getDoctorConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({
      doctorId: req.params.doctorId
    }).populate("patientId");

    return res.status(200).json(consultations);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

exports.getPatientConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({
      patientId: req.params.patientId
    }).populate("doctorId");

    return res.status(200).json(consultations);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};