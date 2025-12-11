import express from "express";
import {
  getAlerts,
  getAlertById,
  createManualAlert
} from "../controllers/alertController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Alerts
 *   description: Система тривог та сповіщень
 */

/**
 * @swagger
 * /alerts/manual:
 *   post:
 *     summary: Створити тривогу вручну
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AlertCreateRequest"
 *     responses:
 *       201:
 *         description: Тривогу створено
 */

/**
 * @swagger
 * /alerts:
 *   get:
 *     summary: Отримати всі тривоги
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список тривог
 */

/**
 * @swagger
 * /alerts/{id}:
 *   get:
 *     summary: Отримати тривогу за ID
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Дані тривоги
 */

router.get("/", getAlerts);
router.get("/:id", getAlertById);
router.post("/manual", createManualAlert);

export default router;
