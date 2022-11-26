import express from "express";
const router = express.Router();
import { signup, signin, refreshToken } from "../controllers/auth.js";

router.post("/register", signup);
router.post("/login", signin);
router.post("/refreshtoken", refreshToken);

export default router;
