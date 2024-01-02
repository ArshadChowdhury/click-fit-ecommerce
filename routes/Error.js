const express = require("express");
const router = express.Router();

// Defining a route to catch all unmatched routes (404)
router.use((req, res) => {
  res.status(404).render("pages/error");
});

module.exports = router;
