// backend/routes/notificationRoutes.ts
import express from "express";
import {
  getUserNotifications,
  markNotificationAsRead,
} from "../controller/notificationController";
import { authenticateUser } from "../middleWare/protect"; // Assuming you have an auth middleware

const router = express.Router();

// Protected routes for notifications
router.get("/", authenticateUser, getUserNotifications);
router.put("/:id", authenticateUser, markNotificationAsRead);

export default router;
