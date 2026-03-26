const Doctor = require("../models/Doctor");

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};