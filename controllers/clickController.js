import Notification from "../models/Notification.js";

export const trackClick = async (req, res) => {

  try {

    const { notificationId } = req.body;

    await Notification.findOneAndUpdate(
      { notificationId },
      { $inc: { clicks: 1 } }
    );

    res.json({
      success: true
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};