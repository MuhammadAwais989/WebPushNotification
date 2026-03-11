import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import DBConnect from "./config/db.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import clickRoutes from "./routes/clickRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";



dotenv.config();

const app = express();

app.use(cors(
    {
        // origin: "http://localhost:5173",
        origin: "https://web-push-notification-frontend.vercel.app",
        credentials: true
    }
));
app.use(express.json());

DBConnect();

app.use("/api", subscriptionRoutes);
app.use("/api", notificationRoutes);
app.use("/api", clickRoutes);
app.use("/api", deliveryRoutes);

app.listen(5000, () => {
  console.log("Server running on 5000");
});