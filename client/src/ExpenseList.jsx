import React, { useEffect, useState } from "react";

function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            const response = await fetch("/api/expenses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setExpenses(data);
            }
        } catch (error) {
            console.error("Error fetching expenses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    if (loading) {
        return (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <p className="text-slate-400">Loading expenses...</p>
            </div>
        );
    }

    return (
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-xl font-bold text-white">
                        Recent Expenses
                    </h2>
                    <p className="text-sm text-slate-400">
                        Your latest expense records
                    </p>
                </div>

                <button
                    onClick={() => {
                        window.location.href = "/add-expense";
                    }}
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold"
                >
                    + Add Expense
                </button>
            </div>

            {expenses.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-slate-400">
                        No expenses added yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {expenses.map((expense) => (
                        <div
                            key={expense._id}
                            className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-800 border border-slate-700"
                        >
                            <div>
                                <h3 className="font-semibold text-white">
                                    {expense.category}
                                </h3>

                                <p className="text-sm text-slate-400">
                                    {expense.description || "No description"}
                                </p>

                                <p className="text-xs text-slate-500 mt-1">
                                    {new Date(expense.date).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="text-lg font-bold text-emerald-400">
                                ₹{expense.amount}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default ExpenseList;