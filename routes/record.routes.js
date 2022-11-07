import express from "express";
const router = express.Router();
import {
  createRecord,
  deleteRecord,
  getRecordOne,
  getRecords,
  updateRecord,
} from "../controllers/record.js";
import { auth } from "../middleware/auth.middleware.js";

router.post("/create", auth, createRecord);
router.get("/", auth, getRecords);
router.get("/:id", auth, getRecordOne);
router.delete("/delete", auth, deleteRecord);
router.put("/update", auth, updateRecord);

export default router;
