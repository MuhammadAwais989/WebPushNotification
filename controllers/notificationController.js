import Subscription from "../models/Subscription.js";
import Notification from "../models/Notification.js";
import webpush from "../config/webpush.js";
import { v4 as uuidv4 } from "uuid";

export const sendNotification = async (req, res) => {
await Subscription.deleteMany({
  expiresAt: { $lt: new Date() }
});
  try {

    const { browserIds, title, message, url } = req.body;

    const notificationId = uuidv4();

    const users = await Subscription.find({
  browserId: { $in: browserIds },
  expiresAt: { $gt: new Date() }   // ⭐ only active sessions
});

    if (!users.length) {
      return res.status(404).json({
        message: "No browsers found"
      });
    }

    const payload = JSON.stringify({
      notificationId,
      title,
      body: message,
      url
    });

    const promises = users.map(user =>
      webpush.sendNotification(user.subscription, payload)
    );

    await Promise.all(promises);

    await Notification.create({
      notificationId,
      title,
      message,
      browserIds
    });

    res.json({
      success: true,
      sent: users.length
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

};