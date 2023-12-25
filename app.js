const express = require("express");
const app = express();
const port = 3000; // Setting the port I want my app to run
const homePageRouter = require("./routes/Homepage");
const uploadImageRouter = require("./routes/UploadImage");

// Serve static files from the public folder
app.use(express.static("public"));

app.use("/", homePageRouter);

app.use("/upload-image", uploadImageRouter);

// Custom 404 route - should be placed after all other routes
app.use((req, res) => {
  res.sendFile("/public/error.html", { root: __dirname });
});

// Starting the server and listening to specific port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
