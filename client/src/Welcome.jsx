import React from "react";
import {
    Wallet,
    ArrowRight,
    BarChart3,
    PiggyBank,
    ShieldCheck,
    FileText,
    TrendingUp,
    CheckCircle2,
    Sparkles,
} from "lucide-react";

const Welcome = () => {
    const goToAuth = () => {
        window.location.href = "/auth";
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-hidden">

            {/* =========================================
          NAVBAR
      ========================================= */}

            <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">

                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="h-20 flex items-center justify-between">

                        {/* LOGO */}

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">

                                <Wallet className="w-6 h-6 text-slate-950" />

                            </div>

                            <div>

                                <h1 className="text-base sm:text-xl font-bold tracking-tight">

                                    SMART EXPENSE MANAGER

                                </h1>

                                <p className="hidden sm:block text-xs text-slate-500">

                                    Personal Finance & Analytics

                                </p>

                            </div>

                        </div>

                        {/* ONLY LOGIN BUTTON #1 */}

                        <button
                            onClick={goToAuth}
                            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 hover:border-emerald-500/40 transition-all duration-300 font-semibold"
                        >

                            Login

                            <ArrowRight className="w-4 h-4" />

                        </button>

                    </div>

                </div>

            </header>

            {/* =========================================
          HERO SECTION
      ========================================= */}

            <main>

                <section className="relative overflow-hidden">

                    {/* Background Effects */}

                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="absolute top-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="absolute top-60 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        <div className="min-h-[650px] flex items-center justify-center text-center py-20">

                            <div className="max-w-4xl">

                                {/* Badge */}

                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8">

                                    <Sparkles className="w-4 h-4" />

                                    Smart Personal Finance Management

                                </div>

                                {/* Heading */}

                                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">

                                    Take Control of

                                    <span className="block text-emerald-400 mt-2">

                                        Your Expenses

                                    </span>

                                </h2>

                                {/* Description */}

                                <p className="mt-7 text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">

                                    Track your daily expenses, manage your budget,

                                    understand your spending habits, and make smarter

                                    financial decisions — all from one powerful dashboard.

                                </p>

                                {/* ONLY LOGIN ACTION #2 */}

                                <div className="mt-10 flex justify-center">

                                    <button
                                        onClick={goToAuth}
                                        className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5"
                                    >

                                        Get Started

                                        <ArrowRight className="w-5 h-5" />

                                    </button>

                                </div>

                                {/* Small Trust Text */}

                                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mt-8 text-sm text-slate-500">

                                    <div className="flex items-center gap-2">

                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />

                                        Easy to use

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />

                                        Personal dashboard

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />

                                        Expense analytics

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =========================================
            FEATURES
        ========================================= */}

                <section className="border-t border-slate-800/80 bg-slate-950/60">

                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                        <div className="text-center max-w-3xl mx-auto mb-12">

                            <p className="text-emerald-400 text-sm font-bold tracking-wider">

                                POWERFUL FEATURES

                            </p>

                            <h3 className="text-3xl sm:text-4xl font-bold mt-3">

                                Everything you need to manage your money

                            </h3>

                            <p className="text-slate-500 mt-4 leading-relaxed">

                                Simple tools combined with useful analytics to

                                help you understand and manage your spending.

                            </p>

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                            {/* Feature 1 */}

                            <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300">

                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition">

                                    <Wallet className="w-6 h-6 text-emerald-400" />

                                </div>

                                <h4 className="text-lg font-bold">

                                    Expense Tracking

                                </h4>

                                <p className="text-sm text-slate-500 mt-3 leading-relaxed">

                                    Record and manage your daily expenses quickly

                                    and keep all your transactions organized.

                                </p>

                            </div>

                            {/* Feature 2 */}

                            <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300">

                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition">

                                    <PiggyBank className="w-6 h-6 text-blue-400" />

                                </div>

                                <h4 className="text-lg font-bold">

                                    Budget Management

                                </h4>

                                <p className="text-sm text-slate-500 mt-3 leading-relaxed">

                                    Set a monthly budget and monitor how much you

                                    have spent and how much remains.

                                </p>

                            </div>

                            {/* Feature 3 */}

                            <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300">

                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition">

                                    <BarChart3 className="w-6 h-6 text-purple-400" />

                                </div>

                                <h4 className="text-lg font-bold">

                                    Spending Analytics

                                </h4>

                                <p className="text-sm text-slate-500 mt-3 leading-relaxed">

                                    Visualize your spending with charts and identify

                                    where your money is going.

                                </p>

                            </div>

                            {/* Feature 4 */}

                            <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300">

                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition">

                                    <FileText className="w-6 h-6 text-orange-400" />

                                </div>

                                <h4 className="text-lg font-bold">

                                    Monthly Reports

                                </h4>

                                <p className="text-sm text-slate-500 mt-3 leading-relaxed">

                                    Review your monthly expenses with detailed

                                    reports and category summaries.

                                </p>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =========================================
            ANALYTICS PREVIEW
        ========================================= */}

                <section className="border-t border-slate-800">

                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                            {/* Text */}

                            <div>

                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">

                                    <TrendingUp className="w-6 h-6 text-emerald-400" />

                                </div>

                                <p className="text-emerald-400 text-sm font-bold tracking-wider">

                                    SMART INSIGHTS

                                </p>

                                <h3 className="text-3xl sm:text-4xl font-bold mt-3">

                                    Understand your spending patterns

                                </h3>

                                <p className="text-slate-500 mt-5 leading-relaxed">

                                    Your dashboard brings your expense data together

                                    with useful summaries, category breakdowns,

                                    budgets, and spending trends.

                                </p>

                                <div className="space-y-4 mt-7">

                                    <div className="flex items-start gap-3">

                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />

                                        <div>

                                            <p className="font-semibold">

                                                Track spending trends

                                            </p>

                                            <p className="text-sm text-slate-500 mt-1">

                                                See how your spending changes over time.

                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-start gap-3">

                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />

                                        <div>

                                            <p className="font-semibold">

                                                Monitor your budget

                                            </p>

                                            <p className="text-sm text-slate-500 mt-1">

                                                Keep track of your monthly spending limit.

                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-start gap-3">

                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />

                                        <div>

                                            <p className="font-semibold">

                                                Analyze categories

                                            </p>

                                            <p className="text-sm text-slate-500 mt-1">

                                                Identify the categories where you spend most.

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Dashboard Preview */}

                            <div className="relative">

                                <div className="absolute -inset-4 bg-emerald-500/5 rounded-3xl blur-2xl" />

                                <div className="relative rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6 shadow-2xl">

                                    {/* Preview Header */}

                                    <div className="flex items-center justify-between mb-6">

                                        <div>

                                            <p className="text-xs text-slate-500">

                                                FINANCIAL OVERVIEW

                                            </p>

                                            <h4 className="text-lg font-bold mt-1">

                                                Spending Summary

                                            </h4>

                                        </div>

                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">

                                            <Wallet className="w-5 h-5 text-emerald-400" />

                                        </div>

                                    </div>

                                    {/* Preview Cards */}

                                    <div className="grid grid-cols-2 gap-3 mb-5">

                                        <div className="rounded-xl bg-slate-950 border border-slate-800 p-4">

                                            <p className="text-xs text-slate-500">

                                                Total Spent

                                            </p>

                                            <p className="text-xl font-bold mt-2">

                                                ₹24,580

                                            </p>

                                            <p className="text-xs text-emerald-400 mt-2">

                                                All expenses

                                            </p>

                                        </div>

                                        <div className="rounded-xl bg-slate-950 border border-slate-800 p-4">

                                            <p className="text-xs text-slate-500">

                                                This Month

                                            </p>

                                            <p className="text-xl font-bold mt-2">

                                                ₹8,240

                                            </p>

                                            <p className="text-xs text-blue-400 mt-2">

                                                Current month

                                            </p>

                                        </div>

                                    </div>

                                    {/* Fake Chart */}

                                    <div className="rounded-xl bg-slate-950 border border-slate-800 p-4">

                                        <div className="flex items-center justify-between mb-5">

                                            <p className="text-sm font-semibold">

                                                Spending Trend

                                            </p>

                                            <BarChart3 className="w-4 h-4 text-slate-500" />

                                        </div>

                                        <div className="flex items-end justify-between gap-2 h-32">

                                            <div className="w-full bg-emerald-500/20 rounded-t-lg h-[35%]" />

                                            <div className="w-full bg-emerald-500/30 rounded-t-lg h-[55%]" />

                                            <div className="w-full bg-emerald-500/40 rounded-t-lg h-[42%]" />

                                            <div className="w-full bg-emerald-500/50 rounded-t-lg h-[75%]" />

                                            <div className="w-full bg-emerald-500/60 rounded-t-lg h-[60%]" />

                                            <div className="w-full bg-emerald-400 rounded-t-lg h-[88%]" />

                                        </div>

                                        <div className="flex justify-between text-[10px] text-slate-600 mt-2">

                                            <span>Jan</span>

                                            <span>Feb</span>

                                            <span>Mar</span>

                                            <span>Apr</span>

                                            <span>May</span>

                                            <span>Jun</span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =========================================
            SECURITY
        ========================================= */}

                <section className="border-t border-slate-800 bg-slate-950/60">

                    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">

                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">

                            <ShieldCheck className="w-7 h-7 text-emerald-400" />

                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold">

                            Your finances, organized in one place

                        </h3>

                        <p className="text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">

                            Access your personal dashboard to record expenses,

                            manage budgets, view analytics, and keep track of

                            your financial activity.

                        </p>

                    </div>

                </section>

            </main>

            {/* =========================================
          FOOTER
      ========================================= */}

            <footer className="border-t border-slate-800">

                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

                        <div className="flex items-center gap-2">

                            <Wallet className="w-4 h-4 text-emerald-400" />

                            <p className="text-sm font-semibold">

                                Smart Expense Manager

                            </p>

                        </div>

                        <p className="text-xs text-slate-600">

                            Personal Finance & Analytics

                        </p>

                    </div>

                </div>

            </footer>

        </div>
    );
};

export default Welcome;
