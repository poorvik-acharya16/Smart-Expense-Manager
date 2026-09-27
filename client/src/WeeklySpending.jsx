import React, { useEffect, useState } from "react";
import {
    TrendingUp,
    CalendarDays,
    IndianRupee,
} from "lucide-react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const WeeklySpending = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    // ==========================================
    // GET AMOUNT FROM EXPENSE
    // ==========================================

    const getAmount = (expense) => {
        const amount =
            expense.amount ??
            expense.cost ??
            expense.value ??
            0;

        return Number(amount) || 0;
    };

    // ==========================================
    // GET DATE FROM EXPENSE
    // ==========================================

    const getExpenseDate = (expense) => {
        return (
            expense.date ||
            expense.expenseDate ||
            expense.createdAt
        );
    };

    // ==========================================
    // IMPORTANT:
    // PARSE YYYY-MM-DD AS LOCAL DATE
    // This prevents Friday becoming Thursday
    // or today's expense appearing on another day.
    // ==========================================

    const parseLocalDate = (value) => {
        if (!value) {
            return null;
        }

        // Handle YYYY-MM-DD safely
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

        if (isNaN(date.getTime())) {
            return null;
        }

        return date;
    };

    // ==========================================
    // FETCH EXPENSES
    // ==========================================

    const fetchExpenses = async () => {
        try {
            setLoading(true);

            const token =
                localStorage.getItem("token");

            if (!token) {
                setExpenses([]);
                return;
            }

            const response = await fetch(
                "/api/expenses",
                {
                    method: "GET",
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch expenses: ${response.status}`
                );
            }

            const result =
                await response.json();

            console.log(
                "Weekly spending data:",
                result
            );

            let expenseList = [];

            if (Array.isArray(result)) {
                expenseList = result;
            } else if (
                Array.isArray(result.expenses)
            ) {
                expenseList = result.expenses;
            } else if (
                Array.isArray(result.data)
            ) {
                expenseList = result.data;
            } else if (
                Array.isArray(result.results)
            ) {
                expenseList = result.results;
            }

            setExpenses(expenseList);

        } catch (error) {
            console.error(
                "Weekly spending error:",
                error
            );

            setExpenses([]);
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // INITIAL LOAD + AUTO REFRESH
    // ==========================================

    useEffect(() => {
        fetchExpenses();

        // Refresh immediately when new expense is added
        const handleExpenseAdded = () => {
            fetchExpenses();
        };

        window.addEventListener(
            "expenseAdded",
            handleExpenseAdded
        );

        // Also refresh every 5 seconds
        const interval = setInterval(() => {
            fetchExpenses();
        }, 5000);

        return () => {
            window.removeEventListener(
                "expenseAdded",
                handleExpenseAdded
            );

            clearInterval(interval);
        };
    }, []);

    // ==========================================
    // CREATE CURRENT WEEK
    // MONDAY -> SUNDAY
    // ==========================================

    const createWeekData = () => {
        const today = new Date();

        // Remove time
        const currentDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        // JS:
        // Sunday = 0
        // Monday = 1
        // Tuesday = 2
        // ...
        // Saturday = 6

        const dayOfWeek =
            currentDate.getDay();

        // Convert Sunday to 7
        const mondayOffset =
            dayOfWeek === 0
                ? -6
                : 1 - dayOfWeek;

        const monday = new Date(
            currentDate
        );

        monday.setDate(
            currentDate.getDate() +
            mondayOffset
        );

        const days = [
            {
                name: "Monday",
                short: "Mon",
            },
            {
                name: "Tuesday",
                short: "Tue",
            },
            {
                name: "Wednesday",
                short: "Wed",
            },
            {
                name: "Thursday",
                short: "Thu",
            },
            {
                name: "Friday",
                short: "Fri",
            },
            {
                name: "Saturday",
                short: "Sat",
            },
            {
                name: "Sunday",
                short: "Sun",
            },
        ];

        return days.map(
            (day, index) => {
                const date = new Date(
                    monday
                );

                date.setDate(
                    monday.getDate() +
                    index
                );

                return {
                    name: day.name,
                    short: day.short,
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    day: date.getDate(),
                    dateObject: date,
                    amount: 0,
                };
            }
        );
    };

    // ==========================================
    // CALCULATE WEEKLY SPENDING
    // ==========================================

    const calculateWeeklyData = () => {
        const weekData =
            createWeekData();

        expenses.forEach(
            (expense) => {
                const expenseDate =
                    parseLocalDate(
                        getExpenseDate(expense)
                    );

                if (!expenseDate) {
                    return;
                }

                const expenseYear =
                    expenseDate.getFullYear();

                const expenseMonth =
                    expenseDate.getMonth();

                const expenseDay =
                    expenseDate.getDate();

                const matchingDay =
                    weekData.find(
                        (day) =>
                            day.year ===
                            expenseYear &&
                            day.month ===
                            expenseMonth &&
                            day.day ===
                            expenseDay
                    );

                if (matchingDay) {
                    matchingDay.amount +=
                        getAmount(expense);
                }
            }
        );

        return weekData;
    };

    const weekData =
        calculateWeeklyData();

    // ==========================================
    // TOTAL
    // ==========================================

    const weeklyTotal =
        weekData.reduce(
            (total, day) =>
                total + day.amount,
            0
        );

    // ==========================================
    // TODAY
    // ==========================================

    const today = new Date();

    const todayAmount =
        weekData.find(
            (day) =>
                day.year ===
                today.getFullYear() &&
                day.month ===
                today.getMonth() &&
                day.day ===
                today.getDate()
        )?.amount || 0;

    // ==========================================
    // FORMAT CURRENCY
    // ==========================================

    const formatCurrency = (amount) => {
        return `₹${Number(
            amount || 0
        ).toLocaleString("en-IN")}`;
    };

    // ==========================================
    // CUSTOM TOOLTIP
    // ==========================================

    const CustomTooltip = ({
        active,
        payload,
        label,
    }) => {
        if (
            !active ||
            !payload ||
            !payload.length
        ) {
            return null;
        }

        return (
            <div className="rounded-xl border border-white/10 bg-[#0A1C18] px-4 py-3 shadow-xl">
                <p className="mb-1 text-sm text-[#8FA8A2]">
                    {label}
                </p>

                <p className="text-lg font-bold text-emerald-400">
                    {formatCurrency(
                        payload[0].value
                    )}
                </p>
            </div>
        );
    };

    return (
        <div className="rounded-2xl border border-white/5 bg-[#0D2420] p-5 sm:p-6">

            {/* HEADER */}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                        <TrendingUp className="h-5 w-5 text-emerald-400" />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white">
                            Weekly Spending
                        </h2>

                        <p className="text-sm text-[#8FA8A2]">
                            Your spending from Monday to Sunday
                        </p>
                    </div>

                </div>

                {/* TOTAL */}

                <div className="rounded-xl border border-emerald-500/10 bg-[#0A1C18] px-4 py-3">

                    <p className="text-xs text-[#8FA8A2]">
                        This Week
                    </p>

                    <p className="mt-1 text-xl font-bold text-emerald-400">
                        {formatCurrency(
                            weeklyTotal
                        )}
                    </p>

                </div>

            </div>

            {/* TODAY / WEEK SUMMARY */}

            <div className="mb-6 grid grid-cols-2 gap-3">

                <div className="rounded-xl border border-white/5 bg-[#0A1C18] p-4">

                    <div className="flex items-center gap-2">

                        <CalendarDays className="h-4 w-4 text-teal-400" />

                        <span className="text-xs text-[#8FA8A2]">
                            Today
                        </span>

                    </div>

                    <p className="mt-2 text-lg font-bold text-white">
                        {formatCurrency(
                            todayAmount
                        )}
                    </p>

                </div>

                <div className="rounded-xl border border-white/5 bg-[#0A1C18] p-4">

                    <div className="flex items-center gap-2">

                        <IndianRupee className="h-4 w-4 text-emerald-400" />

                        <span className="text-xs text-[#8FA8A2]">
                            Weekly Total
                        </span>

                    </div>

                    <p className="mt-2 text-lg font-bold text-white">
                        {formatCurrency(
                            weeklyTotal
                        )}
                    </p>

                </div>

            </div>

            {/* LINE GRAPH */}

            {loading ? (

                <div className="flex h-72 items-center justify-center text-sm text-[#8FA8A2]">
                    Loading weekly spending...
                </div>

            ) : (

                <div className="h-72 w-full">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <LineChart
                            data={weekData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 5,
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(255,255,255,0.06)"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="short"
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
                                    `₹${value}`
                                }
                            />

                            <Tooltip
                                content={
                                    <CustomTooltip />
                                }
                            />

                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="#10B981"
                                strokeWidth={3}
                                dot={{
                                    r: 5,
                                    fill: "#10B981",
                                    strokeWidth: 2,
                                    stroke: "#061311",
                                }}
                                activeDot={{
                                    r: 7,
                                }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            )}

            {/* DAY DETAILS */}

            <div className="mt-5 grid grid-cols-7 gap-2">

                {weekData.map(
                    (day) => (
                        <div
                            key={`${day.year}-${day.month}-${day.day}`}
                            className="rounded-lg bg-[#0A1C18] p-2 text-center"
                        >

                            <p className="text-[10px] text-[#607A74] sm:text-xs">
                                {day.short}
                            </p>

                            <p className="mt-1 truncate text-xs font-semibold text-white sm:text-sm">
                                {formatCurrency(
                                    day.amount
                                )}
                            </p>

                        </div>
                    )
                )}

            </div>

        </div>
    );
};

export default WeeklySpending;