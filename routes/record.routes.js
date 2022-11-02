import express from "express";
const router = express.Router();
import {
  createRecord,
  deleteRecord,
  getRecordOne,
  getRecords,
  updateRecord,
  getSumShipProductOrganization,
  getSumArrivalProductOrganization,
  maxPriceProduct,
  minPriceProduct,
} from "../controllers/record.js";
import { auth } from "../middleware/auth.middleware.js";

router.post("/create", auth, createRecord);
router.get("/", auth, getRecords);
router.get("/:id", auth, getRecordOne);
router.delete("/delete", auth, deleteRecord);
router.put("/update", auth, updateRecord);
router.get("/statistics/ship-product/:id", auth, getSumShipProductOrganization);
router.get(
  "/statistics/arrival-product/:id",
  auth,
  getSumArrivalProductOrganization
);
router.get("/statistics/max-price", auth, maxPriceProduct);
router.get("/statistics/min-price", auth, minPriceProduct);

export default router;
