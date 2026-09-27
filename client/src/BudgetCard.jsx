import React, { useEffect, useState } from "react";
import {
    Settings,
    Wallet,
    AlertTriangle,
    CheckCircle,
    IndianRupee,
    TrendingUp,
} from "lucide-react";

const BudgetCard = () => {
    const [budget, setBudget] = useState(() => {
        const savedBudget = localStorage.getItem("monthlyBudget");
        return savedBudget ? Number(savedBudget) : 10000;
    });

    const [isEditing, setIsEditing] = useState(false);
    const [budgetInput, setBudgetInput] = useState(budget);
    const [currentMonthSpending, setCurrentMonthSpending] =
        useState(0);
    const [loading, setLoading] = useState(true);

    const getAmount = (expense) => {
        return Number(
            expense.amount ??
            expense.cost ??
            expense.value ??
            0
        );
    };

    const getExpenseDate = (expense) => {
        return expense.date || expense.createdAt;
    };

    const formatCurrency = (amount) => {
        return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
    };

    const parseExpenseDate = (value) => {
        if (!value) return null;

        // Handle YYYY-MM-DD correctly using local time
        if (
            typeof value === "string" &&
            /^\d{4}-\d{2}-\d{2}$/.test(value)
        ) {
            const [year, month, day] = value
                .split("-")
                .map(Number);

            return new Date(year, month - 1, day);
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return null;
        }

        return date;
    };

    const fetchMonthlySpending = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setCurrentMonthSpending(0);
                return;
            }

            const response = await fetch("/api/expenses", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch expenses: ${response.status}`
                );
            }

            const result = await response.json();

            const expenses = Array.isArray(result)
                ? result
                : Array.isArray(result.expenses)
                    ? result.expenses
                    : [];

            const today = new Date();

            const month = today.getMonth();
            const year = today.getFullYear();

            const monthlyTotal = expenses.reduce(
                (total, expense) => {
                    const expenseDate = parseExpenseDate(
                        getExpenseDate(expense)
                    );

                    if (!expenseDate) {
                        return total;
                    }

                    const isCurrentMonth =
                        expenseDate.getMonth() === month &&
                        expenseDate.getFullYear() === year;

                    if (isCurrentMonth) {
                        return total + getAmount(expense);
                    }

                    return total;
                },
                0
            );

            setCurrentMonthSpending(monthlyTotal);
        } catch (error) {
            console.error(
                "Error loading budget spending:",
                error
            );

            setCurrentMonthSpending(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMonthlySpending();

        const interval = setInterval(() => {
            fetchMonthlySpending();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const saveBudget = () => {
        const newBudget = Number(budgetInput);

        if (!newBudget || newBudget <= 0) {
            return;
        }

        setBudget(newBudget);

        localStorage.setItem(
            "monthlyBudget",
            newBudget.toString()
        );

        setIsEditing(false);
    };

    const percentage =
        budget > 0
            ? (currentMonthSpending / budget) * 100
            : 0;

    const displayPercentage = Math.min(
        percentage,
        100
    );

    const isExceeded =
        currentMonthSpending > budget;

    const isExactlyBudget =
        currentMonthSpending === budget &&
        budget > 0;

    const isWarning =
        currentMonthSpending >= budget * 0.8 &&
        currentMonthSpending < budget;

    const remainingAmount = Math.max(
        budget - currentMonthSpending,
        0
    );

    const exceededAmount = Math.max(
        currentMonthSpending - budget,
        0
    );

    const monthName = new Date().toLocaleDateString(
        "en-IN",
        {
            month: "long",
            year: "numeric",
        }
    );

    return (
        <div className="rounded-2xl border border-white/5 bg-[#0D2420] p-5 sm:p-6">

            {/* Header */}
            <div className="flex items-start justify-between">

                <div>
                    <p className="text-sm font-medium text-emerald-400">
                        Monthly Budget
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-white">
                        Budget Overview
                    </h2>

                    <p className="mt-1 text-sm text-[#8FA8A2]">
                        {monthName}
                    </p>
                </div>

                <button
                    onClick={() => {
                        setBudgetInput(budget);
                        setIsEditing(!isEditing);
                    }}
                    className="rounded-xl border border-white/10 bg-[#0A1C18] p-2.5 text-[#8FA8A2] transition hover:border-emerald-500/30 hover:text-emerald-400"
                    title="Edit budget"
                >
                    <Settings className="h-4 w-4" />
                </button>

            </div>


            {/* Edit Budget */}
            {isEditing && (
                <div className="mt-5 rounded-xl border border-emerald-500/10 bg-[#0A1C18] p-4">

                    <p className="mb-2 text-sm font-medium text-white">
                        Set Monthly Budget
                    </p>

                    <div className="flex gap-2">

                        <div className="relative flex-1">

                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8FA8A2]">
                                ₹
                            </span>

                            <input
                                type="number"
                                min="1"
                                value={budgetInput}
                                onChange={(e) =>
                                    setBudgetInput(e.target.value)
                                }
                                className="w-full rounded-xl border border-white/10 bg-[#061311] py-2.5 pl-8 pr-3 text-sm text-white outline-none focus:border-emerald-500/40"
                            />

                        </div>

                        <button
                            onClick={saveBudget}
                            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-[#061311] transition hover:bg-emerald-400"
                        >
                            Save
                        </button>

                    </div>

                </div>
            )}


            {/* Budget Amount */}
            <div className="mt-6 grid grid-cols-2 gap-4">

                <div className="rounded-xl border border-white/5 bg-[#0A1C18] p-4">

                    <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-emerald-400" />

                        <p className="text-xs text-[#8FA8A2]">
                            Monthly Budget
                        </p>
                    </div>

                    <p className="mt-2 text-xl font-bold text-white">
                        {formatCurrency(budget)}
                    </p>

                </div>


                <div className="rounded-xl border border-white/5 bg-[#0A1C18] p-4">

                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-teal-400" />

                        <p className="text-xs text-[#8FA8A2]">
                            Spent
                        </p>
                    </div>

                    <p
                        className={`mt-2 text-xl font-bold ${isExceeded
                                ? "text-red-400"
                                : isWarning
                                    ? "text-yellow-400"
                                    : "text-white"
                            }`}
                    >
                        {loading
                            ? "..."
                            : formatCurrency(
                                currentMonthSpending
                            )}
                    </p>

                </div>

            </div>


            {/* Progress */}
            <div className="mt-6">

                <div className="mb-2 flex items-center justify-between">

                    <p className="text-sm text-[#8FA8A2]">
                        Budget Used
                    </p>

                    <p
                        className={`text-sm font-bold ${isExceeded
                                ? "text-red-400"
                                : isWarning
                                    ? "text-yellow-400"
                                    : "text-emerald-400"
                            }`}
                    >
                        {percentage.toFixed(1)}%
                    </p>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white/5">

                    <div
                        className={`h-full rounded-full transition-all duration-700 ${isExceeded
                                ? "bg-red-500"
                                : isWarning
                                    ? "bg-yellow-400"
                                    : "bg-emerald-500"
                            }`}
                        style={{
                            width: `${displayPercentage}%`,
                        }}
                    />

                </div>

            </div>


            {/* Status */}
            {isExceeded ? (
                <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4">

                    <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                        </div>

                        <div className="flex-1">

                            <p className="font-semibold text-red-400">
                                Budget Exceeded
                            </p>

                            <p className="mt-1 text-sm text-[#D8E7E3]">
                                You have exceeded your monthly budget by{" "}
                                <span className="font-bold text-red-400">
                                    {formatCurrency(exceededAmount)}
                                </span>
                                .
                            </p>

                            <div className="mt-3 flex items-center gap-2">

                                <IndianRupee className="h-4 w-4 text-red-400" />

                                <span className="text-sm font-bold text-red-400">
                                    {formatCurrency(exceededAmount)} over budget
                                </span>

                            </div>

                        </div>

                    </div>

                </div>
            ) : isExactlyBudget ? (
                <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4">

                    <div className="flex items-center gap-3">

                        <AlertTriangle className="h-5 w-5 text-red-400" />

                        <div>
                            <p className="font-semibold text-red-400">
                                Budget Reached
                            </p>

                            <p className="mt-1 text-sm text-[#D8E7E3]">
                                You have used your entire monthly budget.
                            </p>
                        </div>

                    </div>

                </div>
            ) : isWarning ? (
                <div className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">

                    <div className="flex items-center gap-3">

                        <AlertTriangle className="h-5 w-5 text-yellow-400" />

                        <div>
                            <p className="font-semibold text-yellow-400">
                                Budget Warning
                            </p>

                            <p className="mt-1 text-sm text-[#D8E7E3]">
                                You are approaching your monthly budget.
                            </p>
                        </div>

                    </div>

                </div>
            ) : (
                <div className="mt-5 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">

                    <div className="flex items-center gap-3">

                        <CheckCircle className="h-5 w-5 text-emerald-400" />

                        <div>
                            <p className="font-semibold text-emerald-400">
                                Budget On Track
                            </p>

                            <p className="mt-1 text-sm text-[#8FA8A2]">
                                You have{" "}
                                <span className="font-semibold text-white">
                                    {formatCurrency(remainingAmount)}
                                </span>{" "}
                                remaining this month.
                            </p>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default BudgetCard;