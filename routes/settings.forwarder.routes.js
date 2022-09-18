import express from "express";
const router = express.Router();
import { auth } from "../middleware/auth.middleware.js";
import {
  createForwarder,
  getForwarders,
  deleteForwarder,
  updateForwarder,
} from "../controllers/settings.forwarder.js";

router.post("/create", auth, createForwarder);
router.get("/", auth, getForwarders);
router.delete("/delete", auth, deleteForwarder);
router.put("/update", auth, updateForwarder);

export default router;
