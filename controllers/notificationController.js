import Subscription from "../models/Subscription.js";
import Notification from "../models/Notification.js";
import webpush from "../config/webpush.js";
import { v4 as uuidv4 } from "uuid";

export const sendNotification = async (req, res) => {
  try {
    const { browserIds, title, message, url } = req.body;
    const notificationId = uuidv4();

    const users = await Subscription.find({ browserId: { $in: browserIds } });

    if (!users.length) {
      return res.status(404).json({ message: "No browsers found" });
    }

    const payload = JSON.stringify({ notificationId, title, body: message, url });

    // Track successful deliveries
    let deliveredCount = 0;
    const promises = users.map(async (user) => {
      try {
        await webpush.sendNotification(user.subscription, payload);
        deliveredCount++; // if resolved, consider delivered
      } catch (err) {
        console.error("Delivery failed for browserId:", user.browserId, err.message);
      }
    });

    await Promise.all(promises);

    // Save notification in DB including delivery count
    await Notification.create({
      notificationId,
      title,
      message,
      browserIds,
      delivered: deliveredCount // new field
    });

    res.json({ success: true, totalUsers: users.length, delivered: deliveredCount });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};