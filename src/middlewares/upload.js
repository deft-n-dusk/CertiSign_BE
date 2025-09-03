const multer = require("multer");

// Store PDF in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
