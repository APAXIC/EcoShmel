// controllers/sensorController.js
import Sensor from "../models/Sensor.js";

// POST /api/sensors
export const createSensor = async (req, res) => {
  try {
    const sensor = await Sensor.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json(sensor);
  } catch (error) {
    console.error("Error Details:", error);
    res.status(500).json({ message: "Failed to create sensor" });
  }
};

// GET /api/sensors
export const getSensors = async (req, res) => {
  try {
    const sensors = await Sensor.find()
      .populate("municipalityId", "name")
      .populate("createdBy", "name");

    res.json(sensors);
  } catch (error) {
    res.status(500).json({ message: "Failed to load sensors" });
  }
};

// GET /api/sensors/:id
export const getSensorById = async (req, res) => {
  try {
    const sensor = await Sensor.findById(req.params.id)
      .populate("municipalityId", "name")
      .populate("createdBy", "name");

    if (!sensor)
      return res.status(404).json({ message: "Sensor not found" });

    res.json(sensor);
  } catch (error) {
    res.status(500).json({ message: "Failed to load sensor" });
  }
};

// PATCH /api/sensors/:id
export const updateSensor = async (req, res) => {
  try {
    const updated = await Sensor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Sensor not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update sensor" });
  }
};
