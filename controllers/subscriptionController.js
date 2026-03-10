import Subscription from "../models/Subscription.js";

export const saveSubscription = async (req, res) => {
  try {

    const { browserId, subscription } = req.body;

    let existing = await Subscription.findOne({ browserId });

    if (existing) {
      existing.subscription = subscription;
      await existing.save();
    } else {
      await Subscription.create({
        browserId,
        subscription
      });
    }

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};