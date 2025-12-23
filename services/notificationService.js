import User from "../models/User.js";

export const buildNotificationsForAlert = async (alert) => {
  // const users = await User.find({
  //   municipalityId: alert.municipalityId
  // });

  const users = await User.find();

  const notifications = users.map(user => ({
    userId: user._id,
    alertId: alert._id,
    title: "Увага! Потенційна небезпека",
    message: alert.message,
    createdAt: new Date() // UTC
  }));

  console.log("Notifications generated:", notifications.length);

  return notifications;
};
