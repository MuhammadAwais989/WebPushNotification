import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  browserId: String,
  subscription: Object,

  createdAt: {
    type: Date,
    default: Date.now
  },

  expiresAt: {
    type: Date
  }
});

export default mongoose.model("Subscription", subscriptionSchema);