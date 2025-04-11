import { Request, Response } from "express";
import { User } from "../models/User";
import { Event } from "../models/Event";
import QRCode from "qrcode";
import { Request, Response } from "express";

// Fetch user profile (tier, points, and events)
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).populate("events"); // Populate events with details

    if (!user) return res.status(404).json({ message: "User not found" });

    user.calculateTier(); // Calculate tier based on points
    await user.save(); // Save the updated tier

    res.json({
      name: user.name,
      email: user.email,
      points: user.points,
      tier: user.tier,
      events: user.events,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};

export const getMembershipQRCode = async (req: Request, res: Response) => {
  const user = req.user;
  const dataToEncode = JSON.stringify({
    membershipId: user.membershipId,
    name: user.name,
    tier: user.tier,
  });

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(dataToEncode);
    res.status(200).json({ qrCode: qrCodeDataUrl });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate QR Code" });
  }
};
