import React, { useEffect, useMemo, useState } from "react";

import Welcome from "./Welcome";
import Auth from "./Auth";
import AddExpense from "./AddExpense";

import WeeklySpending from "./WeeklySpending.jsx";
import ExpenseHistory from "./ExpenseHistory";
import MonthlyExpenseReport from "./MonthlyExpenseReport";
import BudgetCard from "./BudgetCard";
import BudgetChart from "./BudgetChart";
import SpendingInsights from "./SpendingInsights";
import SpendingTrend from "./SpendingTrend";

import { fetchHealthStatus } from "./services/api";

import {
  Wallet,
  Plus,
  LogOut,
  TrendingUp,
  Receipt,
  IndianRupee,
  Utensils,
  Car,
  ShoppingBag,
  FileText,
  HeartPulse,
  GraduationCap,
  Gamepad2,
  MoreHorizontal,
  ArrowUpRight,
} from "lucide-react";

export default function App() {
  const [healthState, setHealthState] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loadingExpenses, setLoadingExpenses] = useState(true);

  // -----------------------------------------
  // PAGE ROUTING
  // -----------------------------------------

  const pathname = window.location.pathname;

  const isHomePage = pathname === "/";
  const isAuthPage = pathname === "/auth";
  const isDashboardPage = pathname === "/dashboard";
  const isAddExpensePage = pathname === "/add-expense";

  // -----------------------------------------
  // USER / TOKEN
  // -----------------------------------------

  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Error reading saved user:", error);
    user = null;
  }

  // -----------------------------------------
  // CHECK BACKEND HEALTH
  // -----------------------------------------

  const checkHealth = async () => {
    try {
      const result = await fetchHealthStatus();
      setHealthState(result);
    } catch (error) {
      console.error("Health check failed:", error);

      setHealthState({
        success: false,
      });
    }
  };

  // -----------------------------------------
  // FETCH EXPENSES
  // -----------------------------------------

  const fetchExpenses = async () => {
    try {
      setLoadingExpenses(true);

      if (!token) {
        setExpenses([]);
        setLoadingExpenses(false);
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

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/auth";
          return;
        }

        setExpenses([]);
        return;
      }

      if (Array.isArray(data)) {
        setExpenses(data);
      } else {
        console.error("Unexpected expenses response:", data);
        setExpenses([]);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setExpenses([]);
    } finally {
      setLoadingExpenses(false);
    }
  };

  // -----------------------------------------
  // LOAD DASHBOARD DATA
  // -----------------------------------------

  useEffect(() => {
    // Welcome page
    if (isHomePage) {
      return;
    }

    // Login/Register page
    if (isAuthPage) {
      return;
    }

    // Add Expense page
    if (isAddExpensePage) {
      if (!token) {
        window.location.href = "/auth";
      }

      return;
    }

    // Dashboard
    if (isDashboardPage) {
      if (!token) {
        window.location.href = "/auth";
        return;
      }

      checkHealth();
      fetchExpenses();
    }
  }, [
    isHomePage,
    isAuthPage,
    isDashboardPage,
    isAddExpensePage,
    token,
  ]);

  // -----------------------------------------
  // TOTAL SPENDING
  // -----------------------------------------

  const totalSpent = useMemo(() => {
    return expenses.reduce(
      (total, expense) =>
        total + Number(expense.amount || 0),
      0
    );
  }, [expenses]);

  // -----------------------------------------
  // CURRENT MONTH SPENDING
  // -----------------------------------------

  const monthlySpent = useMemo(() => {
    const now = new Date();

    return expenses
      .filter((expense) => {
        const date = new Date(expense.date);

        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      })
      .reduce(
        (total, expense) =>
          total + Number(expense.amount || 0),
        0
      );
  }, [expenses]);

  // -----------------------------------------
  // LAST MONTH SPENDING
  // -----------------------------------------

  const lastMonthSpent = useMemo(() => {
    const now = new Date();

    const lastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );

    return expenses
      .filter((expense) => {
        const date = new Date(expense.date);

        return (
          date.getMonth() === lastMonth.getMonth() &&
          date.getFullYear() === lastMonth.getFullYear()
        );
      })
      .reduce(
        (total, expense) =>
          total + Number(expense.amount || 0),
        0
      );
  }, [expenses]);

  // -----------------------------------------
  // MONTHLY PERCENTAGE CHANGE
  // -----------------------------------------

  const monthlyChange = useMemo(() => {
    if (lastMonthSpent === 0) {
      return 0;
    }

    return Math.round(
      ((monthlySpent - lastMonthSpent) /
        lastMonthSpent) *
      100
    );
  }, [monthlySpent, lastMonthSpent]);

  // -----------------------------------------
  // CATEGORY TOTALS
  // -----------------------------------------

  const categoryTotals = useMemo(() => {
    const totals = {};

    expenses.forEach((expense) => {
      const category = expense.category || "Other";

      totals[category] =
        (totals[category] || 0) +
        Number(expense.amount || 0);
    });

    return totals;
  }, [expenses]);

  const categories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // -----------------------------------------
  // CATEGORY ICON
  // -----------------------------------------

  const getCategoryIcon = (category) => {
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

  // -----------------------------------------
  // FORMAT MONEY
  // -----------------------------------------

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // -----------------------------------------
  // LOGOUT
  // -----------------------------------------

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  // =========================================
  // WELCOME PAGE
  // =========================================

  if (isHomePage) {
    return <Welcome />;
  }

  // =========================================
  // AUTH PAGE
  // =========================================

  if (isAuthPage) {
    return <Auth />;
  }

  // =========================================
  // ADD EXPENSE PAGE
  // =========================================

  if (isAddExpensePage) {
    if (!token) {
      window.location.href = "/auth";
      return null;
    }

    return <AddExpense />;
  }

  // =========================================
  // PROTECT DASHBOARD
  // =========================================

  if (isDashboardPage && !token) {
    window.location.href = "/auth";
    return null;
  }

  // =========================================
  // DASHBOARD
  // =========================================

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="min-h-20 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            {/* LOGO */}

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">

                <Wallet className="w-6 h-6 text-slate-950" />

              </div>

              <div>

                <h1 className="text-lg sm:text-xl font-bold">

                  SMART EXPENSE MANAGER

                </h1>

                <p className="text-xs text-slate-500">

                  Personal Finance Dashboard

                </p>

              </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="flex items-center justify-between sm:justify-end gap-3">

              <button
                onClick={() => {
                  window.location.href = "/add-expense";
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition"
              >

                <Plus className="w-4 h-4" />

                <span>Add Expense</span>

              </button>

              <div className="hidden md:block text-right">

                <p className="text-sm font-semibold">

                  {user?.name || "User"}

                </p>

                <p className="text-xs text-slate-500">

                  {user?.email || ""}

                </p>

              </div>

              <button
                onClick={logout}
                title="Logout"
                className="p-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 transition"
              >

                <LogOut className="w-5 h-5 text-slate-300" />

              </button>

            </div>

          </div>

        </div>

      </header>

      {/* =====================================
          MAIN
      ===================================== */}

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* =================================
            WELCOME
        ================================= */}

        <section className="mb-8">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

            <div className="min-w-0">

              <p className="text-emerald-400 text-sm font-semibold mb-2">

                Financial Overview

              </p>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight break-words">

                Welcome back, {user?.name || "User"} 👋

              </h2>

              <p className="text-slate-400 mt-2">

                Here's what's happening with your expenses.

              </p>

            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400 shrink-0">

              <span
                className={`w-2.5 h-2.5 rounded-full ${healthState?.success
                  ? "bg-emerald-400"
                  : "bg-red-400"
                  }`}
              />

              {healthState?.success
                ? "System Online"
                : "Checking system..."}

            </div>

          </div>

        </section>

        {/* =================================
            SUMMARY CARDS
        ================================= */}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {/* TOTAL SPENT */}

          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-emerald-500/20 to-slate-900 p-6">

            <div className="flex items-center justify-between gap-4">

              <div className="min-w-0">

                <p className="text-sm text-slate-400">

                  Total Spent

                </p>

                <h3 className="text-2xl sm:text-3xl font-bold mt-2 break-words">

                  {formatMoney(totalSpent)}

                </h3>

              </div>

              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">

                <IndianRupee className="text-emerald-400" />

              </div>

            </div>

            <div className="flex items-center gap-1 mt-5 text-sm text-emerald-400">

              <TrendingUp className="w-4 h-4 shrink-0" />

              All recorded expenses

            </div>

          </div>

          {/* THIS MONTH */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between gap-4">

              <div className="min-w-0">

                <p className="text-sm text-slate-400">

                  This Month

                </p>

                <h3 className="text-2xl sm:text-3xl font-bold mt-2 break-words">

                  {formatMoney(monthlySpent)}

                </h3>

              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">

                <Wallet className="text-blue-400" />

              </div>

            </div>

            <p className="text-sm text-slate-500 mt-5">

              Current month spending

            </p>

          </div>

          {/* TRANSACTIONS */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-sm text-slate-400">

                  Transactions

                </p>

                <h3 className="text-2xl sm:text-3xl font-bold mt-2">

                  {expenses.length}

                </h3>

              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">

                <Receipt className="text-purple-400" />

              </div>

            </div>

            <p className="text-sm text-slate-500 mt-5">

              Total recorded transactions

            </p>

          </div>

          {/* MONTHLY COMPARISON */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between gap-4">

              <div className="min-w-0">

                <p className="text-sm text-slate-400">

                  Monthly Comparison

                </p>

                <h3 className="text-2xl sm:text-3xl font-bold mt-2 break-words">

                  {formatMoney(monthlySpent)}

                </h3>

              </div>

              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">

                <TrendingUp className="text-orange-400" />

              </div>

            </div>

            <div className="flex items-center justify-between gap-3 mt-5">

              <div>

                <p className="text-xs text-slate-500">

                  Last Month

                </p>

                <p className="text-sm font-semibold mt-1">

                  {formatMoney(lastMonthSpent)}

                </p>

              </div>

              <div
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${monthlyChange > 0
                  ? "bg-red-500/10 text-red-400"
                  : monthlyChange < 0
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-slate-800 text-slate-400"
                  }`}
              >

                {monthlyChange > 0
                  ? `↑ ${monthlyChange}%`
                  : monthlyChange < 0
                    ? `↓ ${Math.abs(monthlyChange)}%`
                    : "No change"}

              </div>

            </div>

            <p className="text-xs text-slate-600 mt-4">

              Compared with previous month

            </p>

          </div>

        </section>

        {/* =================================
            ANALYTICS
        ================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* WEEKLY SPENDING */}

          <div className="w-full min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6 overflow-hidden">

            <WeeklySpending expenses={expenses} />

          </div>

          {/* CATEGORY BREAKDOWN */}

          <div className="w-full min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">

            <div className="mb-6">

              <h3 className="text-xl font-bold">

                Category Breakdown

              </h3>

              <p className="text-sm text-slate-500 mt-1">

                Where your money goes

              </p>

            </div>

            {categories.length === 0 ? (

              <div className="py-12 text-center text-slate-500">

                No category data yet.

              </div>

            ) : (

              <div className="space-y-5">

                {categories.map(([category, amount]) => {

                  const Icon = getCategoryIcon(category);

                  const percentage =
                    totalSpent > 0
                      ? Math.round(
                        (amount / totalSpent) * 100
                      )
                      : 0;

                  return (

                    <div key={category}>

                      <div className="flex items-center justify-between gap-3 mb-2">

                        <div className="flex items-center gap-3 min-w-0">

                          <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">

                            <Icon className="w-4 h-4 text-emerald-400" />

                          </div>

                          <span className="text-sm font-medium truncate">

                            {category}

                          </span>

                        </div>

                        <span className="text-sm font-semibold shrink-0">

                          {formatMoney(amount)}

                        </span>

                      </div>

                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-emerald-400 rounded-full"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                      <p className="text-xs text-slate-600 mt-1">

                        {percentage}% of total

                      </p>

                    </div>

                  );

                })}

              </div>

            )}

          </div>

        </section>

        {/* =================================
            RECENT EXPENSES
        ================================= */}

        <section className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden mb-8">

          <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

              <h3 className="text-xl font-bold">

                Recent Transactions

              </h3>

              <p className="text-sm text-slate-500 mt-1">

                Your latest expense records

              </p>

            </div>

            <button
              onClick={() => {
                window.location.href = "/add-expense";
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition"
            >

              <Plus className="w-4 h-4" />

              Add

            </button>

          </div>

          {loadingExpenses ? (

            <div className="p-10 text-center text-slate-500">

              Loading transactions...

            </div>

          ) : expenses.length === 0 ? (

            <div className="p-12 text-center">

              <Receipt className="w-12 h-12 mx-auto text-slate-700 mb-4" />

              <h4 className="font-semibold text-slate-300">

                No expenses yet

              </h4>

              <p className="text-sm text-slate-500 mt-1">

                Start tracking your spending today.

              </p>

              <button
                onClick={() => {
                  window.location.href = "/add-expense";
                }}
                className="mt-5 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold"
              >

                Add Your First Expense

              </button>

            </div>

          ) : (

            <div className="divide-y divide-slate-800">

              {expenses.slice(0, 6).map((expense) => {

                const Icon = getCategoryIcon(
                  expense.category
                );

                return (

                  <div
                    key={expense._id}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition"
                  >

                    <div className="flex items-center gap-4 min-w-0">

                      <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">

                        <Icon className="w-5 h-5 text-emerald-400" />

                      </div>

                      <div className="min-w-0">

                        <h4 className="font-semibold truncate">

                          {expense.description ||
                            expense.category}

                        </h4>

                        <p className="text-sm text-slate-500 truncate">

                          {expense.category} •{" "}

                          {new Date(
                            expense.date
                          ).toLocaleDateString("en-IN")}

                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-2 shrink-0">

                      <span className="font-bold text-emerald-400">

                        {formatMoney(expense.amount)}

                      </span>

                      <ArrowUpRight className="w-4 h-4 text-slate-600 hidden sm:block" />

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </section>

        {/* =================================
            MONTHLY BUDGET
        ================================= */}

        <div className="mb-8">

          <BudgetCard monthlySpent={monthlySpent} />

        </div>

        {/* =================================
            BUDGET CHART
        ================================= */}

        <div className="mb-8">

          <BudgetChart monthlySpent={monthlySpent} />

        </div>

        {/* =================================
            6 MONTH SPENDING TREND
        ================================= */}

        <div className="mb-8">

          <SpendingTrend expenses={expenses} />

        </div>

        {/* =================================
            SPENDING INSIGHTS
        ================================= */}

        <div className="mb-8">

          <SpendingInsights
            expenses={expenses}
            monthlySpent={monthlySpent}
            lastMonthSpent={lastMonthSpent}
          />

        </div>

        {/* =================================
            EXPENSE HISTORY
        ================================= */}

        <div className="mb-8">

          <ExpenseHistory />

        </div>

        {/* =================================
            MONTHLY EXPENSE REPORT
        ================================= */}

        <MonthlyExpenseReport expenses={expenses} />

      </main>

      {/* =====================================
          FOOTER
      ===================================== */}

      <footer className="border-t border-slate-800 py-6 mt-10">

        <p className="text-center text-xs text-slate-600">

          Smart Expense Manager • Personal Finance & Analytics

        </p>

      </footer>

    </div>
  );
}

