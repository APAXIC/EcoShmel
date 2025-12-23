import express from "express";
import userRoutes from "./userRoutes.js";
import municipalityRoutes from "./municipalityRoutes.js";
import sensorRoutes from "./sensorRoutes.js";
import readingRoutes from "./readingRoutes.js";
import ruleRoutes from "./thresholdRuleRoutes.js";
import alertRoutes from "./alertRoutes.js";
import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/municipalities", municipalityRoutes);
router.use("/sensors", sensorRoutes);
router.use("/readings", readingRoutes);
router.use("/rules", ruleRoutes);
router.use("/alerts", alertRoutes);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;
