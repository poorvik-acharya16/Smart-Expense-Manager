import React, { useEffect, useMemo, useState } from "react";
import {
    Search,
    Filter,
    Receipt,
    Utensils,
    Car,
    ShoppingBag,
    FileText,
    GraduationCap,
    Gamepad2,
    HeartPulse,
    MoreHorizontal,
} from "lucide-react";

function ExpenseHistory() {
    const [expenses, setExpenses] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem("token");

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
            console.error("Error fetching expense history:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const filteredExpenses = useMemo(() => {
        return expenses.filter((expense) => {
            const matchesCategory =
                category === "All" || expense.category === category;

            const text =
                `${expense.category} ${expense.description || ""}`
                    .toLowerCase();

            const matchesSearch = text.includes(
                search.toLowerCase()
            );

            return matchesCategory && matchesSearch;
        });
    }, [expenses, search, category]);

    const totalHistory = filteredExpenses.reduce(
        (total, expense) =>
            total + Number(expense.amount || 0),
        0
    );

    const getIcon = (category) => {
        const icons = {
            Food: Utensils,
            Travel: Car,
            Shopping: ShoppingBag,
            Bills: FileText,
            Education: GraduationCap,
            Entertainment: Gamepad2,
            Health: HeartPulse,
            Other: MoreHorizontal,
        };

        return icons[category] || MoreHorizontal;
    };

    const formatMoney = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);

    return (
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">

            {/* HEADER */}
            <div className="p-6 border-b border-slate-800">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>
                        <h2 className="text-xl font-bold text-white">
                            Expense History
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            View all your recorded expenses
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-xs text-slate-500">
                            Filtered Total
                        </p>

                        <p className="text-xl font-bold text-emerald-400">
                            {formatMoney(totalHistory)}
                        </p>
                    </div>

                </div>

                {/* SEARCH + FILTER */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">

                    <div className="relative">

                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />

                        <input
                            type="text"
                            placeholder="Search expenses..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-emerald-500"
                        />

                    </div>

                    <div className="relative">

                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-emerald-500"
                        >
                            <option value="All">All Categories</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Bills">Bills</option>
                            <option value="Education">Education</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Health">Health</option>
                            <option value="Other">Other</option>
                        </select>

                    </div>

                </div>

            </div>

            {/* CONTENT */}
            {loading ? (

                <div className="p-10 text-center text-slate-500">
                    Loading expense history...
                </div>

            ) : filteredExpenses.length === 0 ? (

                <div className="p-12 text-center">

                    <Receipt className="w-12 h-12 mx-auto text-slate-700 mb-4" />

                    <h3 className="font-semibold text-slate-300">
                        No expenses found
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                        Try another search or category.
                    </p>

                </div>

            ) : (

                <div className="divide-y divide-slate-800">

                    {filteredExpenses.map((expense) => {

                        const Icon = getIcon(expense.category);

                        return (
                            <div
                                key={expense._id}
                                className="p-5 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition"
                            >

                                <div className="flex items-center gap-4">

                                    <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-emerald-400" />
                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-white">
                                            {expense.description ||
                                                expense.category}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {expense.category}
                                        </p>

                                        <p className="text-xs text-slate-600 mt-1">
                                            {new Date(
                                                expense.date
                                            ).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>

                                    </div>

                                </div>

                                <div className="text-right">

                                    <p className="font-bold text-emerald-400">
                                        {formatMoney(expense.amount)}
                                    </p>

                                </div>

                            </div>
                        );
                    })}

                </div>

            )}

        </section>
    );
}

export default ExpenseHistory;