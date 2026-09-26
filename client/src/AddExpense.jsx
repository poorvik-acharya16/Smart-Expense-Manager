import React, { useState } from "react";

function AddExpense() {
    const [form, setForm] = useState({
        amount: "",
        category: "Food",
        description: "",
        date: new Date().toISOString().split("T")[0],
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Saving...");

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setMessage("Please login first");
                return;
            }

            const response = await fetch("/api/expenses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Failed to add expense");
                return;
            }

            setMessage("Expense added successfully!");

            setForm({
                amount: "",
                category: "Food",
                description: "",
                date: new Date().toISOString().split("T")[0],
            });
        } catch (error) {
            console.error(error);
            setMessage("Unable to connect to server");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            <div className="max-w-xl mx-auto">

                <h1 className="text-3xl font-bold mb-2">
                    Add Expense
                </h1>

                <p className="text-slate-400 mb-6">
                    Record your daily expense
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5"
                >

                    {/* Amount */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Amount
                        </label>

                        <input
                            type="number"
                            name="amount"
                            placeholder="Enter amount"
                            value={form.amount}
                            onChange={handleChange}
                            min="1"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Category
                        </label>

                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                        >
                            <option>Food</option>
                            <option>Travel</option>
                            <option>Shopping</option>
                            <option>Bills</option>
                            <option>Education</option>
                            <option>Entertainment</option>
                            <option>Health</option>
                            <option>Other</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Description
                        </label>

                        <input
                            type="text"
                            name="description"
                            placeholder="Example: Lunch"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Date
                        </label>

                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition"
                    >
                        Add Expense
                    </button>

                    {message && (
                        <p className="text-center text-sm text-emerald-400">
                            {message}
                        </p>
                    )}

                </form>

                <button
                    onClick={() => {
                        window.location.href = "/";
                    }}
                    className="w-full mt-4 text-sm text-slate-400 hover:text-white"
                >
                    ← Back to Dashboard
                </button>

            </div>
        </div>
    );
}

export default AddExpense;