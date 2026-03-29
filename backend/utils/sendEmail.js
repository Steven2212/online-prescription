const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // sender email 
    pass: process.env.EMAIL_PASS  // sender password
  }
});

exports.sendPrescriptionEmail = async ({ to, pdfUrl, patientName }) => {
  await transporter.sendMail({
    from: `"Prescription App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Prescription 📄",
    html: `
      <h2>Hello ${patientName},</h2>
      <p>Your prescription is ready.</p>
      <p><a href="${pdfUrl}" target="_blank">Click here to view/download your prescription</a></p>
      <br/>
      <p>Stay healthy! 💙</p>
    `
  });
};