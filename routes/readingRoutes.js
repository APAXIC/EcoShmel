import express from "express";
import {
  ingest,
  getReadingsBySensor
} from "../controllers/readingController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Readings
 *   description: Робота з показниками датчиків
 */

/**
 * @swagger
 * /readings/ingest:
 *   post:
 *     summary: Додати новий показник датчика
 *     tags: [Readings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ReadingCreateRequest"
 *     responses:
 *       201:
 *         description: Значення збережено
 */

/**
 * @swagger
 * /readings/sensor/{sensorId}:
 *   get:
 *     summary: Отримати всі показники за конкретним датчиком
 *     tags: [Readings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: sensorId
 *         in: path
 *         required: true
 *         description: ID датчика
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Список показників датчика
 */

router.post("/ingest", ingest);
router.get("/sensor/:sensorId", getReadingsBySensor);

export default router;
