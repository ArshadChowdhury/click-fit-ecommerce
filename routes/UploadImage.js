const express = require("express");
const multer = require("multer");
const router = express.Router();

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload_images/"); // Uploads will be stored in the 'upload_images' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Handle file upload route
router.post("/", upload.single("image"), (req, res) => {
  // 'image' should match the name attribute of your file input in the form

  try {
    res.send("File uploaded successfully!");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
