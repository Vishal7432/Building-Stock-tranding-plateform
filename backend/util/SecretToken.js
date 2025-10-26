require("dotenv").config();
const jwt = require("jsonwebtoken");

const TOKEN_KEY = process.env.TOKEN_KEY;

if (!TOKEN_KEY) {
  throw new Error("TOKEN_KEY is not defined in .env");
}

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, TOKEN_KEY, { expiresIn: 3 * 24 * 60 * 60 });
};
