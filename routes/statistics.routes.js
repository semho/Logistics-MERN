import express from "express";
const router = express.Router();
import {
  getSumShipProductOrganization,
  getSumArrivalProductOrganization,
  maxPriceProduct,
  minPriceProduct,
  shipArrivalProducts,
  shipArrivalProductsDateInterval,
} from "../controllers/statistics.js";
import { auth } from "../middleware/auth.middleware.js";

router.get("/ship-product/:id", auth, getSumShipProductOrganization);
router.get("/arrival-product/:id", auth, getSumArrivalProductOrganization);
router.get("/max-price", auth, maxPriceProduct);
router.get("/min-price", auth, minPriceProduct);
router.post("/ship-arrival-products", auth, shipArrivalProducts);
router.post(
  "/ship-arrival-products-interval",
  auth,
  shipArrivalProductsDateInterval
);

export default router;
