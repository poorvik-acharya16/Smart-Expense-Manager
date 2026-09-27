import React, { useEffect, useState } from "react";
import {
    IndianRupee,
    Receipt,
    TrendingUp,
    PieChart,
} from "lucide-react";

const MonthlyExpenseReport = () => {
    const [expenses, setExpenses] = useState([]);
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

    const parseLocalDate = (value) => {
        if (!value) return null;

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
                "Monthly Report API response:",
                result
            );

            if (Array.isArray(result)) {
                setExpenses(result);
            } else if (Array.isArray(result.expenses)) {
                setExpenses(result.expenses);
            } else if (Array.isArray(result.data)) {
                setExpenses(result.data);
            } else {
                setExpenses([]);
            }

        } catch (error) {
            console.error(
                "Monthly Report error:",
                error
            );

            setExpenses([]);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();

        const handleExpenseAdded = () => {
            fetchExpenses();
        };

        window.addEventListener(
            "expenseAdded",
            handleExpenseAdded
        );

        const interval = setInterval(() => {
            fetchExpenses();
        }, 5000);

        return () => {
            clearInterval(interval);

            window.removeEventListener(
                "expenseAdded",
                handleExpenseAdded
            );
        };
    }, []);

    const now = new Date();

    const monthlyExpenses = expenses.filter(
        (expense) => {
            const date = parseLocalDate(
                getExpenseDate(expense)
            );

            if (!date) return false;

            return (
                date.getMonth() === now.getMonth() &&
                date.getFullYear() === now.getFullYear()
            );
        }
    );

    const totalSpending =
        monthlyExpenses.reduce(
            (total, expense) =>
                total + getAmount(expense),
            0
        );

    const transactionCount =
        monthlyExpenses.length;

    const averageExpense =
        transactionCount > 0
            ? totalSpending / transactionCount
            : 0;

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

    const categoryData =
        Object.entries(categoryTotals)
            .sort((a, b) => b[1] - a[1]);

    const highestCategory =
        categoryData.length > 0
            ? categoryData[0]
            : null;

    const formatCurrency = (amount) => {
        return `₹${Number(
            amount || 0
        ).toLocaleString("en-IN", {
            maximumFractionDigits: 0,
        })}`;
    };

    const monthName = now.toLocaleDateString(
        "en-IN",
        {
            month: "long",
            year: "numeric",
        }
    );

    if (loading) {
        return (
            <div className="rounded-2xl border border-white/5 bg-[#0A1C18] p-6">
                <p className="text-sm text-[#8FA8A2]">
                    Loading monthly report...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-5">

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-xl border border-white/5 bg-[#0A1C18] p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                        <IndianRupee className="h-5 w-5 text-emerald-400" />
                    </div>

                    <p className="mt-4 text-xs text-[#8FA8A2]">
                        Total Spending
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-white">
                        {formatCurrency(totalSpending)}
                    </h3>

                    <p className="mt-2 text-xs text-[#8FA8A2]">
                        Total spent in {monthName}
                    </p>
                </div>


                <div className="rounded-xl border border-white/5 bg-[#0A1C18] p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                        <Receipt className="h-5 w-5 text-blue-400" />
                    </div>

                    <p className="mt-4 text-xs text-[#8FA8A2]">
                        Transactions
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-white">
                        {transactionCount}
                    </h3>

                    <p className="mt-2 text-xs text-[#8FA8A2]">
                        Expenses recorded this month
                    </p>
                </div>


                <div className="rounded-xl border border-white/5 bg-[#0A1C18] p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10">
                        <TrendingUp className="h-5 w-5 text-teal-400" />
                    </div>

                    <p className="mt-4 text-xs text-[#8FA8A2]">
                        Average Expense
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-white">
                        {formatCurrency(averageExpense)}
                    </h3>

                    <p className="mt-2 text-xs text-[#8FA8A2]">
                        Average per transaction
                    </p>
                </div>


                <div className="rounded-xl border border-white/5 bg-[#0A1C18] p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                        <PieChart className="h-5 w-5 text-purple-400" />
                    </div>

                    <p className="mt-4 text-xs text-[#8FA8A2]">
                        Top Category
                    </p>

                    <h3 className="mt-1 truncate text-2xl font-bold text-white">
                        {highestCategory
                            ? highestCategory[0]
                            : "No data"}
                    </h3>

                    <p className="mt-2 text-xs text-[#8FA8A2]">
                        {highestCategory
                            ? formatCurrency(
                                highestCategory[1]
                            )
                            : "No expenses this month"}
                    </p>
                </div>

            </div>


            {/* CATEGORY BREAKDOWN */}
            <div className="rounded-xl border border-white/5 bg-[#0A1C18] p-5">

                <div className="mb-5">
                    <h3 className="text-lg font-bold text-white">
                        Category Breakdown
                    </h3>

                    <p className="mt-1 text-xs text-[#8FA8A2]">
                        Your spending by category for {monthName}
                    </p>
                </div>


                {categoryData.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-white/10 bg-[#0D2420] py-10 text-center">

                        <Receipt className="mx-auto h-8 w-8 text-[#8FA8A2]" />

                        <p className="mt-3 text-sm font-medium text-white">
                            No expenses recorded this month
                        </p>

                        <p className="mt-1 text-xs text-[#8FA8A2]">
                            Add expenses to see your monthly report.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-4">

                        {categoryData.map(
                            ([category, amount]) => {

                                const percentage =
                                    totalSpending > 0
                                        ? (amount /
                                            totalSpending) *
                                        100
                                        : 0;

                                return (
                                    <div
                                        key={category}
                                        className="rounded-xl border border-white/5 bg-[#0D2420] p-4"
                                    >

                                        <div className="flex items-center justify-between gap-4">

                                            <div className="min-w-0">

                                                <p className="truncate text-sm font-semibold text-white">
                                                    {category}
                                                </p>

                                                <p className="mt-1 text-xs text-[#8FA8A2]">
                                                    {percentage.toFixed(1)}%
                                                    of monthly spending
                                                </p>

                                            </div>

                                            <p className="shrink-0 text-sm font-bold text-emerald-400">
                                                {formatCurrency(amount)}
                                            </p>

                                        </div>


                                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">

                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                                                style={{
                                                    width: `${Math.min(
                                                        percentage,
                                                        100
                                                    )}%`,
                                                }}
                                            />

                                        </div>

                                    </div>
                                );
                            }
                        )}

                    </div>

                )}

            </div>

        </div>
    );
};

export default MonthlyExpenseReport;
