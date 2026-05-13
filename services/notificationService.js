import { Expo } from 'expo-server-sdk';
import User from '../models/user.js';
import Municipality from '../models/municipality.js';

const expo = new Expo();

export const sendPushNotification = async (alert, statusType) => {
  const municipality = await Municipality.findById(alert.municipalityId);
  if (!municipality) return;

  const users = await User.find({
    location: {
      $geoIntersects: {
        $geometry: municipality.geoPolygon
      }
    },
    pushTokens: { $exists: true, $not: { $size: 0 } }
  }).select("pushTokens language");

  const messages = [];

  const content = {
    uk: {
      title: statusType === 'triggered' ? "🔴 НОВА ТРИВОГА" : "🟢 ВІДБІЙ ТРИВОГИ",
      bodyTriggered: `${alert.message}. Початок: ${new Date(alert.triggeredAt).toLocaleTimeString('uk-UA')}`,
      bodyResolved: `Тривогу скасовано: ${alert.type}. Завершено о ${new Date().toLocaleTimeString('uk-UA')}`
    },
    en: {
      title: statusType === 'triggered' ? "🔴 NEW ALERT" : "🟢 ALERT RESOLVED",
      bodyTriggered: `${alert.message}. Started at: ${new Date(alert.triggeredAt).toLocaleTimeString('en-US')}`,
      bodyResolved: `Alert cancelled: ${alert.type}. Finished at ${new Date().toLocaleTimeString('en-US')}`
    }
  };


  for (let user of users) {
    const lang = user.language === 'en' ? 'en' : 'uk';
    const text = content[lang];

    const title = text.title;
    const body = statusType === 'triggered' ? text.bodyTriggered : text.bodyResolved;

    for (let token of user.pushTokens) {
      const tokenValue = typeof token === 'object' ? token.token : token;

      if (!Expo.isExpoPushToken(tokenValue)) {
        console.warn(`Invalid push token: ${tokenValue}`);
        continue;
      }

      messages.push({
        to: tokenValue,
        sound: 'default',
        title,
        body,
        data: {
          municipalityId: alert.municipalityId,
          screen: 'history'
        },
      });
    }
  }

  let chunks = expo.chunkPushNotifications(messages);
  for (let chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
    } catch (error) {
      console.error("Error sending Push:", error);
    }
  }
};