import AlertEvent from "../models/alertEvent.js";
import Sensor from "../models/sensor.js";
import ThresholdRule from "../models/thresholdRule.js";
import { sendPushNotification } from "./notificationService.js";

const checkRule = (value, op, threshold) => {
  if (op === '>') return value > threshold;
  if (op === '<') return value < threshold;
  if (op === '>=') return value >= threshold;
  if (op === '<=') return value <= threshold;
  if (op === '==') return value === threshold;
  return false;
};

export const evaluateThresholds = async (reading) => {
  const sensor = await Sensor.findById(reading.sensorId);
  const rules = await ThresholdRule.find({ sensorId: sensor._id, active: true });

  for (const rule of rules) {
    const isExceeded = checkRule(reading.value, rule.operator, rule.threshold);

    const activeAlert = await AlertEvent.findOne({
      sensorId: sensor._id,
      ruleId: rule._id,
      resolvedAt: { $exists: false }
    });

    if (isExceeded && !activeAlert) {
      const newAlert = await AlertEvent.create({
        type: rule.metric,
        sensorId: sensor._id,
        ruleId: rule._id,
        municipalityId: sensor.municipalityId,
        message: `Перевищення порогу: ${rule.metric} (${reading.value} ${rule.operator} ${rule.threshold})`,
        geo: sensor.location,
        status: 'triggered',
        triggeredAt: new Date()
      });

      await sendPushNotification(newAlert, 'triggered');

    } else if (!isExceeded && activeAlert) {
      activeAlert.resolvedAt = new Date();
      activeAlert.status = 'resolved';
      await activeAlert.save();

      await sendPushNotification(activeAlert, 'resolved');
    }
  }
};