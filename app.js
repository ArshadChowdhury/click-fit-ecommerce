const express = require("express");
const multer = require("multer");
const app = express();
const port = 3000; // Setting the port I want my app to run

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

// Serve static files from the public folder
app.use(express.static("public"));

// Defining a route for the root path
app.get("/", (req, res) => {
  res.sendFile("./index.html");
});

// Handle file upload route
app.post("/upload-image", upload.single("image"), (req, res) => {
  // 'image' should match the name attribute of your file input in the form
  res.send("File uploaded successfully!");
});

// Custom 404 route - should be placed after all other routes
app.use((req, res) => {
  res.sendFile("/public/error.html", { root: __dirname });
});

// Starting the server and listening to specific port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
