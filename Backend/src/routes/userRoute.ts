import express from "express";
import { getUserProfile } from "../controllers/userController";

const router = express.Router();

// Protected route to fetch user profile
router.get("/profile", getUserProfile);

export default router;
