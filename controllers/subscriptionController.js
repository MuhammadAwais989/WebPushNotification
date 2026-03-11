import Subscription from "../models/Subscription.js";

export const saveSubscription = async (req, res) => {
  try {
    const { browserId, subscription, phone } = req.body;

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: "Subscription must have an endpoint." });
    }

    let existing = await Subscription.findOne({ browserId });

    if (existing) {
      existing.subscription = subscription; // save subscription
      existing.phone = phone;              // save phone
      await existing.save();
    } else {
      await Subscription.create({
        browserId,
        subscription,
        phone
      });
    }

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};