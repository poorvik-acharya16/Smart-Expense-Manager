import React, { useEffect, useState } from "react";
import {
    Lightbulb,
    Wallet,
    Receipt,
    TrendingUp,
    IndianRupee,
    AlertCircle,
} from "lucide-react";

const SpendingInsights = () => {
    const [expenses, setExpenses] = useState([]);
    const [budget, setBudget] = useState(0);
    const [loading, setLoading] = useState(true);

    // -----------------------------------------
    // GET AMOUNT
    // -----------------------------------------
    const getAmount = (expense) => {
        return Number(
            expense.amount ??
            expense.cost ??
            expense.value ??
            0
        );
    };

    // -----------------------------------------
    // GET DATE
    // -----------------------------------------
    const getExpenseDate = (expense) => {
        return expense.date || expense.createdAt;
    };

    // -----------------------------------------
    // PARSE DATE SAFELY
    // -----------------------------------------
    const parseLocalDate = (value) => {
        if (!value) return null;

        // Handles YYYY-MM-DD without timezone problems
        if (
            typeof value === "string" &&
            /^\d{4}-\d{2}-\d{2}$/.test(value)
        ) {
            const [year, month, day] =
                value.split("-").map(Number);

            return new Date(
                year,
                month - 1,
                day
            );
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return null;
        }

        return date;
    };

    // -----------------------------------------
    // FETCH EXPENSES
    // -----------------------------------------
    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setExpenses([]);
                setLoading(false);
                return;
            }

            const response = await fetch(
                "/api/expenses",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch expenses: ${response.status}`
                );
            }

            const result = await response.json();

            console.log(
                "Spending Insights API response:",
                result
            );

            let expenseList = [];

            if (Array.isArray(result)) {
                expenseList = result;
            } else if (Array.isArray(result.expenses)) {
                expenseList = result.expenses;
            } else if (Array.isArray(result.data)) {
                expenseList = result.data;
            }

            setExpenses(expenseList);

        } catch (error) {
            console.error(
                "Spending Insights error:",
                error
            );

            setExpenses([]);
        } finally {
            setLoading(false);
        }
    };

    // -----------------------------------------
    // LOAD BUDGET
    // -----------------------------------------
    const loadBudget = () => {
        const savedBudget = Number(
            localStorage.getItem("monthlyBudget") || 0
        );

        setBudget(
            Number.isFinite(savedBudget)
                ? savedBudget
                : 0
        );
    };

    // -----------------------------------------
    // INITIAL LOAD + REFRESH
    // -----------------------------------------
    useEffect(() => {
        fetchExpenses();
        loadBudget();

        const handleExpenseAdded = () => {
            fetchExpenses();
            loadBudget();
        };

        window.addEventListener(
            "expenseAdded",
            handleExpenseAdded
        );

        const interval = setInterval(() => {
            fetchExpenses();
            loadBudget();
        }, 5000);

        return () => {
            clearInterval(interval);

            window.removeEventListener(
                "expenseAdded",
                handleExpenseAdded
            );
        };
    }, []);

    // -----------------------------------------
    // CURRENT MONTH
    // -----------------------------------------
    const now = new Date();

    const monthlyExpenses = expenses.filter(
        (expense) => {
            const dateValue =
                getExpenseDate(expense);

            const expenseDate =
                parseLocalDate(dateValue);

            if (!expenseDate) {
                return false;
            }

            return (
                expenseDate.getMonth() ===
                now.getMonth() &&
                expenseDate.getFullYear() ===
                now.getFullYear()
            );
        }
    );

    // -----------------------------------------
    // MONTHLY SPENDING
    // -----------------------------------------
    const monthlySpent =
        monthlyExpenses.reduce(
            (total, expense) =>
                total + getAmount(expense),
            0
        );

    // -----------------------------------------
    // BUDGET USAGE
    // -----------------------------------------
    const budgetUsage =
        budget > 0
            ? (monthlySpent / budget) * 100
            : 0;

    const displayBudgetUsage = Math.round(
        budgetUsage
    );

    // -----------------------------------------
    // REMAINING BUDGET
    // -----------------------------------------
    const remainingBudget =
        Math.max(budget - monthlySpent, 0);

    // -----------------------------------------
    // AVERAGE TRANSACTION
    // -----------------------------------------
    const averageTransaction =
        monthlyExpenses.length > 0
            ? monthlySpent /
            monthlyExpenses.length
            : 0;

    // -----------------------------------------
    // CATEGORY ANALYSIS
    // -----------------------------------------
    const categoryTotals = {};

    monthlyExpenses.forEach((expense) => {
        const category =
            expense.category ||
            expense.type ||
            "Other";

        categoryTotals[category] =
            (categoryTotals[category] || 0) +
            getAmount(expense);
    });

    const highestCategory =
        Object.entries(categoryTotals).sort(
            (a, b) => b[1] - a[1]
        )[0];

    const highestSpendingCategory =
        highestCategory
            ? highestCategory[0]
            : "No data";

    const highestCategoryAmount =
        highestCategory
            ? highestCategory[1]
            : 0;

    // -----------------------------------------
    // FORMAT CURRENCY
    // -----------------------------------------
    const formatCurrency = (amount) => {
        return `₹${Number(
            amount || 0
        ).toLocaleString("en-IN", {
            maximumFractionDigits: 0,
        })}`;
    };

    // -----------------------------------------
    // LOADING
    // -----------------------------------------
    if (loading) {
        return (
            <div className="rounded-2xl border border-white/5 bg-[#0A1C18] p-6">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                        <Lightbulb className="h-5 w-5 text-emerald-400" />
                    </div>

                    <div>
                        <h3 className="font-semibold text-white">
                            Smart Spending Insights
                        </h3>

                        <p className="text-xs text-[#8FA8A2]">
                            Loading your spending insights...
                        </p>
                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="space-y-5">

            {/* HEADER */}
            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                    <Lightbulb className="h-5 w-5 text-emerald-400" />
                </div>

                <div>
                    <h3 className="font-semibold text-white">
                        Smart Spending Insights
                    </h3>

                    <p className="text-xs text-[#8FA8A2]">
                        Personalized insights based on your spending
                    </p>
                </div>

            </div>


            {/* INSIGHT CARDS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {/* BUDGET USAGE */}
                <div className="rounded-xl border border-white/5 bg-[#0A1C18] p-4">

                    <div className="flex items-center justify-between">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                            <Wallet className="h-4 w-4 text-emerald-400" />
                        </div>

                        {budgetUsage >= 80 && (
                            <AlertCircle className="h-4 w-4 text-yellow-400" />
                        )}

                    </div>

                    <p className="mt-4 text-xs text-[#8FA8A2]">
                        Budget Usage
                    </p>

                    <h4 className="mt-1 text-2xl font-bold text-white">
                        {budget > 0
                            ? `${displayBudgetUsage}%`
                            : "Not Set"}
                    </h4>

                    <p className="mt-2 text-xs text-[#8FA8A2]">
                        {budget > 0
                            ? `${formatCurrency(monthlySpent)} of ${formatCurrency(budget)} used`
                            : "Set a monthly budget to track usage"}
                    </p>

                </div>


                {/* MONTHLY TRANSACTIONS */}
                <div className="rounded-xl border border-white/5 bg-[#0A1C18] p-4">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                        <Receipt className="h-4 w-4 text-blue-400" />
                    </div>

                    <p className="mt-4 text-xs text-[#8FA8A2]">
                        Monthly Transactions
                    </p>

                    <h4 className="mt-1 text-2xl font-bold text-white">
                        {monthlyExpenses.length}
                    </h4>

                    <p className="mt-2 text-xs text-[#8FA8A2]">
                        Transactions recorded this month
                    </p>

                </div>


                {/* MONTHLY SPENDING */}
                <div className="rounded-xl border border-white/5 bg-[#0A1C18] p-4">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10">
                        <IndianRupee className="h-4 w-4 text-teal-400" />
                    </div>

                    <p className="mt-4 text-xs text-[#8FA8A2]">
                        Monthly Spending
                    </p>

                    <h4 className="mt-1 text-2xl font-bold text-white">
                        {formatCurrency(monthlySpent)}
                    </h4>

                    <p className="mt-2 text-xs text-[#8FA8A2]">
                        Total spent this month
                    </p>

                </div>


                {/* AVERAGE */}
                <div className="rounded-xl border border-white/5 bg-[#0A1C18] p-4">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
                        <TrendingUp className="h-4 w-4 text-purple-400" />
                    </div>

                    <p className="mt-4 text-xs text-[#8FA8A2]">
                        Average Transaction
                    </p>

                    <h4 className="mt-1 text-2xl font-bold text-white">
                        {formatCurrency(
                            averageTransaction
                        )}
                    </h4>

                    <p className="mt-2 text-xs text-[#8FA8A2]">
                        Average expense this month
                    </p>

                </div>

            </div>


            {/* DETAILED INSIGHT */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                {/* BUDGET STATUS */}
                <div className="rounded-xl border border-white/5 bg-[#0A1C18] p-5">

                    <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                            <Wallet className="h-5 w-5 text-emerald-400" />
                        </div>

                        <div className="min-w-0">

                            <h4 className="font-semibold text-white">
                                Budget Status
                            </h4>

                            {budget <= 0 ? (
                                <p className="mt-2 text-sm text-[#8FA8A2]">
                                    You have not set a monthly budget yet.
                                </p>
                            ) : monthlySpent > budget ? (
                                <p className="mt-2 text-sm text-red-400">
                                    You have exceeded your monthly budget by{" "}
                                    <span className="font-semibold">
                                        {formatCurrency(
                                            monthlySpent - budget
                                        )}
                                    </span>
                                    .
                                </p>
                            ) : (
                                <p className="mt-2 text-sm text-[#8FA8A2]">
                                    You have{" "}
                                    <span className="font-semibold text-emerald-400">
                                        {formatCurrency(
                                            remainingBudget
                                        )}
                                    </span>{" "}
                                    remaining from your monthly budget.
                                </p>
                            )}

                        </div>

                    </div>

                </div>


                {/* CATEGORY STATUS */}
                <div className="rounded-xl border border-white/5 bg-[#0A1C18] p-5">

                    <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500/10">
                            <TrendingUp className="h-5 w-5 text-teal-400" />
                        </div>

                        <div className="min-w-0">

                            <h4 className="font-semibold text-white">
                                Top Spending Category
                            </h4>

                            {monthlyExpenses.length === 0 ? (
                                <p className="mt-2 text-sm text-[#8FA8A2]">
                                    No expenses recorded this month yet.
                                </p>
                            ) : (
                                <p className="mt-2 text-sm text-[#8FA8A2]">
                                    Your highest spending category is{" "}
                                    <span className="font-semibold text-teal-400">
                                        {highestSpendingCategory}
                                    </span>{" "}
                                    with{" "}
                                    <span className="font-semibold text-white">
                                        {formatCurrency(
                                            highestCategoryAmount
                                        )}
                                    </span>
                                    .
                                </p>
                            )}

                        </div>

                    </div>

                </div>

            </div>


            {/* PROGRESS BAR */}
            {budget > 0 && (
                <div className="rounded-xl border border-white/5 bg-[#0A1C18] p-5">

                    <div className="mb-3 flex items-center justify-between">

                        <p className="text-sm font-medium text-white">
                            Monthly Budget Progress
                        </p>

                        <p className="text-sm font-semibold text-emerald-400">
                            {displayBudgetUsage}%
                        </p>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/5">

                        <div
                            className={`h-full rounded-full transition-all duration-500 ${budgetUsage >= 100
                                    ? "bg-red-500"
                                    : budgetUsage >= 80
                                        ? "bg-yellow-400"
                                        : "bg-emerald-500"
                                }`}
                            style={{
                                width: `${Math.min(
                                    budgetUsage,
                                    100
                                )}%`,
                            }}
                        />

                    </div>

                    <div className="mt-2 flex justify-between text-xs text-[#8FA8A2]">

                        <span>
                            Spent: {formatCurrency(monthlySpent)}
                        </span>

                        <span>
                            Budget: {formatCurrency(budget)}
                        </span>

                    </div>

                </div>
            )}

        </div>
    );
};

export default SpendingInsights;
