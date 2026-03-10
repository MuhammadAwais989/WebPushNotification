import Subscription from "../models/Subscription.js";

export const saveSubscription = async (req, res) => {
  try {
    const { browserId, subscription } = req.body;

    const expiresAt = new Date(Date.now() + 10 * 1000);
    // const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    let existing = await Subscription.findOne({ browserId });

    if (existing) {
      existing.subscription = subscription;
      existing.expiresAt = expiresAt;

      await existing.save();
    } else {
      await Subscription.create({
        browserId,
        subscription,
        expiresAt,
      });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
