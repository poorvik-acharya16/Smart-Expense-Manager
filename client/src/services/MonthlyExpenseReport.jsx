import React, { useMemo, useState } from "react";
import {
    FileText,
    Download,
    IndianRupee,
    Receipt,
    TrendingUp,
    PieChart,
} from "lucide-react";

const MonthlyExpenseReport = ({ expenses = [] }) => {
    const today = new Date();

    const [selectedMonth, setSelectedMonth] = useState(
        `${today.getFullYear()}-${String(
            today.getMonth() + 1
        ).padStart(2, "0")}`
    );

    // Filter expenses for selected month
    const monthlyExpenses = useMemo(() => {
        const [year, month] = selectedMonth
            .split("-")
            .map(Number);

        return expenses.filter((expense) => {
            const date = new Date(expense.date);

            return (
                date.getFullYear() === year &&
                date.getMonth() + 1 === month
            );
        });
    }, [expenses, selectedMonth]);

    // Total spending
    const totalSpent = useMemo(() => {
        return monthlyExpenses.reduce(
            (total, expense) =>
                total + Number(expense.amount || 0),
            0
        );
    }, [monthlyExpenses]);

    // Average expense
    const averageExpense =
        monthlyExpenses.length > 0
            ? totalSpent / monthlyExpenses.length
            : 0;

    // Category totals
    const categoryTotals = useMemo(() => {
        const totals = {};

        monthlyExpenses.forEach((expense) => {
            const category = expense.category || "Other";

            totals[category] =
                (totals[category] || 0) +
                Number(expense.amount || 0);
        });

        return Object.entries(totals).sort(
            (a, b) => b[1] - a[1]
        );
    }, [monthlyExpenses]);

    const highestCategory =
        categoryTotals.length > 0
            ? categoryTotals[0]
            : null;

    // Format money
    const formatMoney = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Format selected month
    const formattedMonth = new Date(
        `${selectedMonth}-01`
    ).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
    });

    // Print report
    const printReport = () => {
        window.print();
    };

    return (
        <section className="mt-8">

            {/* REPORT HEADER */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-emerald-400" />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold">
                                Monthly Expense Report
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                                View a detailed summary of your monthly spending
                            </p>
                        </div>

                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">

                        {/* MONTH SELECTOR */}
                        <input
                            type="month"
                            value={selectedMonth}
                            onChange={(e) =>
                                setSelectedMonth(e.target.value)
                            }
                            className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white outline-none focus:border-emerald-500"
                        />

                        {/* PRINT BUTTON */}
                        <button
                            onClick={printReport}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition"
                        >
                            <Download className="w-4 h-4" />
                            Export Report
                        </button>

                    </div>

                </div>

            </div>

            {/* REPORT CONTENT */}
            <div
                id="monthly-report"
                className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >

                {/* REPORT TITLE */}
                <div className="border-b border-slate-800 pb-5 mb-6">

                    <h2 className="text-2xl font-bold">
                        Expense Report
                    </h2>

                    <p className="text-slate-400 mt-1">
                        {formattedMonth}
                    </p>

                </div>

                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* TOTAL */}
                    <div className="rounded-xl bg-slate-950 border border-slate-800 p-5">

                        <div className="flex items-center justify-between">

                            <p className="text-sm text-slate-400">
                                Total Spent
                            </p>

                            <IndianRupee className="w-5 h-5 text-emerald-400" />

                        </div>

                        <h3 className="text-2xl font-bold mt-3">
                            {formatMoney(totalSpent)}
                        </h3>

                    </div>

                    {/* TRANSACTIONS */}
                    <div className="rounded-xl bg-slate-950 border border-slate-800 p-5">

                        <div className="flex items-center justify-between">

                            <p className="text-sm text-slate-400">
                                Transactions
                            </p>

                            <Receipt className="w-5 h-5 text-blue-400" />

                        </div>

                        <h3 className="text-2xl font-bold mt-3">
                            {monthlyExpenses.length}
                        </h3>

                    </div>

                    {/* AVERAGE */}
                    <div className="rounded-xl bg-slate-950 border border-slate-800 p-5">

                        <div className="flex items-center justify-between">

                            <p className="text-sm text-slate-400">
                                Average Expense
                            </p>

                            <TrendingUp className="w-5 h-5 text-purple-400" />

                        </div>

                        <h3 className="text-2xl font-bold mt-3">
                            {formatMoney(averageExpense)}
                        </h3>

                    </div>

                    {/* TOP CATEGORY */}
                    <div className="rounded-xl bg-slate-950 border border-slate-800 p-5">

                        <div className="flex items-center justify-between">

                            <p className="text-sm text-slate-400">
                                Top Category
                            </p>

                            <PieChart className="w-5 h-5 text-orange-400" />

                        </div>

                        <h3 className="text-xl font-bold mt-3">
                            {highestCategory
                                ? highestCategory[0]
                                : "No data"}
                        </h3>

                        {highestCategory && (
                            <p className="text-sm text-slate-500 mt-1">
                                {formatMoney(highestCategory[1])}
                            </p>
                        )}

                    </div>

                </div>

                {/* CATEGORY BREAKDOWN */}
                <div className="mt-8">

                    <h3 className="text-lg font-bold mb-5">
                        Category Breakdown
                    </h3>

                    {categoryTotals.length === 0 ? (

                        <div className="py-10 text-center text-slate-500">
                            No expenses recorded for {formattedMonth}.
                        </div>

                    ) : (

                        <div className="space-y-5">

                            {categoryTotals.map(
                                ([category, amount]) => {

                                    const percentage =
                                        totalSpent > 0
                                            ? Math.round(
                                                (amount / totalSpent) * 100
                                            )
                                            : 0;

                                    return (
                                        <div key={category}>

                                            <div className="flex items-center justify-between mb-2">

                                                <span className="text-sm font-medium">
                                                    {category}
                                                </span>

                                                <div className="text-right">
                                                    <span className="text-sm font-semibold">
                                                        {formatMoney(amount)}
                                                    </span>

                                                    <span className="text-xs text-slate-500 ml-2">
                                                        {percentage}%
                                                    </span>
                                                </div>

                                            </div>

                                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">

                                                <div
                                                    className="h-full bg-emerald-400 rounded-full"
                                                    style={{
                                                        width: `${percentage}%`,
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

                {/* TRANSACTION LIST */}
                {monthlyExpenses.length > 0 && (
                    <div className="mt-8">

                        <h3 className="text-lg font-bold mb-5">
                            Transactions
                        </h3>

                        <div className="rounded-xl border border-slate-800 overflow-hidden">

                            {monthlyExpenses.map((expense) => (

                                <div
                                    key={expense._id}
                                    className="p-4 flex items-center justify-between border-b border-slate-800 last:border-b-0"
                                >

                                    <div>
                                        <p className="font-medium">
                                            {expense.description ||
                                                expense.category}
                                        </p>

                                        <p className="text-xs text-slate-500 mt-1">
                                            {expense.category} •{" "}
                                            {new Date(
                                                expense.date
                                            ).toLocaleDateString("en-IN")}
                                        </p>
                                    </div>

                                    <span className="font-bold text-emerald-400">
                                        {formatMoney(expense.amount)}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>
                )}

                {/* REPORT FOOTER */}
                <div className="mt-8 pt-5 border-t border-slate-800 text-center">

                    <p className="text-xs text-slate-600">
                        Smart Expense Manager • Monthly Expense Report
                    </p>

                </div>

            </div>

            {/* PRINT STYLES */}
            <style>
                {`
          @media print {

            body {
              background: white !important;
            }

            body * {
              visibility: hidden;
            }

            #monthly-report,
            #monthly-report * {
              visibility: visible;
            }

            #monthly-report {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              background: white !important;
              color: black !important;
              border: none !important;
            }

            #monthly-report .text-slate-400,
            #monthly-report .text-slate-500,
            #monthly-report .text-slate-600 {
              color: #555 !important;
            }

            #monthly-report .bg-slate-950,
            #monthly-report .bg-slate-900 {
              background: white !important;
            }

            #monthly-report .border-slate-800 {
              border-color: #ddd !important;
            }

            #monthly-report .text-white {
              color: black !important;
            }

            button,
            input {
              display: none !important;
            }
          }
        `}
            </style>

        </section>
    );
};

export default MonthlyExpenseReport;

