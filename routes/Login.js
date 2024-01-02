const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, "secret code for now", {
    expiresIn: 24 * 60 * 60,
  });
};

// Defining a route for the root path
router.get("/", (req, res) => {
  res.render("pages/login");
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  res.send("User logged in successfully");
});

module.exports = router;
