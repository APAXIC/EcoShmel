// controllers/readingController.js
import SensorReading from "../models/SensorReading.js";
import { evaluateThresholds } from "../services/thresholdEvaluationService.js";
import Sensor from "../models/sensor.js";

// POST /api/readings/ingest
export const ingest = async (req, res) => {
  // const { sensorId, value, unit, capturedAt } = req.body;
  //
  // const reading = await SensorReading.create({
  //   sensorId,
  //   value,
  //   unit,
  //   capturedAt: capturedAt ? new Date(capturedAt) : new Date()
  // });

  const { sensorUid, value, unit} = req.body;

  const sensor = await Sensor.findOne({ uid: sensorUid });
  if (!sensor) {
    return res.status(404).json({ message: "Sensor not registered" });
  }

  const reading = await SensorReading.create({
    sensorId: sensor._id,
    value,
    unit,
    capturedAt: new Date()
  });

  await evaluateThresholds(reading);

  res.status(201).json({
    message: "Показник збережено",
    reading
  });
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
