import React, { useMemo } from "react";
import {
    Lightbulb,
    TrendingUp,
    Wallet,
    Utensils,
    Receipt,
} from "lucide-react";

const SpendingInsights = ({
    expenses = [],
    monthlySpent = 0,
    lastMonthSpent = 0,
}) => {
    // Get current month expenses
    const monthlyExpenses = useMemo(() => {
        const now = new Date();

        return expenses.filter((expense) => {
            const date = new Date(expense.date);

            return (
                date.getMonth() === now.getMonth() &&
                date.getFullYear() === now.getFullYear()
            );
        });
    }, [expenses]);

    // Find highest spending category
    const topCategory = useMemo(() => {
        const totals = {};

        monthlyExpenses.forEach((expense) => {
            const category = expense.category || "Other";

            totals[category] =
                (totals[category] || 0) +
                Number(expense.amount || 0);
        });

        const sorted = Object.entries(totals).sort(
            (a, b) => b[1] - a[1]
        );

        return sorted.length > 0 ? sorted[0] : null;
    }, [monthlyExpenses]);

    // Budget
    const budget = Number(
        localStorage.getItem("monthlyBudget") || 0
    );

    const budgetPercentage =
        budget > 0
            ? Math.round((monthlySpent / budget) * 100)
            : 0;

    // Month comparison
    const spendingChange =
        lastMonthSpent > 0
            ? Math.round(
                ((monthlySpent - lastMonthSpent) /
                    lastMonthSpent) *
                100
            )
            : 0;

    const formatMoney = (amount) => {
        return `₹${Number(amount).toLocaleString("en-IN", {
            maximumFractionDigits: 0,
        })}`;
    };

    return (
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-6">

                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-yellow-400" />
                </div>

                <div>
                    <h2 className="text-xl font-bold">
                        SMART SPENDING INSIGHTS
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Personalized insights based on your spending
                    </p>
                </div>

            </div>

            {/* INSIGHTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* TOP CATEGORY */}
                {topCategory && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">

                        <div className="flex items-center gap-3">

                            <Utensils className="w-5 h-5 text-orange-400" />

                            <div>
                                <p className="font-semibold">
                                    Highest Spending Category
                                </p>

                                <p className="text-sm text-slate-400 mt-1">
                                    {topCategory[0]} is your highest spending
                                    category with {formatMoney(topCategory[1])}.
                                </p>
                            </div>

                        </div>

                    </div>
                )}

                {/* BUDGET */}
                {budget > 0 && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">

                        <div className="flex items-center gap-3">

                            <Wallet className="w-5 h-5 text-emerald-400" />

                            <div>
                                <p className="font-semibold">
                                    Budget Usage
                                </p>

                                <p className="text-sm text-slate-400 mt-1">

                                    {budgetPercentage >= 100
                                        ? "You have exceeded your monthly budget."
                                        : `You have used ${budgetPercentage}% of your monthly budget.`}

                                </p>
                            </div>

                        </div>

                    </div>
                )}

                {/* MONTH COMPARISON */}
                {lastMonthSpent > 0 && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">

                        <div className="flex items-center gap-3">

                            <TrendingUp className="w-5 h-5 text-blue-400" />

                            <div>
                                <p className="font-semibold">
                                    Monthly Spending Trend
                                </p>

                                <p className="text-sm text-slate-400 mt-1">

                                    {spendingChange > 0
                                        ? `Your spending increased by ${spendingChange}% compared with last month.`
                                        : spendingChange < 0
                                            ? `Your spending decreased by ${Math.abs(
                                                spendingChange
                                            )}% compared with last month.`
                                            : "Your spending is the same as last month."}

                                </p>

                            </div>

                        </div>

                    </div>
                )}

                {/* TRANSACTIONS */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">

                    <div className="flex items-center gap-3">

                        <Receipt className="w-5 h-5 text-purple-400" />

                        <div>

                            <p className="font-semibold">
                                Monthly Transactions
                            </p>

                            <p className="text-sm text-slate-400 mt-1">
                                You have recorded{" "}
                                <span className="font-semibold text-white">
                                    {monthlyExpenses.length}
                                </span>{" "}
                                transactions this month.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default SpendingInsights;