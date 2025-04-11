import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRouter";
import propertyRoutes from "./routes/propertyRoutes";
import favoritesRoutes from "./routes/favoritesRoutes";
import categoryRoute from "./routes/categoryRoute";
import cookieParser from "cookie-parser";
import multer from "multer";
import chatRoute from "./routes/chatRoute";
import messageRoute from "./routes/messageRoute";
import userRouter from "./routes/userRoutes";

import { app, server } from "./utils/socket";

dotenv.config();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Database connection
connectDB();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/properties", upload.single("image"), propertyRoutes);
// app.use("/api/favorites", upload.single("image"), favoritesRoutes);
// app.use("/api/categories", categoryRoute);
// app.use("/api/chat", chatRoute);
// app.use("/api/message", messageRoute);
// app.use("/api/user", userRouter);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectDB();
});
