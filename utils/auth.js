// utils/auth.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";
const JWT_EXPIRES = "7d";

// Хешування пароля
export const hashPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Перевірка пароля
export const verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

// Створення JWT
export const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      roles: user.roles
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
};

// Перевірка JWT
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
