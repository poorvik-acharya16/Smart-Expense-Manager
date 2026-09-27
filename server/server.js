
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import expenseRoutes from "./routes/expenseRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ============================================
// CORS
// ============================================

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ],
    credentials: true,
  })
);

// ============================================
// MIDDLEWARE
// ============================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ============================================
// HOME ROUTE
// ============================================

app.get("/", (req, res) => {
  res.status(200).json({
    message:
      "Smart Expense Manager API is running",
  });
});

// ============================================
// HEALTH CHECK
// ============================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message:
      "Smart Expense Manager API is healthy",
    mongodb:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

// ============================================
// AUTH ROUTES
// ============================================

app.use("/api/auth", authRoutes);

// ============================================
// EXPENSE ROUTES
// ============================================

app.use("/api/expenses", expenseRoutes);

// ============================================
// MONGODB CONNECTION
// ============================================

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "[MongoDB] ERROR: MONGODB_URI is missing from .env"
  );
} else {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log(
        "================================"
      );

      console.log(
        "[MongoDB] Connected successfully to MongoDB Atlas!"
      );

      console.log(
        "[MongoDB] Database Name:",
        mongoose.connection.name
      );

      console.log(
        "[MongoDB] Host:",
        mongoose.connection.host
      );

      console.log(
        "================================"
      );
    })
    .catch((error) => {
      console.error(
        "================================"
      );

      console.error(
        "[MongoDB] Connection Error:",
        error.message
      );

      console.error(
        "================================"
      );
    });
}

// ============================================
// SERVER
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `[Server] Smart Expense Manager API running in development mode on port ${PORT}`
  );

  console.log(
    `[Server] Health Check: http://localhost:${PORT}/api/health`
  );
});