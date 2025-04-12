import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
  points: number;
  tier: string; // "Silver", "Gold", "Platinum", etc.
  events: mongoose.Types.ObjectId[]; // References to upcoming events
  role: "user" | "admin";
  refreshToken?: string;
  membershipId: string;
  calculateTier: () => void;
  // Add calculateTier method type
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// User schema definition with tier and points
const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 15,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  points: { type: Number, default: 0 }, // Points earned
  tier: { type: String, default: "Silver" }, // Default tier
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }], // Referencing events
  role: { type: String, enum: ["user", "admin"], default: "user" },
  membershipId: {
    type: String,
    unique: true,
    // required: true,
    default: () => new mongoose.Types.ObjectId().toString(), // Convert ObjectId to string
  },
  refreshToken: { type: String },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
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

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  try {
    const password = enteredPassword.toString();
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    console.error("Error during password comparison:", error);
    throw new Error("Error comparing passwords");
  }
};

// Compare password
userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
