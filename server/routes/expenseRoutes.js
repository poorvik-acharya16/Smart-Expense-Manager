import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

// ============================================
// GET ALL EXPENSES
// ============================================
router.get("/", async (req, res) => {
    try {
        console.log("GET /api/expenses");

        const expenses = await Expense.find()
            .sort({ createdAt: -1 });

        console.log("EXPENSES FOUND:", expenses.length);
        console.log("EXPENSE DATA:", expenses);

        res.status(200).json(expenses);
    } catch (error) {
        console.error("GET EXPENSE ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch expenses",
            error: error.message,
        });
    }
});

// ============================================
// ADD EXPENSE
// ============================================
router.post("/", async (req, res) => {
    console.log("================================");
    console.log("POST /api/expenses");
    console.log("REQUEST BODY:", req.body);
    console.log("================================");

    try {
        const {
            user,
            description,
            amount,
            category,
            date,
        } = req.body;

        console.log("USER RECEIVED:", user);

        if (!user) {
            return res.status(400).json({
                message: "User ID is missing",
            });
        }

        const expense = new Expense({
            user,
            description: description.trim(),
            amount: Number(amount),
            category,
            date: date || new Date(),
        });

        console.log(
            "EXPENSE DATA BEFORE SAVE:",
            expense
        );

        const savedExpense = await expense.save();

        console.log(
            "EXPENSE SAVED:",
            savedExpense
        );

        res.status(201).json({
            message: "Expense added successfully",
            expense: savedExpense,
        });
    } catch (error) {
        console.error("ADD EXPENSE ERROR:", error);

        res.status(500).json({
            message: error.message,
            error: error.message,
        });
    }
});

// ============================================
// DELETE EXPENSE
// ============================================
router.delete("/:id", async (req, res) => {
    try {
        const deletedExpense =
            await Expense.findByIdAndDelete(
                req.params.id
            );

        if (!deletedExpense) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }

        res.status(200).json({
            message: "Expense deleted successfully",
            expense: deletedExpense,
        });
    } catch (error) {
        console.error(
            "DELETE EXPENSE ERROR:",
            error
        );

        res.status(500).json({
            message: error.message,
        });
    }
});

export default router;
