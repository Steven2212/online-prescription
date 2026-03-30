const PDFDocument = require("pdfkit");
const supabase = require("../config/supabase");

exports.generatePrescriptionPDF = async (data) => {
  try {
    const doc = new PDFDocument();

    // Collect PDF in buffer
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));

    const pdfPromise = new Promise((resolve, reject) => {
      doc.on("end", resolve);
      doc.on("error", reject);
    });

    // 🎨 DESIGN (you can customize)
    doc.fontSize(20).text("Prescription", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Doctor: ${data.doctorName}`);
    doc.text(`Patient: ${data.patientName}`);
    doc.moveDown();

    doc.fontSize(14).text("Care to be Taken:");
    doc.fontSize(12).text(data.careToBeTaken);
    doc.moveDown();

    doc.fontSize(14).text("Medicines:");
    doc.fontSize(12).text(data.medicines || "N/A");

    doc.end();

    await pdfPromise;

    const pdfBuffer = Buffer.concat(buffers);

    // Upload to Supabase
    const fileName = `prescription_${Date.now()}.pdf`;

    const { error } = await supabase.storage
      .from("prescriptions")
      .upload(fileName, pdfBuffer, {
        contentType: "application/pdf",
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("prescriptions")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;

  } catch (error) {
    console.error("PDF Generation Error:", error);
    throw error;
  }
};