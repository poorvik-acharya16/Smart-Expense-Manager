import React, { useEffect, useState } from "react";

import {
    Wallet,
    TrendingUp,
    CalendarDays,
    Receipt,
    ArrowRight,
} from "lucide-react";

import BudgetCard from "../BudgetCard.jsx";

const Dashboard = ({ navigate }) => {
    const [expenses, setExpenses] = useState([]);

    const getAmount = (expense) =>
        Number(
            expense.amount ??
            expense.cost ??
            expense.value ??
            0
        );

    const getDate = (expense) => {
        const value =
            expense.date ??
            expense.createdAt;

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

        return isNaN(date.getTime())
            ? null
            : date;
    };

    const loadExpenses = async () => {
        try {
            const token =
                localStorage.getItem("token");

            const response = await fetch(
                "/api/expenses",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result =
                await response.json();

            const expenseList =
                Array.isArray(result)
                    ? result
                    : result.expenses ||
                    result.data ||
                    [];

            setExpenses(expenseList);
        } catch (error) {
            console.error(
                "Dashboard expense error:",
                error
            );
        }
    };

    useEffect(() => {
        loadExpenses();

        const interval =
            setInterval(
                loadExpenses,
                5000
            );

        window.addEventListener(
            "expenseAdded",
            loadExpenses
        );

        return () => {
            clearInterval(interval);

            window.removeEventListener(
                "expenseAdded",
                loadExpenses
            );
        };
    }, []);

    const now = new Date();

    const todaySpending = expenses
        .filter((expense) => {
            const date = getDate(expense);

            if (!date) return false;

            return (
                date.getFullYear() ===
                now.getFullYear() &&
                date.getMonth() ===
                now.getMonth() &&
                date.getDate() ===
                now.getDate()
            );
        })
        .reduce(
            (total, expense) =>
                total + getAmount(expense),
            0
        );

    const monthSpending = expenses
        .filter((expense) => {
            const date = getDate(expense);

            if (!date) return false;

            return (
                date.getFullYear() ===
                now.getFullYear() &&
                date.getMonth() ===
                now.getMonth()
            );
        })
        .reduce(
            (total, expense) =>
                total + getAmount(expense),
            0
        );

    const totalSpending = expenses.reduce(
        (total, expense) =>
            total + getAmount(expense),
        0
    );

    const recentExpenses = [...expenses]
        .sort((a, b) => {
            const dateA =
                getDate(a)?.getTime() || 0;

            const dateB =
                getDate(b)?.getTime() || 0;

            return dateB - dateA;
        })
        .slice(0, 5);

    return (
        <div className="space-y-5">

            {/* HEADER */}
            <section className="rounded-2xl border border-emerald-500/10 bg-gradient-to-br from-[#0D2420] via-[#0A1C18] to-[#071815] p-5 shadow-xl shadow-black/20 sm:p-6">

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                            Overview
                        </p>

                        <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                            Welcome to SmartSpend
                        </h1>

                        <p className="mt-1 text-sm text-[#8FA8A2]">
                            Manage your expenses and stay in control
                            of your finances.
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            navigate("/add-expense")
                        }
                        className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-[#061311] transition hover:bg-emerald-400"
                    >
                        Add Expense
                        <ArrowRight className="h-4 w-4" />
                    </button>

                </div>

            </section>


            {/* SUMMARY CARDS */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                {/* TOTAL SPENDING */}
                <div className="rounded-2xl border border-white/5 bg-[#0D2420] p-5">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-xs text-[#8FA8A2]">
                                Total Spending
                            </p>

                            <p className="mt-2 text-2xl font-bold text-white">
                                ₹{totalSpending.toLocaleString("en-IN")}
                            </p>
                        </div>

                        <div className="rounded-xl bg-emerald-500/10 p-3">
                            <Wallet className="h-5 w-5 text-emerald-400" />
                        </div>

                    </div>

                </div>


                {/* THIS MONTH */}
                <div className="rounded-2xl border border-white/5 bg-[#0D2420] p-5">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-xs text-[#8FA8A2]">
                                This Month
                            </p>

                            <p className="mt-2 text-2xl font-bold text-white">
                                ₹{monthSpending.toLocaleString("en-IN")}
                            </p>
                        </div>

                        <div className="rounded-xl bg-blue-500/10 p-3">
                            <TrendingUp className="h-5 w-5 text-blue-400" />
                        </div>

                    </div>

                </div>


                {/* TODAY */}
                <div className="rounded-2xl border border-white/5 bg-[#0D2420] p-5">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-xs text-[#8FA8A2]">
                                Today's Spending
                            </p>

                            <p className="mt-2 text-2xl font-bold text-white">
                                ₹{todaySpending.toLocaleString("en-IN")}
                            </p>
                        </div>

                        <div className="rounded-xl bg-teal-500/10 p-3">
                            <CalendarDays className="h-5 w-5 text-teal-400" />
                        </div>

                    </div>

                </div>

            </section>


            {/* BUDGET */}
            <BudgetCard />


            {/* RECENT EXPENSES */}
            <section className="rounded-2xl border border-white/5 bg-[#0D2420] p-5">

                <div className="mb-4 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="rounded-lg bg-emerald-500/10 p-2">
                            <Receipt className="h-5 w-5 text-emerald-400" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-white">
                                Recent Expenses
                            </h2>

                            <p className="text-xs text-[#8FA8A2]">
                                Your latest transactions
                            </p>
                        </div>

                    </div>

                    <button
                        onClick={() =>
                            navigate("/expenses")
                        }
                        className="flex items-center gap-1 text-xs font-semibold text-emerald-400 transition hover:text-emerald-300"
                    >
                        View All
                        <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                </div>


                {recentExpenses.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-white/10 py-10 text-center">

                        <Receipt className="mx-auto h-8 w-8 text-[#526A63]" />

                        <p className="mt-3 text-sm text-[#8FA8A2]">
                            No expenses yet
                        </p>

                        <button
                            onClick={() =>
                                navigate("/add-expense")
                            }
                            className="mt-3 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                        >
                            Add your first expense
                        </button>

                    </div>

                ) : (

                    <div className="space-y-2">

                        {recentExpenses.map(
                            (expense, index) => {

                                const date =
                                    getDate(
                                        expense
                                    );

                                return (
                                    <div
                                        key={
                                            expense._id ||
                                            expense.id ||
                                            index
                                        }
                                        className="flex items-center justify-between rounded-xl border border-white/5 bg-[#091A17] px-4 py-3"
                                    >

                                        <div className="min-w-0">

                                            <p className="truncate text-sm font-medium text-white">
                                                {expense.description ||
                                                    expense.title ||
                                                    "Expense"}
                                            </p>

                                            <p className="mt-0.5 text-[11px] text-[#708780]">
                                                {expense.category ||
                                                    "Other"}

                                                {date
                                                    ? ` • ${date.toLocaleDateString(
                                                        "en-IN"
                                                    )}`
                                                    : ""}
                                            </p>

                                        </div>

                                        <p className="ml-4 shrink-0 text-sm font-semibold text-emerald-400">
                                            ₹
                                            {getAmount(
                                                expense
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </p>

                                    </div>
                                );
                            }
                        )}

                    </div>

                )}

            </section>

        </div>
    );
};

export default Dashboard;
