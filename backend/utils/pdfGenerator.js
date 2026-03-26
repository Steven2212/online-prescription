const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.generatePrescriptionPDF = (data) => {
  return new Promise((resolve, reject) => {
    const fileName = `prescription_${Date.now()}.pdf`;
    const filePath = path.join(__dirname, "../uploads/pdfs", fileName);

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(18).text("Prescription", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Doctor: ${data.doctorName}`);
    doc.text(`Patient: ${data.patientName}`);
    doc.moveDown();

    doc.text(`Care to be taken:`);
    doc.text(data.careToBeTaken);
    doc.moveDown();

    doc.text(`Medicines:`);
    doc.text(data.medicines || "N/A");

    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};