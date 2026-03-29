const router = require("express").Router();
const controller = require("../controllers/prescriptionController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post(
  "/",
  protect,
  authorizeRoles("doctor"),
  controller.createPrescription,
);

router.get("/:consultationId", protect, controller.getByConsultation);

router.post(
  "/send-email",
  // authorizeRoles("doctor"),
  controller.sendPrescriptionEmail,
);

module.exports = router;
