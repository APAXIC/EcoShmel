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

    // Шукаємо активну тривогу для цього правила та сенсора
    const activeAlert = await AlertEvent.findOne({
      sensorId: sensor._id,
      ruleId: rule._id,
      resolvedAt: { $exists: false }
    });

    if (isExceeded && !activeAlert) {
      // Сценарій А: Поріг перевищено, а тривоги ще немає -> СТВОРЮЄМО
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
      console.log("🔥 Створено нову тривогу:", newAlert._id);

    } else if (!isExceeded && activeAlert) {
      // Сценарій Б: Показники в нормі, але була активна тривога -> ЗАКРИВАЄМО
      activeAlert.resolvedAt = new Date();
      activeAlert.status = 'resolved';
      await activeAlert.save();

      await sendPushNotification(activeAlert, 'resolved');
      console.log("✅ Тривогу закрито:", activeAlert._id);
    }
  }
};