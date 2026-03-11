import Notification from "../models/Notification.js";

export const confirmDelivery = async (req, res) => {
  const { notificationId, browserId } = req.body;

  try {
    await Notification.findOneAndUpdate(
      { notificationId },
      { $addToSet: { deliveredTo: browserId } } // avoid duplicates
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};