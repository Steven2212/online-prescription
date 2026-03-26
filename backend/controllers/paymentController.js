const Payment = require("../models/Payment");
const Consultation = require("../models/Consultation");

exports.createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);

    await Consultation.findByIdAndUpdate(req.body.consultationId, {
      paymentStatus: "Completed"
    });

    res.json(payment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};