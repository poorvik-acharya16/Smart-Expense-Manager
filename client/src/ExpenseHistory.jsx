import React, { useEffect, useState } from "react";
import {
    Search,
    Filter,
    Trash2,
    Receipt,
    X,
} from "lucide-react";

const ExpenseHistory = () => {
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState("All");

    const [deletingId, setDeletingId] = useState(null);

    const token = localStorage.getItem("token");

    // =========================================
    // FETCH EXPENSES
    // =========================================

    const fetchExpenses = async () => {
        try {
            if (!token) {
                setExpenses([]);
                return;
            }

            const response = await fetch("/api/expenses", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Failed to fetch expenses:", data);
                return;
            }

            if (Array.isArray(data)) {
                setExpenses(data);
            } else {
                console.error("Unexpected response:", data);
                setExpenses([]);
            }
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    // =========================================
    // INITIAL LOAD
    // =========================================

    useEffect(() => {
        fetchExpenses();
    }, []);

    // =========================================
    // SEARCH + FILTERS
    // =========================================

    useEffect(() => {
        let result = [...expenses];

        // SEARCH
        if (searchTerm.trim() !== "") {
            const search = searchTerm.toLowerCase();

            result = result.filter((expense) => {
                return (
                    expense.description
                        ?.toLowerCase()
                        .includes(search) ||
                    expense.category
                        ?.toLowerCase()
                        .includes(search) ||
                    String(expense.amount).includes(search)
                );
            });
        }

        // CATEGORY FILTER
        if (categoryFilter !== "All") {
            result = result.filter(
                (expense) =>
                    expense.category === categoryFilter
            );
        }

        // DATE FILTER
        if (dateFilter !== "All") {
            const today = new Date();

            result = result.filter((expense) => {
                const expenseDate = new Date(expense.date);

                if (dateFilter === "Today") {
                    return (
                        expenseDate.toDateString() ===
                        today.toDateString()
                    );
                }

                if (dateFilter === "This Week") {
                    const weekAgo = new Date();
                    weekAgo.setDate(
                        today.getDate() - 7
                    );

                    return expenseDate >= weekAgo;
                }

                if (dateFilter === "This Month") {
                    return (
                        expenseDate.getMonth() ===
                        today.getMonth() &&
                        expenseDate.getFullYear() ===
                        today.getFullYear()
                    );
                }

                return true;
            });
        }

        setFilteredExpenses(result);
    }, [
        searchTerm,
        categoryFilter,
        dateFilter,
        expenses,
    ]);

    // =========================================
    // DELETE EXPENSE
    // =========================================

    const deleteExpense = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setDeletingId(id);

            if (!token) {
                alert("Your session has expired. Please login again.");
                window.location.href = "/auth";
                return;
            }

            console.log("Deleting expense:", id);

            const response = await fetch(
                `/api/expenses/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            let data = {};

            try {
                data = await response.json();
            } catch {
                data = {};
            }

            console.log(
                "Delete response:",
                response.status,
                data
            );

            if (!response.ok) {
                console.error(
                    "Delete failed:",
                    response.status,
                    data
                );

                alert(
                    data.message ||
                    data.error ||
                    `Unable to delete expense. Server returned ${response.status}.`
                );

                return;
            }

            // Remove deleted expense from the UI
            setExpenses((prevExpenses) =>
                prevExpenses.filter(
                    (expense) => expense._id !== id
                )
            );

            console.log(
                "Expense deleted successfully:",
                id
            );

        } catch (error) {
            console.error(
                "Error deleting expense:",
                error
            );

            alert(
                "Unable to delete the expense. Please check that the backend server is running."
            );
        } finally {
            setDeletingId(null);
        }
    };

    // =========================================
    // FORMAT MONEY
    // =========================================

    const formatMoney = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // =========================================
    // CLEAR FILTERS
    // =========================================

    const clearFilters = () => {
        setSearchTerm("");
        setCategoryFilter("All");
        setDateFilter("All");
    };

    const hasFilters =
        searchTerm !== "" ||
        categoryFilter !== "All" ||
        dateFilter !== "All";

    // =========================================
    // UI
    // =========================================

    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">

            {/* HEADER */}

            <div className="p-5 border-b border-slate-800">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                        <h3 className="text-xl font-bold">
                            Expense History
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Search and manage your expense records
                        </p>

                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-400">

                        <Receipt className="w-4 h-4" />

                        {filteredExpenses.length} expenses

                    </div>

                </div>

                {/* SEARCH + FILTERS */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">

                    {/* SEARCH */}

                    <div className="relative lg:col-span-2">

                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                        <input
                            type="text"
                            placeholder="Search expenses..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 outline-none focus:border-emerald-500 transition"
                        />

                        {searchTerm && (
                            <button
                                onClick={() =>
                                    setSearchTerm("")
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}

                    </div>

                    {/* CATEGORY */}

                    <select
                        value={categoryFilter}
                        onChange={(e) =>
                            setCategoryFilter(
                                e.target.value
                            )
                        }
                        className="px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white outline-none focus:border-emerald-500 transition"
                    >

                        <option value="All">
                            All Categories
                        </option>

                        <option value="Food">
                            Food
                        </option>

                        <option value="Travel">
                            Travel
                        </option>

                        <option value="Shopping">
                            Shopping
                        </option>

                        <option value="Bills">
                            Bills
                        </option>

                        <option value="Education">
                            Education
                        </option>

                        <option value="Entertainment">
                            Entertainment
                        </option>

                        <option value="Health">
                            Health
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>

                    {/* DATE */}

                    <select
                        value={dateFilter}
                        onChange={(e) =>
                            setDateFilter(
                                e.target.value
                            )
                        }
                        className="px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white outline-none focus:border-emerald-500 transition"
                    >

                        <option value="All">
                            All Dates
                        </option>

                        <option value="Today">
                            Today
                        </option>

                        <option value="This Week">
                            This Week
                        </option>

                        <option value="This Month">
                            This Month
                        </option>

                    </select>

                </div>

                {/* ACTIVE FILTERS */}

                {hasFilters && (
                    <div className="flex items-center justify-between mt-4">

                        <div className="flex items-center gap-2 text-sm text-emerald-400">

                            <Filter className="w-4 h-4" />

                            Filters applied

                        </div>

                        <button
                            onClick={clearFilters}
                            className="text-sm text-slate-400 hover:text-white transition"
                        >
                            Clear filters
                        </button>

                    </div>
                )}

            </div>

            {/* EXPENSE LIST */}

            {filteredExpenses.length === 0 ? (

                <div className="p-10 text-center">

                    <Receipt className="w-12 h-12 mx-auto text-slate-700 mb-4" />

                    <h4 className="font-semibold text-slate-300">
                        No expenses found
                    </h4>

                    <p className="text-sm text-slate-500 mt-1">
                        Try changing your search or filters.
                    </p>

                    {hasFilters && (
                        <button
                            onClick={clearFilters}
                            className="mt-5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition"
                        >
                            Clear Filters
                        </button>
                    )}

                </div>

            ) : (

                <div className="divide-y divide-slate-800">

                    {filteredExpenses.map((expense) => (

                        <div
                            key={expense._id}
                            className="p-4 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition"
                        >

                            {/* EXPENSE INFO */}

                            <div className="flex items-center gap-4 min-w-0">

                                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">

                                    <Receipt className="w-5 h-5 text-emerald-400" />

                                </div>

                                <div className="min-w-0">

                                    <h4 className="font-semibold truncate">
                                        {expense.description ||
                                            expense.category}
                                    </h4>

                                    <p className="text-sm text-slate-500">

                                        {expense.category} •{" "}

                                        {new Date(
                                            expense.date
                                        ).toLocaleDateString(
                                            "en-IN"
                                        )}

                                    </p>

                                </div>

                            </div>

                            {/* AMOUNT + DELETE */}

                            <div className="flex items-center gap-3 shrink-0">

                                <span className="font-bold text-emerald-400">
                                    {formatMoney(
                                        expense.amount
                                    )}
                                </span>

                                <button
                                    onClick={() =>
                                        deleteExpense(
                                            expense._id
                                        )
                                    }
                                    disabled={
                                        deletingId ===
                                        expense._id
                                    }
                                    title="Delete expense"
                                    className={`p-2 rounded-lg transition ${deletingId ===
                                            expense._id
                                            ? "text-slate-700 cursor-not-allowed"
                                            : "text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                                        }`}
                                >

                                    <Trash2 className="w-4 h-4" />

                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </section>
    );
};

export default ExpenseHistory;