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
  res.render("pages/register");
});

router.post("/", async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      phone,
      email,
      password,
    });
    const token = createToken(user._id);
    res.cookie("jwt_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    console.log(err);
    res.status(400).send("Error user not created");
  }
});

module.exports = router;
