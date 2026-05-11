import { Expo } from 'expo-server-sdk';
import User from '../models/user.js';
import Municipality from '../models/municipality.js';

const expo = new Expo();

export const sendPushNotification = async (alert, statusType) => {
  // 1. Отримуємо зону муніципалітету
  const municipality = await Municipality.findById(alert.municipalityId);
  if (!municipality) return;

  // 2. Шукаємо користувачів у цій гео-зоні, у яких є токени
  const users = await User.find({
    location: {
      $geoIntersects: {
        $geometry: municipality.geoPolygon
      }
    },
    pushTokens: { $exists: true, $not: { $size: 0 } }
  });

  const messages = [];
  const title = statusType === 'triggered' ? "🔴 НОВА ТРИВОГА" : "🟢 ВІДБІЙ ТРИВОГИ";
  const body = statusType === 'triggered'
    ? `${alert.message}. Початок: ${new Date(alert.triggeredAt).toLocaleTimeString()}`
    : `Тривогу скасовано: ${alert.type}. Завершено о ${new Date().toLocaleTimeString()}`;

  for (let user of users) {
    for (let token of user.pushTokens) {
      if (!Expo.isExpoPushToken(token)) continue;
      messages.push({
        to: token,
        sound: 'default',
        title,
        body,
        data: { municipalityId: alert.municipalityId, screen: 'history' },
      });
    }
  }

  let chunks = expo.chunkPushNotifications(messages);
  for (let chunk of chunks) {
    try {
      await expo.sendPushNotificationsAsync(chunk);
    } catch (error) {
      console.error("Помилка відправки Push:", error);
    }
  }
};