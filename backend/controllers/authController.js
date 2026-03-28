const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Doctor Signup
exports.doctorSignup = async (req, res) => {
  try {
    const { name, email, phone, password, speciality, experience } = req.body;

    const existing = await Doctor.findOne({ $or: [{ email }, { phone }] });
    if (existing) return res.status(400).json({ msg: "Doctor already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await Doctor.create({
      ...req.body,
      password: hashedPassword,
      profileImage: req.file ? req.file.path : "",
    });

    return res.status(200).json({
      status: "success",
      error: false,
      message: "Doctor created successfully.",
      token: generateToken(doctor._id, "doctor"),
      doctor,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// Patient Signup
exports.patientSignup = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    const existing = await Patient.findOne({ $or: [{ email }, { phone }] });
    if (existing) return res.status(400).json({ msg: "Patient exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = await Patient.create({
      ...req.body,
      password: hashedPassword,
      illnessHistory: req.body.illnessHistory?.split(","),
      surgeryHistory: req.body.surgeryHistory?.split(","),
      profileImage: req.file ? req.file.path : "",
    });

    return res.json({
      status: "success",
      error: false,
      message: "Patient created successfully.",
      token: generateToken(patient._id, "patient"),
      patient,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// Login (common)
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const Model = role === "doctor" ? Doctor : Patient;

    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    res.json({
      token: generateToken(user._id, role),
      user,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
