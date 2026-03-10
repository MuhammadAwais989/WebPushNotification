import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  notificationId: String,
  title: String,
  message: String,
  browserIds: [String],
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Notification", notificationSchema);
