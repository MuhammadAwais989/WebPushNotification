import Subscription from "../models/Subscription.js";
import Notification from "../models/Notification.js";
import webpush from "../config/webpush.js";
import { v4 as uuidv4 } from "uuid";

export const sendNotification = async (req, res) => {
  try {
    // expired subscriptions delete
    await Subscription.deleteMany({
      expiresAt: { $lt: new Date() }
    });

    const { browserIds, title, message, url } = req.body;

    const notificationId = uuidv4();

    // only active sessions
    const users = await Subscription.find({
      browserId: { $in: browserIds },
      expiresAt: { $gt: new Date() }  // only active
    });

    if (!users.length) {
      return res.status(404).json({ message: "No active browsers" });
    }

    const payload = JSON.stringify({ notificationId, title, body: message, url });

    await Promise.all(users.map(user =>
      webpush.sendNotification(user.subscription, payload)
    ));

    await Notification.create({
      notificationId,
      title,
      message,
      browserIds
    });

    res.json({ success: true, sent: users.length });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};