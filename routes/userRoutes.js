import express from "express";
import {
  getUserById,
  updateCurrentUser
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Операції з користувачами системи
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Отримати користувача за його ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID користувача
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Дані про користувача
 *       404:
 *         description: Користувача не знайдено
 */

/**
 * @swagger
 * /users/me:
 *   patch:
 *     summary: Оновити профіль поточного користувача
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               language:
 *                 type: string
 *               location:
 *                 $ref: "#/components/schemas/GeoPoint"
 *     responses:
 *       200:
 *         description: Профіль оновлено
 *       400:
 *         description: Невірні дані
 */

// /api/users/me
router.patch("/me", authMiddleware, updateCurrentUser);

// /api/users/:id
router.get("/:id", getUserById);

export default router;
