const express = require("express");
const app = express();
const port = 3000; // Setting the port I want my app to run
const homePageRouter = require("./routes/Homepage");
const uploadImageRouter = require("./routes/UploadImage");
const aboutPageRouter = require("./routes/About");
const contactPageRouter = require("./routes/Contact");
const productsPageRouter = require("./routes/Products");
const loginPageRouter = require("./routes/Login");
const registerPageRouter = require("./routes/Register");
const dashboardPageRouter = require("./routes/Dashboard");

app.set("view engine", "ejs");

// Serve static files from the public folder
app.use(express.static("views"));

app.use("/", homePageRouter);

app.use("/about", aboutPageRouter);

app.use("/contact", contactPageRouter);

app.use("/products", productsPageRouter);

app.use("/login", loginPageRouter);

app.use("/register", registerPageRouter);

app.use("/upload-image", uploadImageRouter);

app.use("/dashboard", dashboardPageRouter);

// Custom 404 route - placed after all other routes
app.use((req, res) => {
  res.render("pages/error");
});

// Starting the server and listening to specific port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
