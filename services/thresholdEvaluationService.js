import ThresholdRule from "../models/ThresholdRule.js";
import AlertEvent from "../models/AlertEvent.js";
import Sensor from "../models/Sensor.js";
import { buildNotificationsForAlert } from "./notificationService.js";


export const evaluateThresholds = async (reading) => {
  const sensor = await Sensor.findById(reading.sensorId);
  if (!sensor) return;

  const rules = await ThresholdRule.find({
    sensorId: sensor._id,
    active: true
  });

  for (const rule of rules) {
    const triggered = checkRule(
      reading.value,
      rule.operator,
      rule.threshold
    );

    if (!triggered) continue;

    const alert = await AlertEvent.create({
      sensorId: sensor._id,
      municipalityId: sensor.municipalityId,
      severity: rule.severity,
      type: rule.metric,
      message: `The Threshold is exceeded: ${rule.metric}`,
      triggeredValue: reading.value,
      threshold: rule.threshold,
      createdAt: new Date()
    });

    await buildNotificationsForAlert(alert);
  }
};

const checkRule = (value, operator, threshold) => {
  switch (operator) {
    case ">": return value > threshold;
    case ">=": return value >= threshold;
    case "<": return value < threshold;
    case "<=": return value <= threshold;
    case "==": return value === threshold;
    default: return false;
  }
};
