import { Request, Response } from "express";
import { Notification } from "../models/notificationModel";

// Get unread notifications for the user
export const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({
      userId: req.user._id, // Assume `req.user` contains the authenticated user's details
      read: false,
    });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Error fetching notifications" });
  }
};

// Mark a notification as read
export const markNotificationAsRead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      res.status(404).json({ error: "Notification not found" });
      return;
    }

    notification.read = true;
    await notification.save();

    res.json({ message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({ error: "Error marking notification as read" });
    return;
  }
};
