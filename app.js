const express = require("express");
const multer = require("multer");
const app = express();
const port = 3000; // Set your desired port

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload_images/"); // Uploads will be stored in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Handle file upload
app.post("/upload-image", upload.single("image"), (req, res) => {
  // 'image' should match the name attribute of your file input in the form
  res.send("File uploaded successfully!");
});

// Serve static files from the public folder
app.use(express.static("public"));

// Define a route for the root path
app.get("/", (req, res) => {
  res.sendFile("./index.html");
});

app.post("/upload-image", (req, res) => {
  res.sendFile("./index.html");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
