import mongoose, { Document } from "mongoose";

// Define the structure of the Payment document
export interface IPayment extends Document {
  eventId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId; // Added user reference
  amount: number;
  status: string;
  paymentMethod: string;
  transactionId: string;
  paymentDate: Date;
}

// Define the Payment schema
const paymentSchema = new mongoose.Schema<IPayment>({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // This ensures that the user making the payment is referenced
  },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  transactionId: { type: String, required: true },
  paymentDate: { type: Date, default: Date.now },
});

// Export the Payment model
export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
