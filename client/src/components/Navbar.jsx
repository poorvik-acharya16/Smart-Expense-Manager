import React from 'react';
import { Wallet, Server } from 'lucide-react';

export default function Navbar({ healthState }) {
  const isOnline = healthState?.connected;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Wallet className="w-5 h-5 text-slate-950 font-bold" />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              Smart Expense Manager
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                MERN Stack
              </span>
            </h1>

            <p className="text-xs text-slate-400">
              Personal Finance & Analytics Platform
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3">

          {/* Login / Register Button */}
          <a
            href="/auth"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition"
          >
            Login / Register
          </a>

          {/* Live Backend Connection Indicator */}
          <div
            id="backend-status-pill"
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${isOnline
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              }`}
          >
            <span className="relative flex h-2 w-2">
              {isOnline && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}

              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${isOnline ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
              ></span>
            </span>

            <span className="hidden lg:inline">Backend API:</span>
            <span>
              {isOnline ? 'Online (Port 5000)' : 'Offline / Connecting'}
            </span>
          </div>

          {/* Health API */}
          <a
            href="http://localhost:5000/api/health"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition"
          >
            <Server className="w-3.5 h-3.5 text-slate-400" />
            <span>/api/health</span>
          </a>

        </div>
      </div>
    </header>
  );
}