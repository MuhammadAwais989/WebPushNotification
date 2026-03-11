import express from "express";
import { confirmDelivery } from "../controllers/deliveryController.js";

const router = express.Router();

router.post("/confirm-delivery", confirmDelivery);

export default router;