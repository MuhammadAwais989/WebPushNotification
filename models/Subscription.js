import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  browserId: String,
  phone: String,   // ⭐ ADD

  subscription: Object,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Subscription", subscriptionSchema);