// backend/cronJob.ts
import cron from "node-cron";
import { Event } from "../models/eventModel";
import { sendNotification } from "../service/notificationService";

cron.schedule("*/1 * * * *", async () => {
  // Every minute
  const events = await Event.find();
  const now = new Date();

  events.forEach((event) => {
    const eventTime = new Date(event.date);
    const timeDifference =
      Math.abs(now.getTime() - eventTime.getTime()) / (1000 * 3600); // hours difference

    if (timeDifference >= event.notifyInterval) {
      sendNotification(event);
    }
  });
});
