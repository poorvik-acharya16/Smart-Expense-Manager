import express from "express";
import jwt from "jsonwebtoken";
import Expense from "../models/Expense.js";

const router = express.Router();

// Middleware to verify JWT
const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not authorized",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

// ADD EXPENSE
router.post("/", protect, async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;

        if (!amount || !category) {
            return res.status(400).json({
                message: "Amount and category are required",
            });
        }

        const expense = await Expense.create({
            user: req.userId,
            amount,
            category,
            description,
            date,
        });

        res.status(201).json({
            message: "Expense added successfully",
            expense,
        });
    } catch (error) {
        console.error("Add expense error:", error);

        res.status(500).json({
            message: "Server error while adding expense",
        });
    }
});

// GET USER EXPENSES
router.get("/", protect, async (req, res) => {
    try {
        const expenses = await Expense.find({
            user: req.userId,
        }).sort({ date: -1 });

        res.json(expenses);
    } catch (error) {
        console.error("Get expenses error:", error);

        res.status(500).json({
            message: "Server error while fetching expenses",
        });
    }
});

export default router;