import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import KanbanUser from "../models/KanbanUser.js";

const router = express.Router();
console.log("Auth routes loaded");

// SIGNUP
router.post("/signup", async (req, res) => {
  console.log("Signup attempt:", req.body);
  try {
    const { name, email, password } = req.body;

    const exists = await KanbanUser.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await KanbanUser.create({
      name,
      email,
      password: hash,
    });

    res.json({ message: "Signup successful" });

  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await KanbanUser.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// LOCATION PROXY
router.get("/location", async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: "Missing lat/lon" });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      {
        headers: {
          "User-Agent": "InsightBoard/1.0",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Nominatim API returned ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Location proxy error:", err);
    // Return a dummy fallback to prevent 500
    res.json({
      address: {
        city: "Unknown",
        country: "World"
      }
    });
  }
});

export default router;
