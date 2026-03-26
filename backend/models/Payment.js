const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  consultationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Consultation"
  },
  amount: Number,
  transactionId: String,
  status: {
    type: String,
    enum: ["Pending", "Success", "Failed"],
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);