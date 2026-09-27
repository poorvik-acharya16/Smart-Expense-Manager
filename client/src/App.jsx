import React, { useEffect, useState } from "react";

import Welcome from "./Welcome";
import Auth from "./Auth";
import AddExpense from "./AddExpense";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Expenses from "./pages/Expenses";

import {
  LayoutDashboard,
  BarChart3,
  Receipt,
  Plus,
  LogOut,
  Wallet,
} from "lucide-react";

const App = () => {
  const [path, setPath] = useState(window.location.pathname);
  const [pageDirection, setPageDirection] = useState("slide-left");

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (newPath) => {
    if (newPath === path) return;

    const pages = [
      "/dashboard",
      "/analytics",
      "/expenses",
    ];

    const currentIndex = pages.indexOf(path);
    const newIndex = pages.indexOf(newPath);

    if (currentIndex !== -1 && newIndex !== -1) {
      setPageDirection(
        newIndex > currentIndex
          ? "slide-left"
          : "slide-right"
      );
    }

    window.history.pushState({}, "", newPath);
    setPath(newPath);

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.history.pushState({}, "", "/");
    setPath("/");
  };

  // HOME
  if (path === "/") {
    return <Welcome />;
  }

  // LOGIN / REGISTER
  if (path === "/auth") {
    return <Auth />;
  }

  // ADD EXPENSE
  if (path === "/add-expense") {
    return <AddExpense />;
  }

  const isAppPage =
    path === "/dashboard" ||
    path === "/analytics" ||
    path === "/expenses";

  if (isAppPage) {
    return (
      <div className="min-h-screen bg-[#061311] text-white">

        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 border-b border-emerald-500/10 bg-[#061311]/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

            {/* LOGO */}
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/10">
                <Wallet className="h-5 w-5 text-[#061311]" />
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-bold tracking-wide text-white">
                  SMARTSPEND
                </p>

                <p className="text-[10px] text-[#8FA8A2]">
                  EXPENSE MANAGER
                </p>
              </div>
            </button>

            {/* NAVIGATION */}
            <div className="flex items-center gap-1 rounded-xl border border-white/5 bg-[#0A1C18] p-1">

              {/* DASHBOARD */}
              <button
                onClick={() => navigate("/dashboard")}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${path === "/dashboard"
                    ? "bg-emerald-500 text-[#061311] shadow-lg shadow-emerald-500/10"
                    : "text-[#8FA8A2] hover:bg-white/5 hover:text-white"
                  }`}
              >
                <LayoutDashboard className="h-4 w-4" />

                <span className="hidden sm:inline">
                  Dashboard
                </span>
              </button>

              {/* ANALYTICS */}
              <button
                onClick={() => navigate("/analytics")}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${path === "/analytics"
                    ? "bg-emerald-500 text-[#061311] shadow-lg shadow-emerald-500/10"
                    : "text-[#8FA8A2] hover:bg-white/5 hover:text-white"
                  }`}
              >
                <BarChart3 className="h-4 w-4" />

                <span className="hidden sm:inline">
                  Analytics
                </span>
              </button>

              {/* EXPENSES */}
              <button
                onClick={() => navigate("/expenses")}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${path === "/expenses"
                    ? "bg-emerald-500 text-[#061311] shadow-lg shadow-emerald-500/10"
                    : "text-[#8FA8A2] hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Receipt className="h-4 w-4" />

                <span className="hidden sm:inline">
                  Expenses
                </span>
              </button>

            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-2">

              {/* ADD EXPENSE */}
              <button
                onClick={() => navigate("/add-expense")}
                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-[#061311] transition hover:bg-emerald-400"
              >
                <Plus className="h-4 w-4" />

                <span className="hidden md:inline">
                  Add Expense
                </span>
              </button>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="rounded-xl border border-white/10 bg-[#0A1C18] p-2.5 text-[#8FA8A2] transition hover:border-red-400/20 hover:text-red-400"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>

            </div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">

          <div
            key={path}
            className={
              pageDirection === "slide-left"
                ? "animate-slide-left"
                : "animate-slide-right"
            }
          >

            {path === "/dashboard" && (
              <Dashboard navigate={navigate} />
            )}

            {path === "/analytics" && (
              <Analytics navigate={navigate} />
            )}

            {path === "/expenses" && (
              <Expenses navigate={navigate} />
            )}

          </div>
        </main>

        {/* SLIDE ANIMATION */}
        <style>{`
          @keyframes slideLeft {
            from {
              opacity: 0;
              transform: translateX(45px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideRight {
            from {
              opacity: 0;
              transform: translateX(-45px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-slide-left {
            animation: slideLeft 0.35s ease-out;
          }

          .animate-slide-right {
            animation: slideRight 0.35s ease-out;
          }
        `}</style>

      </div>
    );
  }

  // UNKNOWN URL
  window.history.replaceState({}, "", "/dashboard");

  return <Dashboard navigate={navigate} />;
};

export default App;