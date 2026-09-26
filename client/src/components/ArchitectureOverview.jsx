import React from 'react';
import { Layers, Server, Layout, Database, FolderTree } from 'lucide-react';

export default function ArchitectureOverview() {
  const folders = [
    { name: 'server.js', type: 'file', desc: 'Main Express entry point & middleware' },
    { name: 'routes/', type: 'dir', desc: 'Express routers (e.g., health.routes.js)' },
    { name: 'controllers/', type: 'dir', desc: 'Business logic & request handlers' },
    { name: 'models/', type: 'dir', desc: 'Mongoose schemas (User, Expense, Category)' },
    { name: 'middleware/', type: 'dir', desc: 'Error handling & request interception' },
    { name: 'config/', type: 'dir', desc: 'MongoDB connection & environment config' },
  ];

  const modules = [
    {
      title: 'React + Vite Frontend',
      status: 'Ready',
      statusColor: 'emerald',
      desc: 'Blazing fast HMR, modern JSX runtime, and Tailwind CSS responsive design system.',
      icon: Layout,
    },
    {
      title: 'Node.js + Express API',
      status: 'Ready',
      statusColor: 'emerald',
      desc: 'Modular REST API with structured controllers, routes, and centralized error handling.',
      icon: Server,
    },
    {
      title: 'MongoDB + Mongoose',
      status: 'Configured',
      statusColor: 'sky',
      desc: 'ODM connection initialized in config/db.js with graceful fallback.',
      icon: Database,
    },
    {
      title: 'Expense & Budget Logic',
      status: 'Next Phase',
      statusColor: 'amber',
      desc: 'CRUD operations, categorization, transaction history, and monthly totals.',
      icon: Layers,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stack Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((mod, idx) => {
          const Icon = mod.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-xl bg-slate-800/80 text-emerald-400">
                  <Icon className="w-4 h-4" />
                </span>
                <span
                  className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${
                    mod.statusColor === 'emerald'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : mod.statusColor === 'sky'
                      ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {mod.status}
                </span>
              </div>
              <h3 className="font-semibold text-white text-sm">{mod.title}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{mod.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Backend Directory Structure Card */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <FolderTree className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-semibold text-white">Backend Architecture Layout</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {folders.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/60"
            >
              <div className="p-1.5 rounded-lg bg-slate-900 text-slate-300 font-mono text-xs">
                {item.type === 'dir' ? '📁' : '📄'}
              </div>
              <div>
                <p className="font-mono text-xs font-semibold text-emerald-300">{item.name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
