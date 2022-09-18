import express from "express";
const router = express.Router();
import { auth } from "../middleware/auth.middleware.js";
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/settings.product.js";

router.post("/create", auth, createProduct);
router.get("/", auth, getProducts);
router.delete("/delete", auth, deleteProduct);
router.put("/update", auth, updateProduct);

export default router;
