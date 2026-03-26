const Patient = require("../models/Patient");

exports.getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).select("-password");
    res.json(patient);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};