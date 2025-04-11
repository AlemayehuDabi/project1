import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Event } from "../models/eventModel";
import QRCode from "qrcode";

// Fetch user profile (tier, points, and events)
export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("events"); // Populate events with details

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

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
    return;
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
