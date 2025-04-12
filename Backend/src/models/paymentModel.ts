import mongoose, { Document, Schema } from "mongoose";

// Define the structure of the Payment document
export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the user making the payment
  eventId?: mongoose.Types.ObjectId; // Optional reference to an event
  serviceId?: mongoose.Types.ObjectId; // Optional reference to a service
  amount: number;
  status: "pending" | "completed" | "failed"; // Enum for status
  paymentMethod: string;
  transactionId: string; // Unique transaction reference (e.g., tx_ref)
  paymentDate: Date;
}

// Define the Payment schema
const paymentSchema = new mongoose.Schema<IPayment>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: false, // Not required if paying for a service
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: false, // Not required if paying for an event
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount cannot be negative"],
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true, // Ensure transactionId is unique
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Ensure at least one of eventId or serviceId is provided
paymentSchema.pre("validate", function (next) {
  if (!this.eventId && !this.serviceId) {
    return next(new Error("Either eventId or serviceId must be provided"));
  }
  next();
});

// Export the Payment model
export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
