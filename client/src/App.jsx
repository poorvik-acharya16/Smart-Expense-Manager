import ExpenseHistory from "./ExpenseHistory";
import React, { useEffect, useMemo, useState } from "react";
import AddExpense from "./AddExpense";
import Auth from "./Auth";
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

  const isAuthPage = window.location.pathname === "/auth";
  const isAddExpensePage =
    window.location.pathname === "/add-expense";

  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  const user = savedUser ? JSON.parse(savedUser) : null;

  // Check backend health
  const checkHealth = async () => {
    const result = await fetchHealthStatus();
    setHealthState(result);
  };

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      if (!token) {
        setLoadingExpenses(false);
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
      setLoadingExpenses(false);
    }
  };

  useEffect(() => {
    if (isAuthPage || isAddExpensePage) {
      return;
    }

    // Protect dashboard
    if (!token) {
      window.location.href = "/auth";
      return;
    }

    checkHealth();
    fetchExpenses();
  }, [isAuthPage, isAddExpensePage]);

  // Total spending
  const totalSpent = useMemo(() => {
    return expenses.reduce(
      (total, expense) => total + Number(expense.amount || 0),
      0
    );
  }, [expenses]);

  // Current month spending
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
        (total, expense) => total + Number(expense.amount || 0),
        0
      );
  }, [expenses]);

  // Category totals
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

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth";
  };

  if (isAuthPage) {
    return <Auth />;
  }

  if (isAddExpensePage) {
    return <AddExpense />;
  }

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-20 flex items-center justify-between">

            {/* Logo */}
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Wallet className="w-6 h-6 text-slate-950" />
              </div>

              <div>
                <h1 className="text-lg sm:text-xl font-bold">
                  Smart Expense Manager
                </h1>

                <p className="text-xs text-slate-500">
                  Personal Finance Dashboard
                </p>
              </div>

            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">

              <button
                onClick={() => {
                  window.location.href = "/add-expense";
                }}
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition"
              >
                <Plus className="w-4 h-4" />
                Add Expense
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

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* WELCOME */}
        <section className="mb-8">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

            <div>

              <p className="text-emerald-400 text-sm font-semibold mb-2">
                Financial Overview
              </p>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Welcome back, {user?.name || "User"} 👋
              </h2>

              <p className="text-slate-400 mt-2">
                Here's what's happening with your expenses.
              </p>

            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400">
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

        {/* SUMMARY CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

          {/* Total */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-emerald-500/20 to-slate-900 p-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-400">
                  Total Spent
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {formatMoney(totalSpent)}
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <IndianRupee className="text-emerald-400" />
              </div>

            </div>

            <div className="flex items-center gap-1 mt-5 text-sm text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              All recorded expenses
            </div>

          </div>

          {/* Monthly */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-400">
                  This Month
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {formatMoney(monthlySpent)}
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Wallet className="text-blue-400" />
              </div>

            </div>

            <p className="text-sm text-slate-500 mt-5">
              Current month spending
            </p>

          </div>

          {/* Transactions */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-400">
                  Transactions
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {expenses.length}
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Receipt className="text-purple-400" />
              </div>

            </div>

            <p className="text-sm text-slate-500 mt-5">
              Total recorded transactions
            </p>

          </div>

        </section>

        {/* ANALYTICS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Spending Overview */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between mb-6">

              <div>
                <h3 className="text-xl font-bold">
                  Spending Overview
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Your expense activity
                </p>
              </div>

              <TrendingUp className="text-emerald-400" />

            </div>

            <div className="h-48 flex items-end gap-3">

              {[35, 55, 42, 70, 48, 85, 60].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-300 transition-all hover:from-emerald-500 hover:to-emerald-200"
                      style={{ height: `${height}%` }}
                    />

                    <span className="text-xs text-slate-600">
                      {["M", "T", "W", "T", "F", "S", "S"][index]}
                    </span>
                  </div>
                )
              )}

            </div>

            <p className="text-xs text-slate-500 mt-4">
              Weekly spending visualization
            </p>

          </div>

          {/* Category Breakdown */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

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

                      <div className="flex items-center justify-between mb-2">

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-emerald-400" />
                          </div>

                          <span className="text-sm font-medium">
                            {category}
                          </span>

                        </div>

                        <span className="text-sm font-semibold">
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

        {/* RECENT EXPENSES */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">

          <div className="p-6 border-b border-slate-800 flex items-center justify-between">

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
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition"
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
                    className="p-5 flex items-center justify-between hover:bg-slate-800/40 transition"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-emerald-400" />
                      </div>

                      <div>

                        <h4 className="font-semibold">
                          {expense.description ||
                            expense.category}
                        </h4>

                        <p className="text-sm text-slate-500">
                          {expense.category} •{" "}
                          {new Date(
                            expense.date
                          ).toLocaleDateString("en-IN")}
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-3">

                      <span className="font-bold text-emerald-400">
                        {formatMoney(expense.amount)}
                      </span>

                      <ArrowUpRight className="w-4 h-4 text-slate-600" />

                    </div>

                  </div>
                );
              })}

            </div>

          )}

        </section>
        {/* EXPENSE HISTORY */}
        <ExpenseHistory />

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-6 mt-10">

        <p className="text-center text-xs text-slate-600">
          Smart Expense Manager • Personal Finance & Analytics
        </p>

      </footer>

    </div>
  );
}