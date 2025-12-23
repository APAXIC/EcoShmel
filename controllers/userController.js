// controllers/userController.js
import User from "../models/User.js";

// GET /api/users/:id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to load user" });
  }
};

// PATCH /api/users/me
export const updateCurrentUser = async (req, res) => {
  try {
    const allowed = ["name", "location", "language"];
    const updates = {};

    for (const field of allowed) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true }
    ).select("-passwordHash");

    res.json(updated);
  } catch (error) {
    console.error("Error Details:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// PATCH /api/users/me/language
export const updateLanguage = async (req, res) => {
  const { language } = req.body;

  if (!["uk", "en"].includes(language)) {
    return res.status(400).json({ message: "Непідтримувана мова" });
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { language },
    { new: true }
  );

  res.json({
    message: "Мову оновлено",
    language: user.language
  });
};
