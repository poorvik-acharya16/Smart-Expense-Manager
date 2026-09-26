import React, { useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const SpendingTrend = ({ expenses = [] }) => {
    const chartData = useMemo(() => {
        const today = new Date();

        const months = [];

        // Create data for the last 6 months
        for (let i = 5; i >= 0; i--) {
            const date = new Date(
                today.getFullYear(),
                today.getMonth() - i,
                1
            );

            const year = date.getFullYear();
            const month = date.getMonth();

            const monthName = date.toLocaleDateString("en-IN", {
                month: "short",
            });

            const amount = expenses
                .filter((expense) => {
                    const expenseDate = new Date(expense.date);

                    return (
                        expenseDate.getFullYear() === year &&
                        expenseDate.getMonth() === month
                    );
                })
                .reduce(
                    (total, expense) =>
                        total + Number(expense.amount || 0),
                    0
                );

            months.push({
                month: monthName,
                amount,
            });
        }

        return months;
    }, [expenses]);

    const formatMoney = (value) => {
        return `₹${Number(value).toLocaleString("en-IN")}`;
    };

    return (
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

            {/* HEADER */}
            <div className="mb-6">
                <h2 className="text-xl font-bold">
                    6-Month Spending Trend
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                    Track how your spending changes over the last six months
                </p>
            </div>

            {/* CHART */}
            <div className="w-full h-[320px]">

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
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
                            dataKey="month"
                            stroke="#94a3b8"
                        />

                        <YAxis
                            stroke="#94a3b8"
                            tickFormatter={formatMoney}
                        />

                        <Tooltip
                            formatter={(value) => [
                                formatMoney(value),
                                "Spending",
                            ]}
                            contentStyle={{
                                backgroundColor: "#0f172a",
                                border: "1px solid #334155",
                                borderRadius: "10px",
                                color: "#fff",
                            }}
                        />

                        <Bar
                            dataKey="amount"
                            name="Spending"
                            fill="#10b981"
                            barSize={28}
                            radius={[8, 8, 0, 0]}
                        />

                    </BarChart>
                </ResponsiveContainer>

            </div>

        </section>
    );
};

export default SpendingTrend;
