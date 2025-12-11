import mongoose from "mongoose";

const MunicipalitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },

  geoPolygon: {
    type: { type: String, enum: ["Polygon"], default: "Polygon" },
    coordinates: { type: [[[Number]]], required: true }
  },

  timeZone: { type: String, required: true },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.model("Municipality", MunicipalitySchema);