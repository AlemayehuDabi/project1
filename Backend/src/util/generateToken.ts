import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../models/userModel";

export const generateToken = async (
  user: IUser,
  expiresIn: SignOptions["expiresIn"]
): Promise<string> => {
  const option: SignOptions = { expiresIn };

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET!,
    option
  );

  console.log("Generated Token: ", token);
  return token;
};

export const generateAccessToken = (user: IUser) => generateToken(user, "15m");
export const generateRefreshToken = (user: IUser) => generateToken(user, "7d");

export const verifyToken = (token: string) => {
  try {
    const value = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log("Verified Token Value: ", value);
    return value;
  } catch (error) {
    console.error("Token verification failed: ", error);
    return null;
  }
};
