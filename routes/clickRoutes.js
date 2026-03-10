import express from "express";
import { trackClick } from "../controllers/clickController.js";

const router = express.Router();

router.post("/click-track", trackClick);

export default router;