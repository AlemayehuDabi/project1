import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoute from "./routes/authRoute";
// import cookieParser from "cookie-parser";
// import multer from "multer";
import userRouter from "./routes/userRoute";
import paymentRouter from "./routes/paymentRoute";
import notificationRoutes from "./routes/notificationRoute";

// import { app, server } from "./utils/socket";

// Start the cron jobs
import "./util/cronScheduler";

const app = express();

dotenv.config();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
// app.use(cookieParser());

// Database connection
connectDB();

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/notifications", notificationRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectDB();
});
