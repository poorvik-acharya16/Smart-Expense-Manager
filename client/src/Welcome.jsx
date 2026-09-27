import React from "react";
import {
    Wallet,
    ArrowRight,
    ShieldCheck,
    BarChart3,
    Sparkles,
} from "lucide-react";

const Welcome = () => {

    const goToAuth = () => {
        window.history.pushState({}, "", "/auth");
        window.dispatchEvent(
            new PopStateEvent("popstate")
        );
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    };

    return (
        <div className="min-h-screen bg-[#061311] text-white">

            {/* ================= NAVBAR ================= */}
            <nav className="border-b border-emerald-500/10 bg-[#061311]/95 backdrop-blur-xl">
                <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8">

                    <button
                        onClick={() => window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        })}
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/10">
                            <Wallet className="h-5 w-5 text-[#061311]" />
                        </div>

                        <div className="text-left">
                            <p className="text-sm font-bold tracking-wide text-white">
                                SmartSpend
                            </p>

                            <p className="text-[10px] text-[#8FA8A2]">
                                Expense Manager
                            </p>
                        </div>
                    </button>

                </div>
            </nav>


            {/* ================= HERO ================= */}
            <main>

                <section className="relative overflow-hidden">

                    {/* Background decoration */}
                    <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

                    <div className="pointer-events-none absolute -right-32 top-40 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />

                    <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-[1400px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-20">

                        {/* LEFT SIDE */}
                        <div className="relative z-10">

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
                                <Sparkles className="h-4 w-4 text-emerald-400" />

                                <span className="text-xs font-semibold text-emerald-300">
                                    Smart Financial Management
                                </span>
                            </div>


                            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">

                                Take Control of{" "}

                                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    Your Expenses
                                </span>

                            </h1>


                            <p className="mt-6 max-w-2xl text-base leading-7 text-[#8FA8A2] sm:text-lg">
                                Track your expenses, manage your monthly
                                budget, understand your spending habits,
                                and make smarter financial decisions with
                                SmartSpend.
                            </p>


                            {/* ONLY GET STARTED BUTTON */}
                            <div className="mt-8">
                                <button
                                    onClick={goToAuth}
                                    className="group flex items-center gap-3 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-[#061311] shadow-lg shadow-emerald-500/20 transition duration-300 hover:-translate-y-1 hover:bg-emerald-400 hover:shadow-emerald-500/30"
                                >
                                    Get Started

                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </div>


                            {/* FEATURES */}
                            <div className="mt-12 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">

                                <div className="rounded-2xl border border-white/5 bg-[#0D2420] p-4">
                                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                                        <Wallet className="h-4 w-4 text-emerald-400" />
                                    </div>

                                    <p className="text-sm font-semibold text-white">
                                        Track Expenses
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-[#8FA8A2]">
                                        Easily record and manage your spending.
                                    </p>
                                </div>


                                <div className="rounded-2xl border border-white/5 bg-[#0D2420] p-4">
                                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10">
                                        <BarChart3 className="h-4 w-4 text-teal-400" />
                                    </div>

                                    <p className="text-sm font-semibold text-white">
                                        Analyze Spending
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-[#8FA8A2]">
                                        Understand your financial patterns.
                                    </p>
                                </div>


                                <div className="rounded-2xl border border-white/5 bg-[#0D2420] p-4">
                                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                                        <ShieldCheck className="h-4 w-4 text-blue-400" />
                                    </div>

                                    <p className="text-sm font-semibold text-white">
                                        Manage Budget
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-[#8FA8A2]">
                                        Keep your monthly spending under control.
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* RIGHT SIDE */}
                        <div className="relative hidden lg:block">

                            <div className="relative mx-auto max-w-lg">

                                {/* Glow */}
                                <div className="absolute inset-0 rounded-[40px] bg-emerald-500/10 blur-3xl" />

                                {/* Dashboard preview */}
                                <div className="relative rounded-3xl border border-emerald-500/10 bg-[#0A1C18] p-5 shadow-2xl shadow-black/40">

                                    <div className="mb-5 flex items-center justify-between">

                                        <div>
                                            <p className="text-xs text-[#8FA8A2]">
                                                Overview
                                            </p>

                                            <h3 className="mt-1 text-xl font-bold">
                                                Financial Dashboard
                                            </h3>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                                            <Wallet className="h-5 w-5 text-emerald-400" />
                                        </div>

                                    </div>


                                    <div className="grid grid-cols-2 gap-3">

                                        <div className="rounded-2xl border border-white/5 bg-[#0D2420] p-4">
                                            <p className="text-xs text-[#8FA8A2]">
                                                Total Spending
                                            </p>

                                            <p className="mt-2 text-xl font-bold">
                                                ₹24,580
                                            </p>

                                            <p className="mt-1 text-xs text-emerald-400">
                                                Monthly overview
                                            </p>
                                        </div>


                                        <div className="rounded-2xl border border-white/5 bg-[#0D2420] p-4">
                                            <p className="text-xs text-[#8FA8A2]">
                                                Budget
                                            </p>

                                            <p className="mt-2 text-xl font-bold">
                                                ₹30,000
                                            </p>

                                            <p className="mt-1 text-xs text-teal-400">
                                                82% used
                                            </p>
                                        </div>

                                    </div>


                                    <div className="mt-4 rounded-2xl border border-white/5 bg-[#0D2420] p-4">

                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold">
                                                Spending Activity
                                            </p>

                                            <BarChart3 className="h-4 w-4 text-emerald-400" />
                                        </div>


                                        <div className="mt-5 flex h-28 items-end gap-2">

                                            {[35, 55, 42, 75, 58, 88, 65, 92, 70, 82, 60, 78].map(
                                                (height, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex-1 rounded-t-md bg-gradient-to-t from-emerald-600 to-teal-400 opacity-80"
                                                        style={{
                                                            height: `${height}%`,
                                                        }}
                                                    />
                                                )
                                            )}

                                        </div>

                                    </div>


                                    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                                            <Sparkles className="h-5 w-5 text-emerald-400" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold">
                                                Smart Insights
                                            </p>

                                            <p className="mt-1 text-xs text-[#8FA8A2]">
                                                Get useful insights from your spending patterns.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= INFORMATION SECTION ================= */}
                <section className="border-t border-white/5 bg-[#071815] py-16">

                    <div className="mx-auto max-w-[1200px] px-5 text-center sm:px-8">

                        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                            Everything in one place
                        </p>

                        <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                            Simple tools for better money management
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#8FA8A2]">
                            SmartSpend helps you organize expenses,
                            monitor budgets, and understand where your
                            money goes.
                        </p>

                    </div>

                </section>

            </main>

        </div>
    );
};

export default Welcome;
