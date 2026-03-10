import Subscription from "../models/Subscription.js";

export const saveSubscription = async (req, res) => {
  try {
    const { browserId, subscription } = req.body;
    
    // 15 seconds ka time set kar rahe hain (15000 ms)
    const expiresAt = new Date(Date.now() + 15000); 

    let existing = await Subscription.findOne({ browserId });

    if (existing) {
      existing.subscription = subscription;
      existing.expiresAt = expiresAt; // Update expiry time
      await existing.save();
    } else {
      await Subscription.create({
        browserId,
        subscription,
        expiresAt // Save expiry time
      });
    }

    res.json({ success: true, expiresAt });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};