import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const SpendingTrend = () => {
    const [data, setData] = useState([]);
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

    const formatMonth = (date) => {
        return date.toLocaleDateString("en-IN", {
            month: "short",
        });
    };

    const fetchSpendingTrend = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setData([]);
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
                : result.expenses || [];

            // Create the last 6 calendar months
            const months = [];

            const today = new Date();

            for (let i = 5; i >= 0; i--) {
                const monthDate = new Date(
                    today.getFullYear(),
                    today.getMonth() - i,
                    1
                );

                months.push({
                    year: monthDate.getFullYear(),
                    month: monthDate.getMonth(),
                    label: formatMonth(monthDate),
                    spending: 0,
                });
            }

            // Add expenses to the correct month
            expenses.forEach((expense) => {
                const expenseDateValue = getExpenseDate(expense);

                if (!expenseDateValue) {
                    return;
                }

                const expenseDate = new Date(expenseDateValue);

                if (Number.isNaN(expenseDate.getTime())) {
                    return;
                }

                const expenseYear = expenseDate.getFullYear();
                const expenseMonth = expenseDate.getMonth();

                const matchingMonth = months.find(
                    (item) =>
                        item.year === expenseYear &&
                        item.month === expenseMonth
                );

                if (matchingMonth) {
                    matchingMonth.spending += getAmount(expense);
                }
            });

            setData(months);
        } catch (error) {
            console.error(
                "Error loading 6-month spending trend:",
                error
            );

            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSpendingTrend();

        // Refresh when expenses are added/updated
        const interval = setInterval(() => {
            fetchSpendingTrend();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const formatCurrency = (value) => {
        return `₹${Number(value || 0).toLocaleString("en-IN")}`;
    };

    return (
        <div className="rounded-2xl border border-white/5 bg-[#0D2420] p-5 sm:p-6">

            {/* HEADER */}
            <div className="mb-6">
                <p className="text-sm font-medium text-emerald-400">
                    Spending Analysis
                </p>

                <h2 className="mt-1 text-xl font-bold text-white">
                    6-Month Spending Trend
                </h2>

                <p className="mt-1 text-sm text-[#8FA8A2]">
                    Track how your spending has changed over the last six months.
                </p>
            </div>

            {/* LOADING */}
            {loading ? (
                <div className="flex h-[300px] items-center justify-center">
                    <p className="text-sm text-[#8FA8A2]">
                        Loading spending data...
                    </p>
                </div>
            ) : (
                <div className="h-[300px] w-full">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <LineChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 5,
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(255,255,255,0.06)"
                            />

                            <XAxis
                                dataKey="label"
                                tick={{
                                    fill: "#8FA8A2",
                                    fontSize: 12,
                                }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                tick={{
                                    fill: "#8FA8A2",
                                    fontSize: 12,
                                }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value) =>
                                    `₹${Number(value).toLocaleString("en-IN")}`
                                }
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0A1C18",
                                    border: "1px solid rgba(16,185,129,0.2)",
                                    borderRadius: "12px",
                                    color: "#ECFDF5",
                                }}
                                labelStyle={{
                                    color: "#ECFDF5",
                                    marginBottom: "4px",
                                }}
                                formatter={(value) => [
                                    formatCurrency(value),
                                    "Spent",
                                ]}
                            />

                            <Line
                                type="monotone"
                                dataKey="spending"
                                name="Spending"
                                stroke="#10B981"
                                strokeWidth={3}
                                dot={{
                                    r: 5,
                                    fill: "#10B981",
                                    stroke: "#061311",
                                    strokeWidth: 2,
                                }}
                                activeDot={{
                                    r: 7,
                                }}
                            />

                        </LineChart>
                    </ResponsiveContainer>

                </div>
            )}

            {/* MONTHLY VALUES */}
            {!loading && (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

                    {data.map((month) => (
                        <div
                            key={`${month.year}-${month.month}`}
                            className="rounded-xl border border-white/5 bg-[#0A1C18] p-3"
                        >
                            <p className="text-xs text-[#8FA8A2]">
                                {month.label} {month.year}
                            </p>

                            <p className="mt-1 text-sm font-bold text-white">
                                {formatCurrency(month.spending)}
                            </p>
                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};

export default SpendingTrend;