const express = require("express");
const app = express();
const port = 3000; // Set your desired port

// Serve static files from the public folder
app.use(express.static("public"));

// Define a route for the root path
app.get("/", (req, res) => {
  res.sendFile("./index.html");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
