import React from "react";

import {
    Receipt,
    Plus,
    Search,
    History,
} from "lucide-react";

import ExpenseHistory from "../ExpenseHistory";

const Expenses = ({ navigate }) => {
    return (
        <div className="space-y-6">

            {/* HEADER */}
            <section className="rounded-3xl border border-emerald-500/10 bg-gradient-to-br from-[#0D2420] to-[#0A1C18] p-6 sm:p-8">

                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                            <Receipt className="h-7 w-7 text-emerald-400" />
                        </div>

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                                Transactions
                            </p>

                            <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                                Expense History
                            </h1>

                            <p className="mt-2 text-sm text-[#8FA8A2]">
                                Search, filter and manage all your expenses.
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={() =>
                            navigate("/add-expense")
                        }
                        className="flex w-fit items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-[#061311] transition hover:bg-emerald-400"
                    >
                        <Plus className="h-4 w-4" />
                        Add Expense
                    </button>

                </div>

            </section>

            {/* QUICK INFO */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#0D2420] p-4">

                    <div className="rounded-xl bg-emerald-500/10 p-3">
                        <Receipt className="h-5 w-5 text-emerald-400" />
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-white">
                            All Expenses
                        </p>

                        <p className="text-xs text-[#8FA8A2]">
                            Complete transaction history
                        </p>
                    </div>

                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#0D2420] p-4">

                    <div className="rounded-xl bg-teal-500/10 p-3">
                        <Search className="h-5 w-5 text-teal-400" />
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-white">
                            Search & Filter
                        </p>

                        <p className="text-xs text-[#8FA8A2]">
                            Find expenses quickly
                        </p>
                    </div>

                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#0D2420] p-4">

                    <div className="rounded-xl bg-blue-500/10 p-3">
                        <History className="h-5 w-5 text-blue-400" />
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-white">
                            Expense Records
                        </p>

                        <p className="text-xs text-[#8FA8A2]">
                            Manage your spending history
                        </p>
                    </div>

                </div>

            </div>

            {/* EXPENSE HISTORY */}
            <section className="rounded-2xl border border-white/5 bg-[#0D2420] p-5">

                <ExpenseHistory />

            </section>

        </div>
    );
};

export default Expenses;