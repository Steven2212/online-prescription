const router = require("express").Router();
const doctorController = require("../controllers/doctorController");

router.get("/", doctorController.getAllDoctors);
router.get("/:id", doctorController.getDoctorProfile);

module.exports = router;