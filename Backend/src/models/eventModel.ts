import mongoose, { Document } from "mongoose";

export interface IEvent extends Document {
  name: string;
  description: string;
  date: Date;
  location: string;
  isPaid: boolean;
  price: number;
  usersRegistered: mongoose.Types.ObjectId[];
}

const eventSchema = new mongoose.Schema<IEvent>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  isPaid: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  usersRegistered: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export const Event = mongoose.model<IEvent>("Event", eventSchema);
