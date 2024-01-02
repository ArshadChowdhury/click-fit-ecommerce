const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 24 * 60 * 60,
  });
};

module.exports = { createToken };
