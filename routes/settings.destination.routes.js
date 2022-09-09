import express from "express";
const router = express.Router();
import { auth } from "../middleware/auth.middleware.js";
import {
  createDestination,
  getDestination,
  deleteDestination,
  updateDestination,
} from "../controllers/settings.destination.js";

router.post("/create", auth, createDestination);
router.get("/", auth, getDestination);
router.delete("/delete", auth, deleteDestination);
router.put("/update", auth, updateDestination);

export default router;
