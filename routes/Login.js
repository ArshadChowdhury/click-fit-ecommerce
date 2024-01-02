const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { createToken } = require("../middleware/createToken");

// Defining a route for the root path
router.get("/", (req, res) => {
  res.render("pages/login");
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
});

module.exports = router;
