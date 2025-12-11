import mongoose from "mongoose";

const SensorReadingSchema = new mongoose.Schema({
  sensorId: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor", required: true },

  value: { type: Number, required: true },
  unit: { type: String, required: true },

  capturedAt: { type: Date, required: true },
  receivedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("SensorReading", SensorReadingSchema);