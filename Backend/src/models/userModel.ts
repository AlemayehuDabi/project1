import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
  points: number;
  tier: string; // "Silver", "Gold", "Platinum", etc.
  events: mongoose.Types.ObjectId[]; // References to upcoming events
  role: "user" | "admin";
  membershipId: string;
  calculateTier: () => void; // Add calculateTier method type
}

// User schema definition with tier and points
const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email validation regex
  },
  password: { type: String, required: true },
  points: { type: Number, default: 0 }, // Points earned
  tier: { type: String, default: "Silver" }, // Default tier
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }], // Referencing events
  role: { type: String, enum: ["user", "admin"], default: "user" },
  membershipId: {
    type: String,
    unique: true,
    required: true,
    default: () => new mongoose.Types.ObjectId().toString(), // Convert ObjectId to string
  },
});

// Function to calculate user tier based on points
userSchema.methods.calculateTier = function () {
  if (this.points > 1000) this.tier = "Platinum";
  else if (this.points > 500) this.tier = "Gold";
  else this.tier = "Silver";
};

// Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);

  // Ensure tier is calculated before save
  this.calculateTier();

  next();
});

// Compare password
userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
