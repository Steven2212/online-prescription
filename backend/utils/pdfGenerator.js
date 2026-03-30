const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const supabase = require("../config/supabase");

exports.generatePrescriptionPDF = async (data) => {
  let browser;

  try {
    browser = await puppeteer.launch({
      args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    const html = `
      <h1 style="text-align:center;">Prescription</h1>
      <p><strong>Doctor:</strong> ${data.doctorName}</p>
      <p><strong>Patient:</strong> ${data.patientName}</p>

      <h3>Care to be taken:</h3>
      <p>${data.careToBeTaken}</p>

      <h3>Medicines:</h3>
      <p>${data.medicines || "N/A"}</p>
    `;

    await page.setContent(html, { waitUntil: "networkidle0" });

    const rawPdf = await page.pdf({ format: "A4" });

    const pdfBuffer = Buffer.isBuffer(rawPdf)
      ? rawPdf
      : Buffer.from(rawPdf);

    await browser.close();

    // Upload to Supabase
    const fileName = `prescription_${Date.now()}.pdf`;

    const { data: uploadData, error } = await supabase.storage
      .from("prescriptions")
      .upload(fileName, pdfBuffer, {
        contentType: "application/pdf",
      });

    if (error) {
      console.error("Supabase upload error:", error);
      throw error;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("prescriptions")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;

  } catch (error) {
    if (browser) await browser.close();
    console.error("PDF Generation Error:", error);
    throw error;
  }
};