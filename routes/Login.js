const express = require("express");
const router = express.Router();
const User = require("../models/User");
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

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    res.status(200).json({ user: user._id });
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
});

module.exports = router;
