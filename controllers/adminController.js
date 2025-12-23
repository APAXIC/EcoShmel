import User from "../models/User.js";
import SensorReading from "../models/SensorReading.js";
import AlertEvent from "../models/AlertEvent.js";
import {buildNotificationsForAlert} from "../services/notificationService.js";


export const getUsers = async (req, res) => {
  try {
    if (!req.user.roles.includes("admin")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find()
      .select("_id email role language createdAt");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to load users" });
  }
};


export const getReadings = async (req, res) => {
  try {
    if (!req.user.roles.includes("admin")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { sensorId } = req.query;
    const filter = sensorId ? { sensorId } : {};

    const readings = await SensorReading.find(filter)
      .sort({ createdAt: -1 });

    res.json(readings);
  } catch (err) {
    res.status(500).json({ message: "Failed to load readings" });
  }
};


export const createManualAlert = async (req, res) => {
  try {
    if (!req.user.roles.includes("admin")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const alert = await AlertEvent.create({
      ...req.body,
      type: "manual"
    });

    await buildNotificationsForAlert(alert);

    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ message: "Failed to create alert" });
  }
};


export const exportAlerts = async (req, res) => {
  try {
    if (!req.user.roles.includes("admin")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const alerts = await AlertEvent.find()
      .sort({ createdAt: -1 });

    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: "Export failed" });
  }
};
