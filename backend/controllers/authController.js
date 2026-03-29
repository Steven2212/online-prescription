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
    const { email, phone, password } = req.body;

    const existing = await Doctor.findOne({ $or: [{ email }, { phone }] });
    if (existing)
      return res.status(409).json({
        status: "error",
        statusCode: 409,
        message: "Doctor already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await Doctor.create({
      ...req.body,
      password: hashedPassword,
      profileImage: req.file ? req.file.path : "",
    });

    return res.status(201).json({
      status: "success",
      statusCode: 201,
      message: "Doctor created successfully.",
      token: generateToken(doctor._id, "doctor"),
      doctor,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal server error.",
    });
  }
};

// Patient Signup
exports.patientSignup = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    const existing = await Patient.findOne({ $or: [{ email }, { phone }] });
    if (existing)
      return res
        .status(409)
        .json({ status: "error", statusCode: 409, message: "Patient exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = await Patient.create({
      ...req.body,
      password: hashedPassword,
      illnessHistory: req.body.illnessHistory?.split(","),
      surgeryHistory: req.body.surgeryHistory?.split(","),
      profileImage: req.file ? req.file.path : "",
    });

    return res.status(201).json({
      status: "success",
      statusCode: 201,
      message: "Patient created successfully.",
      token: generateToken(patient._id, "patient"),
      patient,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal server error.",
    });
  }
};

// Login (common)
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const Model = role === "doctor" ? Doctor : Patient;

    //User not found.
    const user = await Model.findOne({ email });
    if (!user) {
      console.log(`User not found. Email : ${email}`);
      return res.status(401).json({
        status: "error",
        statusCode: 401,
        message: "Invalid email or password.",
      });
    }

    //Invalid Credentials.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(
        `Invalid Credentials. Email : ${email} , Password : ${password} , role : ${role}`,
      );
      return res.status(401).json({
        status: "error",
        statusCode: 401,
        message: "Invalid email or password.",
      });
    }

    //Login Successful
    return res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Login successful",
      token: generateToken(user._id, role),
      user,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal server Error",
    });
  }
};
