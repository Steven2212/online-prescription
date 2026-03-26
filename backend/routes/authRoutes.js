const router = require("express").Router();
const authController = require("../controllers/authController");
const upload = require("../utils/upload");

router.post("/login", authController.login);

router.post(
  "/doctor/signup",
  upload.single("profileImage"),
  authController.doctorSignup
);

router.post(
  "/patient/signup",
  upload.single("profileImage"),
  authController.patientSignup
);

module.exports = router;