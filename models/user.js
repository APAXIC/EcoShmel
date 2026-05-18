import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },

  roles: {
    type: [String],
    enum: ["user", "operator", "admin"],
    default: ["user"]
  },

  pushTokens: [String],

  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] }
  },

  language: {
    type: String,
    enum: ["uk", "en"],
    default: "uk"
  }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);