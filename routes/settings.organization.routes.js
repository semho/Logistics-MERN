import express from "express";
const router = express.Router();
import { auth } from "../middleware/auth.middleware.js";
import {
  createOrganization,
  getOrganization,
  deleteOrganization,
  updateOrganization,
} from "../controllers/settings.organization.js";

router.post("/create", auth, createOrganization);
router.get("/", auth, getOrganization);
router.delete("/delete", auth, deleteOrganization);
router.put("/update", auth, updateOrganization);

export default router;
