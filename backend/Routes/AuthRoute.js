const express = require("express");
const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification); // 👈 this route verifies token

module.exports = router;
