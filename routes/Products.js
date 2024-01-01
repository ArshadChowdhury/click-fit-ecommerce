const express = require("express");
const router = express.Router();

// Defining a route for the root path
router.get("/", (req, res) => {
  res.sendFile("/public/products.html", { root: "./" });
});

module.exports = router;
