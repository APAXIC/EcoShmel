import mongoose from "mongoose";

const SensorSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  type: { type: String, required: true },

  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }
  },

  municipalityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Municipality",
    required: true
  },

  description: { type: String },
  protocol: { type: String },

  lastSeenAt: { type: Date },
  status: { type: String, enum: ["online", "offline", "error"], default: "offline" },

  metadata: { type: Object },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Sensor", SensorSchema);