const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username, createdAt } = req.body;

    // 1️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    // 2️⃣ Create new user
    const user = await User.create({ email, password, username, createdAt });

    // 3️⃣ Generate JWT token
    const token = createSecretToken(user._id);

    // 4️⃣ Send cookie + token in response
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    // ✅ Send response and STOP here
    return res.status(201).json({
      message: "User signed up successfully",
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validation
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }

    // 3️⃣ Compare password
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }

    // 4️⃣ Generate JWT
    const token = createSecretToken(user._id);

    // 5️⃣ Send cookie + token
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    // ✅ Send response and STOP
    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
