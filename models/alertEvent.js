import mongoose from "mongoose";

const AlertEventSchema = new mongoose.Schema({
  type: { type: String, required: true },

  sensorId: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor", required: true },
  ruleId: { type: mongoose.Schema.Types.ObjectId, ref: "ThresholdRule" },

  municipalityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Municipality",
    required: true
  },

  message: { type: String },

  geo: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }
  },

  status: {
    type: String,
    enum: ["triggered", "notified", "acknowledged", "resolved"],
    default: "triggered"
  },

  triggeredAt: { type: Date, default: Date.now },
  notifiedAt: { type: Date },
  resolvedAt: { type: Date }
}, { timestamps: true });

export default mongoose.model("AlertEvent", AlertEventSchema);
