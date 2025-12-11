import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Municipality from "./models/Municipality.js";
import Sensor from "./models/Sensor.js";
import SensorReading from "./models/SensorReading.js";
import ThresholdRule from "./models/ThresholdRule.js";
import AlertEvent from "./models/AlertEvent.js";
import { hashPassword } from "./utils/auth.js";

dotenv.config();

async function seed() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Clearing collections...");
    await Promise.all([
      User.deleteMany(),
      Municipality.deleteMany(),
      Sensor.deleteMany(),
      SensorReading.deleteMany(),
      ThresholdRule.deleteMany(),
      AlertEvent.deleteMany()
    ]);

    console.log("Creating admin user...");
    const admin = await User.create({
      email: "admin@test.com",
      passwordHash: await hashPassword("password123"),
      name: "Admin User",
      roles: ["admin"],
      pushTokens: []
    });

    console.log("Creating municipality...");
    const municipality = await Municipality.create({
      name: "Dublin District",
      country: "Ireland",
      geoPolygon: {
        type: "Polygon",
        coordinates: [
          [
            [-6.28, 53.34],
            [-6.26, 53.36],
            [-6.24, 53.35],
            [-6.28, 53.34]
          ]
        ]
      },
      timeZone: "Europe/Dublin",
      createdBy: admin._id
    });

    console.log("Creating sensor...");
    const sensor = await Sensor.create({
      uid: "SENSOR-001",
      type: "temperature",
      municipalityId: municipality._id,
      location: {
        type: "Point",
        coordinates: [-6.2603, 53.3498]
      },
      description: "Main monitoring sensor",
      protocol: "LoRaWAN",
      createdBy: admin._id
    });

    console.log("Creating test readings...");
    await SensorReading.create([
      {
        sensorId: sensor._id,
        value: 25,
        unit: "C",
        capturedAt: new Date(Date.now() - 3600 * 1000)
      },
      {
        sensorId: sensor._id,
        value: 27,
        unit: "C",
        capturedAt: new Date()
      }
    ]);

    console.log("Creating a rule...");
    const rule = await ThresholdRule.create({
      sensorId: sensor._id,
      metric: "temperature",
      operator: ">=",
      threshold: 30,
      severity: "high",
      createdBy: admin._id
    });

    console.log("Creating test alert...");
    await AlertEvent.create({
      type: "manual",
      sensorId: sensor._id,
      municipalityId: municipality._id,
      ruleId: rule._id,
      severity: "medium",
      message: "Test alert",
      geo: {
        type: "Point",
        coordinates: [-6.2603, 53.3498]
      },
      triggeredAt: new Date()
    });

    console.log("Database seeded successfully!");
    process.exit(0);

  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

seed();
