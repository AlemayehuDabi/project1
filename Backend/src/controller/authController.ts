import { Request, Response } from "express";
import { User } from "../models/userModel";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../util/generateToken";

// sign up function
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password === undefined) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    console.log(accessToken, refreshToken);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Comment this out for development
      // sameSite: 'Strict'
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Comment this out for development
      // sameSite: 'Strict'
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userData = user.toObject();
    const { password: pass, refreshToken: refresh, ...rest } = userData;

    res.status(201).json({
      message: "User created successfully",
      rest,
    });
  } catch (error: any) {
    console.error(error);
    let errorMessage = "An unexpected error occurred. Please try again later.";
    if (error.errors) {
      if (error.errors.dob) {
        errorMessage = error.errors.dob.message;
      } else if (error.errors.password) {
        errorMessage = error.errors.password.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    res.status(500).json({ message: errorMessage });
  }
};

// sign in function
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user: any = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    user.refreshToken = refreshToken;

    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Comment this out for development
      // sameSite: 'Strict'
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Comment this out for development
      // sameSite: 'Strict'
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userData = user.toObject();
    const { password: pass, refreshToken: refresh, ...rest } = userData;

    res.status(200).json({
      message: "Login successful",
      user: rest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
    return;
  }
};
