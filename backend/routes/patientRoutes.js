const router = require("express").Router();
const patientController = require("../controllers/patientController");

router.get("/:id", patientController.getPatientProfile);

module.exports = router;