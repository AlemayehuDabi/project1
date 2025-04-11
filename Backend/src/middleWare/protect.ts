// middleware/authorizeAdmin.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

// Interface to extend the Request type to include 'user'
interface AuthRequest extends Request {
  user?: any;
  headers: {
    authorization?: string;
  };
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// authorize admin
export const authorizeAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Admin access only" });
};

// middleware/authenticateUser.ts
export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      res.status(401).json({ message: "Unauthorized: User not found" });
      return;
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }
};
