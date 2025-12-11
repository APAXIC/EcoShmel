// controllers/authController.js
import User from "../models/User.js";
import {
  hashPassword,
  verifyPassword,
  createToken
} from "../utils/auth.js";

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { email, password, name, pushToken } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    const passwordHash = await hashPassword(password);

    const user = await User.create({
      email,
      name,
      passwordHash,
      roles: ["user"],
      pushTokens: pushToken ? [pushToken] : []
    });

    const token = createToken(user);

    res.status(201).json({
      message: "Registered successfully",
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        roles: user.roles
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password, pushToken } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    // Опційно: оновлюємо push-токен
    if (pushToken) {
      const already = user.pushTokens?.find(t => t.token === pushToken.token);
      if (!already) {
        user.pushTokens.push(pushToken);
        await user.save();
      }
    }

    const token = createToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        roles: user.roles
      }
    });
  } catch (error) {
    console.error("Login Error Details:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

// GET /api/auth/me
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-passwordHash");

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

