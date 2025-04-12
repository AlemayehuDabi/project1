import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Notification document
interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  read: boolean;
  message?: string; // Optional: inferred as a common field for notifications
  createdAt: Date; // Optional: standard timestamp field
}

// Define the Notification schema
const NotificationSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assumes a User model exists
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: false, // Optional field for notification content
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Notification model
export const Notification = mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
