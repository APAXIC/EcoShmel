// controllers/readingController.js
import SensorReading from "../models/SensorReading.js";

// POST /api/readings/ingest
export const ingest = async (req, res) => {
  try {
    const reading = await SensorReading.create({
      ...req.body,
      receivedAt: Date.now()
    });

    res.status(201).json(reading);
  } catch (error) {
    console.error("Login Error Details:", error);
    res.status(500).json({ message: "Failed to ingest reading" });
  }
};

// GET /api/readings/sensor/:sensorId
export const getReadingsBySensor = async (req, res) => {
  try {
    const readings = await SensorReading.find({ sensorId: req.params.sensorId })
      .sort({ capturedAt: -1 });

    res.json(readings);
  } catch (error) {
    res.status(500).json({ message: "Failed to load readings" });
  }
};
