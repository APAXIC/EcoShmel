import express from "express";
import {
  createRule,
  getRules,
  getRuleById,
  updateRule
} from "../controllers/thresholdRuleController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rules
 *   description: Порогові правила
 */

/**
 * @swagger
 * /rules:
 *   post:
 *     summary: Створити нове порогове правило
 *     tags: [Rules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RuleCreateRequest"
 *     responses:
 *       201:
 *         description: Правило створено
 */

/**
 * @swagger
 * /rules:
 *   get:
 *     summary: Отримати всі правила
 *     tags: [Rules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список правил
 */

/**
 * @swagger
 * /rules/{id}:
 *   get:
 *     summary: Отримати правило за ID
 *     tags: [Rules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Дані правила
 */

/**
 * @swagger
 * /rules/{id}:
 *   patch:
 *     summary: Оновити порогове правило
 *     tags: [Rules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID правила
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RuleUpdateRequest"
 *     responses:
 *       200:
 *         description: Правило оновлено
 */

router.post("/", authMiddleware, createRule);
router.get("/", getRules);
router.get("/:id", getRuleById);
router.patch("/:id", updateRule);

export default router;
