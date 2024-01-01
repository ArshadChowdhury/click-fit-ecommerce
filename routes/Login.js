const express = require("express");
const router = express.Router();

// Defining a route for the root path
router.get("/", (req, res) => {
  res.sendFile("/public/login.html", { root: "./" });
});

module.exports = router;
