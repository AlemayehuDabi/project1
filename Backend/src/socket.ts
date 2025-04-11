// backend/src/socket.ts
import { Server } from "socket.io";
import { Event } from "./models/eventModel";

export const setupSocketIO = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("New client connected");

    // Send real-time notifications (e.g., event reminders)
    const sendEventNotification = (event: any) => {
      io.emit("eventNotification", {
        message: `Reminder: ${event.title} is coming up soon!`,
        event,
      });
    };

    // Check for events and send notifications at fixed intervals
    setInterval(async () => {
      const events = await Event.find();
      events.forEach((event) => {
        const currentTime = new Date();
        const eventTime = new Date(event.date);
        const hoursUntilEvent =
          (eventTime.getTime() - currentTime.getTime()) / (1000 * 3600); // hours remaining

        if (hoursUntilEvent <= event.notifyInterval) {
          sendEventNotification(event); // Notify about event
        }
      });
    }, 60000); // Check every minute
  });
};
