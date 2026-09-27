import React, { useState } from "react";
import {
    Plus,
    ArrowLeft,
    IndianRupee,
    FileText,
    Tag,
    CalendarDays,
    CheckCircle,
    AlertCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/expenses";

const AddExpense = () => {
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        category: "Food",
        date: new Date().toISOString().split("T")[0],
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!formData.description.trim()) {
            setError("Please enter an expense description.");
            return;
        }

        if (
            !formData.amount ||
            Number(formData.amount) <= 0
        ) {
            setError("Please enter a valid amount.");
            return;
        }

        try {
            setLoading(true);

            const storedUser = localStorage.getItem("user");
            const token = localStorage.getItem("token");

            if (!storedUser) {
                setError("User session not found. Please login again.");
                setLoading(false);
                return;
            }

            const user = JSON.parse(storedUser);

            const userId =
                user._id ||
                user.id ||
                user.userId;

            if (!userId) {
                setError("User ID not found. Please login again.");
                setLoading(false);
                return;
            }

            const expenseData = {
                user: userId,
                description: formData.description.trim(),
                amount: Number(formData.amount),
                category: formData.category,
                date: formData.date,
            };

            console.log("SENDING EXPENSE:", expenseData);

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token
                        ? {
                            Authorization: `Bearer ${token}`,
                        }
                        : {}),
                },
                body: JSON.stringify(expenseData),
            });

            const data = await response.json();

            console.log("SERVER RESPONSE:", data);

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    data.error ||
                    "Failed to add expense"
                );
            }

            setMessage("Expense added successfully!");

            setFormData({
                description: "",
                amount: "",
                category: "Food",
                date: new Date()
                    .toISOString()
                    .split("T")[0],
            });

            window.dispatchEvent(
                new Event("expenseAdded")
            );

            setTimeout(() => {
                window.history.pushState(
                    {},
                    "",
                    "/dashboard"
                );

                window.dispatchEvent(
                    new PopStateEvent("popstate")
                );

                window.scrollTo({
                    top: 0,
                    behavior: "auto",
                });
            }, 700);
        } catch (err) {
            console.error("ADD EXPENSE ERROR:", err);
            setError(
                err.message ||
                "Something went wrong while adding the expense."
            );
        } finally {
            setLoading(false);
        }
    };

    const goBack = () => {
        window.history.pushState(
            {},
            "",
            "/dashboard"
        );

        window.dispatchEvent(
            new PopStateEvent("popstate")
        );
    };

    return (
        <div className="min-h-screen bg-[#061311] px-4 py-6 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">

                {/* Back */}
                <button
                    onClick={goBack}
                    className="mb-6 flex items-center gap-2 text-sm text-[#8FA8A2] transition hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </button>

                {/* Header */}
                <div className="mb-6">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                            <Plus className="h-5 w-5 text-emerald-400" />
                        </div>

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                                Expense Manager
                            </p>

                            <h1 className="text-2xl font-bold text-white">
                                Add New Expense
                            </h1>
                        </div>
                    </div>

                    <p className="text-sm text-[#8FA8A2]">
                        Record your expense and keep your finances organized.
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-emerald-500/10 bg-[#0B1C18] p-5 shadow-xl shadow-black/20 sm:p-7">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Description */}
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                                <FileText className="h-4 w-4 text-emerald-400" />
                                Description
                            </label>

                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Example: Grocery shopping"
                                className="w-full rounded-xl border border-white/10 bg-[#07100E] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#58716A] focus:border-emerald-400/50"
                            />
                        </div>

                        {/* Amount */}
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                                <IndianRupee className="h-4 w-4 text-emerald-400" />
                                Amount
                            </label>

                            <div className="relative">
                                <IndianRupee className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#58716A]" />

                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="0"
                                    min="1"
                                    step="0.01"
                                    className="w-full rounded-xl border border-white/10 bg-[#07100E] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-[#58716A] focus:border-emerald-400/50"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                                <Tag className="h-4 w-4 text-emerald-400" />
                                Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-white/10 bg-[#07100E] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/50"
                            >
                                <option value="Food">
                                    Food
                                </option>
                                <option value="Transport">
                                    Transport
                                </option>
                                <option value="Shopping">
                                    Shopping
                                </option>
                                <option value="Entertainment">
                                    Entertainment
                                </option>
                                <option value="Bills">
                                    Bills
                                </option>
                                <option value="Health">
                                    Health
                                </option>
                                <option value="Education">
                                    Education
                                </option>
                                <option value="Travel">
                                    Travel
                                </option>
                                <option value="Other">
                                    Other
                                </option>
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                                <CalendarDays className="h-4 w-4 text-emerald-400" />
                                Date
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-white/10 bg-[#07100E] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/50"
                            />
                        </div>

                        {/* Success */}
                        {message && (
                            <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                                <CheckCircle className="h-4 w-4" />
                                {message}
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-[#061311] transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Plus className="h-4 w-4" />

                            {loading
                                ? "Adding Expense..."
                                : "Add Expense"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddExpense;
