const router = require("express").Router();
const controller = require("../controllers/consultationController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post(
  "/",
  protect,
  authorizeRoles("patient"),
  controller.createConsultation
);

router.get(
  "/doctor/:doctorId",
  protect,
  authorizeRoles("doctor"),
  controller.getDoctorConsultations
);

router.get(
  "/patient/:patientId",
  protect,
  authorizeRoles("patient"),
  controller.getPatientConsultations
);


module.exports = router;