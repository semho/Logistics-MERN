import express from "express";
const router = express.Router();
import { signup, signin } from "../controllers/auth.js";

router.post("/register", signup);
router.post("/login", signin);

export default router;
