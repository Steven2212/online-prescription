const router = require("express").Router();
const controller = require("../controllers/paymentController");

router.post("/", controller.createPayment);

module.exports = router;