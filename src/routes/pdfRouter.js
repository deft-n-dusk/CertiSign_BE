const express = require("express");
const crypto = require("crypto");
const { userAuth } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const { signPDF } = require("../utils/pdfSigner");
const SignedDocument = require("../models/signedDocument");

const pdfRouter = express.Router();

pdfRouter.post("/sign", userAuth, upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const pdfBuffer = req.file.buffer;
    const signedPdfBuffer = await signPDF(
      pdfBuffer,
      "public/notary-stamp.png",
      `${req.user.firstName} ${req.user.lastName}`
    );

    // Generate SHA256 hash
    const hash = crypto
      .createHash("sha256")
      .update(signedPdfBuffer)
      .digest("hex");

    // Save to database
    const savedDoc = await SignedDocument.create({
      notaryId: req.user._id,
      fileData: signedPdfBuffer,
      hash,
      fileName: req.file.originalname || "signed.pdf",
    });

    res.status(201).json({
      message: "PDF signed and saved successfully",
      documentId: savedDoc._id,
      hash,
      timestamp: savedDoc.createdAt,
    });
  } catch (err) {
    res.status(500).send("Error signing PDF: " + err.message);
  }
});



pdfRouter.get("/download/:id", userAuth, async (req, res) => {
  try {
    const doc = await SignedDocument.findById(req.params.id);
    if (!doc) {
      return res.status(404).send("Document not found");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${doc.fileName}`
    );
    res.send(doc.fileData);
  } catch (err) {
    res.status(500).send("Error downloading PDF: " + err.message);
  }
});



module.exports = pdfRouter;
