// backend/server.js
import dotenv from "dotenv";
dotenv.config();
console.log(
  "Gemini key loaded:",
  !!process.env.GEMINI_API_KEY
);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import taskRoutes from "./routes/taskRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/tasks", taskRoutes);
app.use("/ai", aiRoutes);
console.log("Mounting auth routes...", typeof authRoutes);
app.use("/auth", authRoutes);


// Connect DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    if (process.env.NODE_ENV !== "production") {
      app.listen(process.env.PORT || 5001, () =>
        console.log(`Server running on port ${process.env.PORT || 5001}`)
      );
    }
  })
  .catch((err) => console.log(err));

export default app;
