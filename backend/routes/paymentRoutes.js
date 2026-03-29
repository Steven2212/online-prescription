const router = require("express").Router();
const controller = require("../controllers/paymentController");
const {rateLimiter} = require("../middleware/rateLimiter");

router.post("/payment/",rateLimiter, controller.createPayment);

module.exports = router;