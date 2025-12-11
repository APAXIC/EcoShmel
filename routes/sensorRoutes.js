import express from "express";
import {
  createSensor,
  getSensors,
  getSensorById,
  updateSensor
} from "../controllers/sensorController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sensors
 *   description: Операції з IoT-датчиками
 */

/**
 * @swagger
 * /sensors:
 *   post:
 *     summary: Створити новий датчик
 *     tags: [Sensors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SensorCreateRequest"
 *     responses:
 *       201:
 *         description: Датчик створено
 */

/**
 * @swagger
 * /sensors:
 *   get:
 *     summary: Отримати всі датчики
 *     tags: [Sensors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список датчиків
 */

/**
 * @swagger
 * /sensors/{id}:
 *   get:
 *     summary: Отримати датчик за його ID
 *     tags: [Sensors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID датчика
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Дані про датчик
 *       404:
 *         description: Не знайдено
 */

/**
 * @swagger
 * /sensors/{id}:
 *   patch:
 *     summary: Оновити дані датчика
 *     tags: [Sensors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID датчика
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SensorUpdateRequest"
 *     responses:
 *       200:
 *         description: Датчик оновлено
 */

router.post("/", authMiddleware, createSensor);
router.get("/", getSensors);
router.get("/:id", getSensorById);
router.patch("/:id", updateSensor);

export default router;
