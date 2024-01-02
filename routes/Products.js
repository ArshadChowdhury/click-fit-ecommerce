const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");

// Defining a route for the root path
router.get("/", requireAuth, (req, res) => {
  res.render("pages/products");
});

module.exports = router;
