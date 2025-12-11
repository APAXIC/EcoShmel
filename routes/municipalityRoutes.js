import express from "express";
import {
  createMunicipality,
  getMunicipalities,
  getMunicipalityById,
  updateMunicipality
} from "../controllers/municipalityController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Municipalities
 *   description: Операції з муніципалітетами
 */

/**
 * @swagger
 * /municipalities:
 *   post:
 *     summary: Створити новий муніципалітет
 *     tags: [Municipalities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MunicipalityCreateRequest"
 *     responses:
 *       201:
 *         description: Муніципалітет створено
 */

/**
 * @swagger
 * /municipalities:
 *   get:
 *     summary: Отримати список муніципалітетів
 *     tags: [Municipalities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список муніципалітетів
 */

/**
 * @swagger
 * /municipalities/{id}:
 *   get:
 *     summary: Отримати муніципалітет за ID
 *     tags: [Municipalities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID муніципалітету
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Дані про муніципалітет
 *       404:
 *         description: Не знайдено
 */

/**
 * @swagger
 * /municipalities/{id}:
 *   patch:
 *     summary: Оновити дані муніципалітету
 *     tags: [Municipalities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID муніципалітету
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MunicipalityUpdateRequest"
 *     responses:
 *       200:
 *         description: Муніципалітет оновлено
 */

router.post("/", authMiddleware, createMunicipality);
router.get("/", getMunicipalities);
router.get("/:id", getMunicipalityById);
router.patch("/:id", updateMunicipality);

export default router;
