// controllers/alertController.js
import AlertEvent from "../models/alertEvent.js";

// GET /api/alerts
export const getAlerts = async (req, res) => {
  try {
    const alerts = await AlertEvent.find()
      .populate("sensorId", "uid type")
      .populate("municipalityId", "name")
      .populate("ruleId", "metric operator threshold");

    res.json(alerts);
  } catch (error) {
    console.error("Login Error Details:", error);
    res.status(500).json({ message: "Failed to load alerts" });
  }
};

// GET /api/alerts/:id
export const getAlertById = async (req, res) => {
  try {
    const alert = await AlertEvent.findById(req.params.id)
      .populate("sensorId", "uid type")
      .populate("municipalityId", "name")
      .populate("ruleId", "metric operator threshold");

    if (!alert)
      return res.status(404).json({ message: "Alert not found" });

    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: "Failed to load alert" });
  }
};

// POST /api/alerts/manual
export const createManualAlert = async (req, res) => {
  try {
    const alert = await AlertEvent.create({
      ...req.body,
      triggeredAt: Date.now()
    });

    res.status(201).json(alert);
  } catch (error) {
    console.error("Login Error Details:", error);
    res.status(500).json({ message: "Failed to create alert" });
  }
};
