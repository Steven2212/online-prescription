const router = require("express").Router();
const authController = require("../controllers/authController");
const upload = require("../utils/upload");
const { rateLimiter } = require("../middleware/rateLimiter");

router.post("/login", rateLimiter, authController.login);

router.post(
  "/doctor/signup",
  rateLimiter,
  upload.single("profileImage"),
  authController.doctorSignup,
);

router.post(
  "/patient/signup",
  rateLimiter,
  upload.single("profileImage"),
  authController.patientSignup,
);

module.exports = router;
