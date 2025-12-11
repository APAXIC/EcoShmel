import mongoose from "mongoose";

const ThresholdRuleSchema = new mongoose.Schema({
  sensorId: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor" },
  sensorType: { type: String },

  metric: { type: String, required: true },
  operator: { type: String, enum: [">", "<", ">=", "<=", "=="], required: true },

  threshold: { type: Number, required: true },
  severity: { type: String, enum: ["low", "medium", "high", "critical"], default: "medium" },

  active: { type: Boolean, default: true },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

export default mongoose.model("ThresholdRule", ThresholdRuleSchema);