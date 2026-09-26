import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const BudgetChart = ({ monthlySpent }) => {
    const savedBudget = Number(
        localStorage.getItem("monthlyBudget") || 0
    );

    const spent = Number(monthlySpent || 0);

    if (savedBudget <= 0) {
        return null;
    }

    const remaining = Math.max(savedBudget - spent, 0);

    const data = [
        {
            name: "Budget",
            amount: savedBudget,
        },
        {
            name: "Spent",
            amount: spent,
        },
        {
            name: "Remaining",
            amount: remaining,
        },
    ];

    return (
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

            {/* HEADER */}
            <div className="mb-6">
                <h2 className="text-xl font-bold">
                    Budget vs Actual Spending
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                    Compare your monthly budget with your actual spending
                </p>
            </div>

            {/* CHART */}
            <div className="w-full h-[300px]">

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 5,
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#334155"
                        />

                        <XAxis
                            dataKey="name"
                            stroke="#94a3b8"
                        />

                        <YAxis
                            stroke="#94a3b8"
                        />

                        <Tooltip
                            formatter={(value) =>
                                `₹${Number(value).toLocaleString("en-IN")}`
                            }
                            contentStyle={{
                                backgroundColor: "#0f172a",
                                border: "1px solid #334155",
                                borderRadius: "10px",
                                color: "#fff",
                            }}
                        />

                        <Bar
                            dataKey="amount"
                            fill="#10b981"
                            barSize={45}
                            radius={[8, 8, 0, 0]}
                        />

                    </BarChart>
                </ResponsiveContainer>

            </div>

        </section>
    );
};

export default BudgetChart;

