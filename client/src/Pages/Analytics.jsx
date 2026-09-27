import React from "react";

import {
    BarChart3,
    TrendingUp,
    Activity,
    Lightbulb,
    FileText,
} from "lucide-react";

import SpendingTrend from "../SpendingTrend.jsx";
import WeeklySpending from "../WeeklySpending.jsx";
import SpendingInsights from "../SpendingInsights.jsx";
import MonthlyExpenseReport from "../MonthlyExpenseReport.jsx";

const Analytics = () => {
    return (
        <div className="space-y-4">

            {/* ANALYTICS HEADER */}
            <section className="rounded-2xl border border-emerald-500/10 bg-gradient-to-br from-[#0D2420] via-[#0A1C18] to-[#071815] p-5">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                        <BarChart3 className="h-5 w-5 text-emerald-400" />
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                            Financial Analytics
                        </p>

                        <h1 className="text-xl font-bold text-white">
                            UNDERSTAND YOUR SPENDING
                        </h1>

                        <p className="text-xs text-[#8FA8A2]">
                            Analyze your spending patterns, weekly activity,
                            financial trends, and monthly expenses.
                        </p>
                    </div>

                </div>

            </section>


            {/* SPENDING ANALYSIS */}
            <section>

                <div className="mb-2 flex items-center gap-2">

                    <BarChart3 className="h-4 w-4 text-emerald-400" />

                    <h2 className="text-sm font-semibold text-white">
                        Spending Analysis
                    </h2>

                </div>


                {/* SIDE BY SIDE */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">


                    {/* 6-MONTH SPENDING TREND */}
                    <div className="rounded-xl border border-white/5 bg-[#0D2420] p-4">

                        <div className="mb-2 flex items-center gap-2.5">

                            <div className="rounded-lg bg-emerald-500/10 p-1.5">
                                <TrendingUp className="h-4 w-4 text-emerald-400" />
                            </div>

                            <div>

                                <h3 className="text-sm font-semibold text-white">
                                    6-MONTH SPENDING TREND
                                </h3>

                                <p className="text-[10px] text-[#8FA8A2]">
                                    Track your spending over the last 6 months
                                </p>

                            </div>

                        </div>


                        {/* FULL VISIBLE GRAPH */}
                        <div className="w-full">
                            <SpendingTrend />
                        </div>

                    </div>


                    {/* WEEKLY SPENDING */}
                    <div className="rounded-xl border border-white/5 bg-[#0D2420] p-4">

                        <div className="mb-2 flex items-center gap-2.5">

                            <div className="rounded-lg bg-blue-500/10 p-1.5">
                                <Activity className="h-4 w-4 text-blue-400" />
                            </div>

                            <div>

                                <h3 className="text-sm font-semibold text-white">
                                    WEEKLY SPENDING
                                </h3>

                                <p className="text-[10px] text-[#8FA8A2]">
                                    Your spending from Monday to Sunday
                                </p>

                            </div>

                        </div>


                        {/* FULL VISIBLE GRAPH */}
                        <div className="w-full">
                            <WeeklySpending />
                        </div>

                    </div>

                </div>

            </section>


            {/* SMART SPENDING INSIGHTS */}
            <section className="rounded-xl border border-white/5 bg-[#0D2420] p-4">

                <div className="mb-3 flex items-center gap-2">

                    <div className="rounded-lg bg-yellow-500/10 p-1.5">
                        <Lightbulb className="h-4 w-4 text-yellow-400" />
                    </div>

                    <div>

                        <h2 className="text-sm font-semibold text-white">
                            SMART SPENDING INSIGHTS
                        </h2>

                        <p className="text-[10px] text-[#8FA8A2]">
                            Useful insights based on your expense patterns
                        </p>

                    </div>

                </div>

                <SpendingInsights />

            </section>


            {/* MONTHLY EXPENSE REPORT */}
            <section className="rounded-xl border border-white/5 bg-[#0D2420] p-4">

                <div className="mb-3 flex items-center gap-2">

                    <div className="rounded-lg bg-teal-500/10 p-1.5">
                        <FileText className="h-4 w-4 text-teal-400" />
                    </div>

                    <div>

                        <h2 className="text-sm font-semibold text-white">
                            MONTHLY EXPENSE REPORT
                        </h2>

                        <p className="text-[10px] text-[#8FA8A2]">
                            Summary of your expenses for the current month
                        </p>

                    </div>

                </div>

                <MonthlyExpenseReport />

            </section>

        </div>
    );
};

export default Analytics;