const express = require("express");
const router = express.Router();

// Defining a route for the root path
router.get("/", (req, res) => {
  res.render("pages/dashboard");
});

module.exports = router;
