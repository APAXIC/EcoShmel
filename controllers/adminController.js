import User from "../models/user.js";
import Sensor from "../models/sensor.js";
import SensorReading from "../models/sensorReading.js";
import AlertEvent from "../models/alertEvent.js";
import {sendPushNotification} from "../services/notificationService.js";


export const getUsers = async (req, res) => {
  try {
    if (!req.user.roles.includes("admin")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find()
      .select("_id name email roles language createdAt");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to load users" });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (!req.user.roles.includes('admin')) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { name, email, roles } = req.body;

    // Знаходимо та оновлюємо (без пароля, пароль змінюється окремо)
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, roles },
      { new: true, runValidators: true }
    ).select("-passwordHash");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (!req.user.roles.includes('admin')) return res.status(403).json({ message: "Forbidden" });
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const deleteSensor = async (req, res) => {
  try {
    if (!req.user.roles.includes("admin")) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { id } = req.params;
    const sensor = await Sensor.findById(id);
    if (!sensor) {
      return res.status(404).json({ message: "Датчик не знайдено" });
    }

    await SensorReading.deleteMany({ sensorId: id });
    await AlertEvent.deleteMany({ sensorId: id });

    await Sensor.findByIdAndDelete(id);

    res.json({ message: "Sensor is deleted successfully" });
  } catch (error) {
    console.error("DETAILED DELETE ERROR:", error);
    res.status(500).json({
      message: "Sensor deleting server error",
      error: error.message
    });
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

    await sendPushNotification(alert, 'triggered');

    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ message: "Failed to create alert" });
  }
};

export const resolveAlert = async (req, res) => {
  try {
    const alert = await AlertEvent.findByIdAndUpdate(
      req.params.id,
      { resolvedAt: new Date(), status: 'resolved' },
      { new: true }
    );

    if (!alert) return res.status(404).json({ message: "Alert not found" });

    // Надсилаємо сповіщення про відбій
    await sendPushNotification(alert, 'resolved');

    res.json(alert);
  } catch (err) {
    res.status(500).json({ message: "Failed to resolve alert" });
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
