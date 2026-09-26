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

const WeeklySpending = ({ expenses = [] }) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const weeklyData = days.map((day, index) => {
        const total = expenses
            .filter((expense) => {
                const expenseDate = new Date(expense.date);
                return expenseDate.getDay() === index;
            })
            .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

        return {
            day,
            amount: total,
        };
    });

    return (
        <div className="weekly-spending">
            <div className="weekly-header">
                <h2>Weekly Spending</h2>
                <p>Your spending for this week</p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="day" />

                    <YAxis />

                    <Tooltip
                        formatter={(value) => [`₹${value}`, "Spent"]}
                    />

                    <Bar
                        dataKey="amount"
                        name="Spending"
                        fill="#104bb9ff"
                        barSize={18}
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeeklySpending;