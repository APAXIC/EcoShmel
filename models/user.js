import mongoose from "mongoose";

const PushTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  platform: { type: String, enum: ["android", "ios", "web"], required: true },
  deviceId: { type: String },
  lastSeenAt: { type: Date, default: Date.now }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },

  roles: {
    type: [String],
    enum: ["user", "operator", "admin"],
    default: ["user"]
  },

  pushTokens: [PushTokenSchema],

  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] }
  }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);