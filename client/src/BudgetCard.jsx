import React, { useEffect, useState } from "react";
import { Wallet, Save, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const BudgetCard = ({ monthlySpent }) => {
    const [budget, setBudget] = useState("");
    const [savedBudget, setSavedBudget] = useState(0);

    // Load saved budget
    useEffect(() => {
        const storedBudget = localStorage.getItem("monthlyBudget");

        if (storedBudget) {
            setSavedBudget(Number(storedBudget));
            setBudget(storedBudget);
        }
    }, []);

    // Save budget
    const saveBudget = () => {
        const amount = Number(budget);

        if (!amount || amount <= 0) {
            alert("Please enter a valid monthly budget.");
            return;
        }

        localStorage.setItem("monthlyBudget", amount);
        setSavedBudget(amount);
    };

    const spent = Number(monthlySpent || 0);

    // Calculate percentage
    const percentage =
        savedBudget > 0
            ? Math.round((spent / savedBudget) * 100)
            : 0;

    // Progress bar cannot exceed 100%
    const progressWidth = Math.min(percentage, 100);

    // Remaining budget
    const remaining = Math.max(savedBudget - spent, 0);

    // Budget status
    let status = "normal";

    if (percentage >= 100) {
        status = "exceeded";
    } else if (percentage >= 80) {
        status = "warning";
    }

    return (
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-6">

                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-emerald-400" />
                </div>

                <div>
                    <h2 className="text-xl font-bold">
                        Monthly Budget
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Set your monthly spending limit
                    </p>
                </div>

            </div>

            {/* SET BUDGET */}
            <div className="flex flex-col sm:flex-row gap-3">

                <input
                    type="number"
                    min="0"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Enter monthly budget"
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white outline-none focus:border-emerald-500"
                />

                <button
                    onClick={saveBudget}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition"
                >
                    <Save className="w-4 h-4" />
                    Save Budget
                </button>

            </div>

            {/* BUDGET SUMMARY */}
            {savedBudget > 0 && (
                <div className="mt-6">

                    {/* AMOUNTS */}
                    <div className="flex justify-between text-sm mb-2">

                        <span className="text-slate-400">
                            ₹{spent.toLocaleString("en-IN")} spent
                        </span>

                        <span className="font-bold">
                            ₹{savedBudget.toLocaleString("en-IN")} budget
                        </span>

                    </div>

                    {/* PROGRESS BAR */}
                    <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">

                        <div
                            className={`h-full rounded-full transition-all duration-500 ${status === "exceeded"
                                    ? "bg-red-500"
                                    : status === "warning"
                                        ? "bg-orange-400"
                                        : "bg-emerald-400"
                                }`}
                            style={{
                                width: `${progressWidth}%`,
                            }}
                        />

                    </div>

                    {/* PERCENTAGE */}
                    <div className="flex justify-between mt-2">

                        <span className="text-sm text-slate-500">
                            Budget Used
                        </span>

                        <span
                            className={`text-sm font-bold ${status === "exceeded"
                                    ? "text-red-400"
                                    : status === "warning"
                                        ? "text-orange-400"
                                        : "text-emerald-400"
                                }`}
                        >
                            {percentage}%
                        </span>

                    </div>

                    {/* STATUS MESSAGE */}

                    {status === "normal" && (
                        <div className="mt-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 flex items-center gap-3">

                            <CheckCircle className="w-5 h-5 text-emerald-400" />

                            <div>
                                <p className="font-semibold text-emerald-400">
                                    Budget is under control
                                </p>

                                <p className="text-sm text-slate-400 mt-1">
                                    You are within your monthly spending limit.
                                </p>
                            </div>

                        </div>
                    )}

                    {status === "warning" && (
                        <div className="mt-4 p-4 rounded-xl border border-orange-500/20 bg-orange-500/10 flex items-center gap-3">

                            <AlertTriangle className="w-5 h-5 text-orange-400" />

                            <div>
                                <p className="font-semibold text-orange-400">
                                    You're close to your budget
                                </p>

                                <p className="text-sm text-slate-400 mt-1">
                                    You have ₹{remaining.toLocaleString("en-IN")} remaining.
                                </p>
                            </div>

                        </div>
                    )}

                    {status === "exceeded" && (
                        <div className="mt-4 p-4 rounded-xl border border-red-500/20 bg-red-500/10 flex items-center gap-3">

                            <XCircle className="w-5 h-5 text-red-400" />

                            <div>
                                <p className="font-semibold text-red-400">
                                    Budget exceeded
                                </p>

                                <p className="text-sm text-slate-400 mt-1">
                                    You have exceeded your monthly spending limit.
                                </p>
                            </div>

                        </div>
                    )}

                    {/* REMAINING */}
                    <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800">

                        <p className="text-sm text-slate-400">
                            Remaining Budget
                        </p>

                        <p className="text-xl font-bold mt-1">
                            ₹{remaining.toLocaleString("en-IN")}
                        </p>

                    </div>

                </div>
            )}

        </section>
    );
};

export default BudgetCard;
