import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();


// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {

    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Remove password from response
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    res.status(201).json({
      message: "User created",
      user: userWithoutPassword,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Signup failed",
    });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // Find user
    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Compare password
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Set cookie
    res.cookie("token", token, {

      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite:
        process.env.NODE_ENV ===
        "production"
          ? "none"
          : "lax",

      maxAge:
        7 * 24 * 60 * 60 * 1000
    });

    // Remove password from response
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Login failed",
    });
  }
});

export default router;