import express from "express";
import { getUserProfile } from "../controller/userController";
import { authenticateUser } from "../middleWare/protect";

const router = express.Router();

// Protected route to fetch user profile
router.get("/profile", authenticateUser, getUserProfile);

export default router;
