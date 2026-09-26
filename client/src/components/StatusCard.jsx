import React from 'react';
import { Activity, RefreshCw, CheckCircle2, AlertTriangle, Database, Cpu, Globe, KeyRound, ShieldAlert } from 'lucide-react';

export default function StatusCard({ healthState, isRefreshing, onRefresh }) {
  const isOnline = healthState?.connected;
  const dbData = healthState?.data?.database;
  const isDbConnected = Boolean(dbData?.connected);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Activity className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-white">System Health & API Verification</h2>
              <p className="text-xs text-slate-400">Verifying full-stack connectivity between React client and Express server</p>
            </div>
          </div>
        </div>

        <button
          id="refresh-health-button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Checking...' : 'Recheck Health'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* API Endpoint Card */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Express Backend</span>
            <Globe className="w-4 h-4 text-sky-400" />
          </div>
          <p className="font-mono text-xs text-sky-300 font-semibold truncate">GET /api/health</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px]">
            <span className="text-slate-400">Server:</span>
            {isOnline ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3 h-3" /> Online (200 OK)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-rose-400 font-medium">
                <AlertTriangle className="w-3 h-3" /> Unreachable
              </span>
            )}
          </div>
        </div>

        {/* Latency Card */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Response Latency</span>
            <Cpu className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="font-mono text-xs text-indigo-300 font-semibold">
            {healthState?.latency !== undefined ? `${healthState.latency} ms` : '--'}
          </p>
          <p className="mt-2 text-[11px] text-slate-400">
            Last checked: <span className="text-slate-300">{healthState?.timestamp || 'Never'}</span>
          </p>
        </div>

        {/* Database Layer Card */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">MongoDB Atlas</span>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-mono text-xs text-emerald-300 font-semibold truncate">
            {dbData?.driver || 'Mongoose ODM'}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px]">
            <span className="text-slate-400">Status:</span>
            {isDbConnected ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-2.5 h-2.5" /> Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                <AlertTriangle className="w-2.5 h-2.5" /> Disconnected
              </span>
            )}
          </div>
        </div>
      </div>

      {/* MongoDB Atlas Diagnostics Box (Shown when DB is disconnected) */}
      {!isDbConnected && isOnline && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-3">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5 w-full">
              <h3 className="text-xs font-semibold text-amber-300 uppercase tracking-wide">
                MongoDB Atlas Setup Checklist
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The Express backend is running, but Mongoose cannot connect to MongoDB Atlas. Follow these two quick steps to connect:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>1. Replace &lt;db_password&gt; in server/.env</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Open <code className="text-amber-300">server/.env</code> and replace the literal <code className="text-rose-400">&lt;db_password&gt;</code> placeholder with your actual Atlas database user password (remove the &lt; &gt; brackets).
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-400">
                    <Globe className="w-3.5 h-3.5" />
                    <span>2. Whitelist IP in Atlas Network Access</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    In MongoDB Atlas, go to <strong>Network Access</strong> &rarr; <strong>Add IP Address</strong> &rarr; click <strong>Add Current IP Address</strong> or use <code className="text-sky-300">0.0.0.0/0</code> for development.
                  </p>
                </div>
              </div>

              {dbData?.error && (
                <div className="mt-2 p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/50 text-[11px] font-mono text-rose-300">
                  <span className="font-semibold text-rose-400">Atlas Error: </span>
                  {dbData.error}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* JSON Response View */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
            <span>Server Response Payload (/api/health):</span>
          </label>
          <span className="text-[11px] text-slate-500 font-mono">application/json</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 font-mono text-xs">
          {isOnline ? (
            <pre className="text-emerald-400 overflow-x-auto">
              {JSON.stringify(healthState.data, null, 2)}
            </pre>
          ) : (
            <div className="flex items-center gap-2 text-rose-400 py-1">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Failed to reach backend: {healthState?.error || 'Connection refused'}. Ensure Express server is running on port 5000.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
