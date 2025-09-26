import express from "express";
const router = express.Router();
import { getProfile } from "../controllers/users.js";
import { auth } from "./../middleware/auth.js";
router.get("/profile", auth, getProfile);
export default router;
