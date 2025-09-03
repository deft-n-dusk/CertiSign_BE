// src/models/signedDocument.js
const mongoose = require("mongoose");

const signedDocumentSchema = new mongoose.Schema(
  {
    notaryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileData: {
      type: Buffer,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      default: "signed.pdf",
    },
  },
  { timestamps: true }
);

const SignedDocument = mongoose.model("SignedDocument", signedDocumentSchema);
module.exports = SignedDocument;
