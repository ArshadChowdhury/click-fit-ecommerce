const express = require("express");
const router = express.Router();

// Defining a route for the root path
router.get("/", (req, res) => {
  res.cookie("jwt_token", "", { maxAge: 1 });
  res.redirect("/");
});

module.exports = router;
