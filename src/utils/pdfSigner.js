const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

async function signPDF(pdfBuffer, stampPath, signerName) {
  // Load PDF from buffer
  const pdfDoc = await PDFDocument.load(pdfBuffer);

  // Get the last page of the pdf file
  const pages = pdfDoc.getPages();
  const page = pages[pages.length - 1];

  // Embed notary stamp
  const stampImageBytes = fs.readFileSync(path.resolve(stampPath));
  const stampImage = await pdfDoc.embedPng(stampImageBytes);
  const { width, height } = page.getSize();

  // Draw stamp (bottom-right)
  page.drawImage(stampImage, {
    x: width - 150, // adjust horizontal offset
    y: 50,          // 50 units from bottom
    width: 100,
    height: 100,
  });

  // Draw signer text (bottom-left)
  page.drawText(`Signed by: ${signerName}`, {
    x: 50,          // left side
    y: 50,          // 50 units from bottom
    size: 14,
    color: rgb(0, 0, 0),
  });

  // Return signed PDF buffer
  const signedPdfBytes = await pdfDoc.save();
  return Buffer.from(signedPdfBytes);
}

module.exports = { signPDF };
