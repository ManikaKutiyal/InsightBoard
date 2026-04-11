// backend/server.js
import dotenv from "dotenv";
dotenv.config();
console.log(
  "Gemini key loaded:",
  !!process.env.GEMINI_API_KEY
);
console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import taskRoutes from "./routes/taskRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Adjust this in production for security
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());

// Attach io to app for access in routes
app.set("socketio", io);

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Health check
app.get("/", (req, res) => {
  res.send("InsightBoard API is running...");
});

// Routes
app.use("/tasks", taskRoutes);
app.use("/ai", aiRoutes);
app.use("/auth", authRoutes);

// Socket.io Connection Logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join-project", (projectId) => {
    socket.join(projectId);
    console.log(`User ${socket.id} joined project: ${projectId}`);
  });

  // REAL-TIME CHAT EVENTS
  socket.on("send-chat-message", (data) => {
    console.log(`[FORGE] Message from ${data.user}: ${data.text}`);
    io.emit("receive-chat-message", data);
  });

  socket.on("typing", (user) => {
    // console.log(`[FORGE] ${user} is typing...`);
    socket.broadcast.emit("user-typing", user);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Connect DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    httpServer.listen(process.env.PORT || 5001, () =>
      console.log(`Server running on port ${process.env.PORT || 5001}`)
    );
  })
  .catch((err) => console.log(err));

export default app;

