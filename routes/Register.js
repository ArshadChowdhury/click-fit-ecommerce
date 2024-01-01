const express = require("express");
const router = express.Router();

// Defining a route for the root path
router.get("/", (req, res) => {
  res.sendFile("/public/register.html", { root: "./" });
});

module.exports = router;
