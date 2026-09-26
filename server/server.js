import expenseRoutes from "./routes/expenseRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import apiRoutes from "./routes/index.js";
import authRoutes from "./routes/authRoutes.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Core Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    project: "Smart Expense Manager API",
    status: "online",
    healthCheck: "/api/health",
  });
});

// API Routes
app.use("/api", apiRoutes);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(
    `[Server] Smart Expense Manager API running in ${process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );

  console.log(
    `[Server] Health Check available at: http://localhost:${PORT}/api/health`
  );
});

export default app;