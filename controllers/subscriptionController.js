import Subscription from "../models/Subscription.js";

export const saveSubscription = async (req, res) => {
  try {

    const { browserId, subscription } = req.body;

    // ⭐ 15 second session
const expiresAt = new Date(Date.now() + 15000); // 15 seconds

    let existing = await Subscription.findOne({ browserId });

    if (existing) {

      existing.subscription = subscription;
      existing.expiresAt = expiresAt;   // ⭐ ADD
      await existing.save();

    } else {

      await Subscription.create({
        browserId,
        subscription,
        expiresAt  // ⭐ ADD
      });

    }

    res.json({ success: true });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
};