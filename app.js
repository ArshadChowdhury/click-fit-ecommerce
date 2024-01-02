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
// getting-started.js
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config(); // Load environment variables from .env file

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    if (mongoose.connection.readyState === 1) {
      console.log("Connected to MongoDB");
    } else {
      console.error("Failed to connect to MongoDB");
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
  }
}

main();

app.set("view engine", "ejs");

// Serve static files from the public folder
app.use(express.static("views"));
app.use(express.json());
app.use(cookieParser());

app.use("/", homePageRouter);

app.use("/about", aboutPageRouter);

app.use("/contact", contactPageRouter);

app.use("/products", productsPageRouter);

app.use("/login", loginPageRouter);

app.use("/register", registerPageRouter);

app.use("/upload-image", uploadImageRouter);

app.use("/dashboard", dashboardPageRouter);

// app.get("/set-cookies", (req, res) => {
//   // res.setHeader("Set-Cookie", "newUser=true");

//   res.cookie("newUser", false);
//   res.cookie("isEmployee", true);
//   res.send("You got the cookies");
// });

// app.get("/read-cookies", () => {});

// // Custom 404 route - placed after all other routes
// app.use((req, res) => {
//   res.render("pages/error");
// });

// Starting the server and listening to specific port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
