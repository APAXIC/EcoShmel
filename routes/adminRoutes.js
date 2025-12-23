import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {
  getUsers,
  getReadings,
  createManualAlert,
  exportAlerts
} from "../controllers/adminController.js";

const router = express.Router();

router.use(authMiddleware);


/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Операції адміністрування системи
 */

/**
 * @swagger
 * /admin/alerts:
 *   post:
 *     summary: Створити тривогу вручну з надсиланням повідомлень усім користувачам
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sensorId
 *               - municipalityId
 *               - severity
 *               - geo
 *             properties:
 *               sensorId:
 *                 type: string
 *               municipalityId:
 *                 type: string
 *               severity:
 *                 type: string
 *               geo:
 *                 type: object
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Failed to create alert
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Отримати всіх користувачів
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список користувачів
 *       500:
 *         description: Failed to load users
 */

/**
 * @swagger
 * /admin/readings:
 *   get:
 *     summary: Отримати всіх користувачів
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список записів
 *       500:
 *         description: Failed to load readings
 */

/**
 * @swagger
 * /admin/alerts/export:
 *   get:
 *     summary: Отримати історію тривог
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Історія тривог
 *       500:
 *         description: Export failed
 */

router.get("/users", getUsers);
router.get("/readings", getReadings);
router.post("/alerts", createManualAlert);
router.get("/alerts/export", exportAlerts);

export default router;
