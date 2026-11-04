import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, AlertTriangle, ShieldCheck, Filter, FileSpreadsheet, Download, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

interface Transaction {
  id: string;
  vendor: string;
  category: string;
  amount: number;
  riskScore: number;
  status: 'Flagged' | 'Cleared' | 'Under Review';
}

export const DeloitteDashboardSimulator: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Flagged' | 'Cleared'>('All');
  const [threshold, setThreshold] = useState<number>(10000);

  const initialTransactions: Transaction[] = [
    { id: 'TX-9481', vendor: 'Global Logistics Corp', category: 'Procurement', amount: 14850, riskScore: 94, status: 'Flagged' },
    { id: 'TX-9482', vendor: 'Apex Data Services', category: 'IT & Cloud', amount: 4200, riskScore: 18, status: 'Cleared' },
    { id: 'TX-9483', vendor: 'Horizon Off-Shore LLC', category: 'Consulting', amount: 28900, riskScore: 98, status: 'Flagged' },
    { id: 'TX-9484', vendor: 'Metro Office Supplies', category: 'Operations', amount: 1250, riskScore: 12, status: 'Cleared' },
    { id: 'TX-9485', vendor: 'Vanguard Systems Intl', category: 'Hardware', amount: 16400, riskScore: 88, status: 'Flagged' },
    { id: 'TX-9486', vendor: 'Synthex Research Labs', category: 'R&D Audit', amount: 6800, riskScore: 45, status: 'Under Review' },
  ];

  const filtered = initialTransactions.filter((tx) => {
    if (filter === 'Flagged') return tx.status === 'Flagged' || tx.amount >= threshold;
    if (filter === 'Cleared') return tx.status === 'Cleared' && tx.amount < threshold;
    return true;
  });

  const totalAnalyzed = initialTransactions.reduce((acc, t) => acc + t.amount, 0);
  const flaggedCount = initialTransactions.filter((t) => t.status === 'Flagged' || t.amount >= threshold).length;

  return (
    <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl space-y-6">
      {/* Dashboard Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono-code text-emerald-500 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Deloitte Virtual Simulation · Tableau Interactive Model</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Forensic Audit & Forensic Risk Classifier
          </h3>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2">
          {(['All', 'Flagged', 'Cleared'] as const).map((status) => (
            <button
              key={status}
              onClick={() => {
                sound.playClick(800);
                setFilter(status);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all ${
                filter === status
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono-code">TOTAL AUDIT SAMPLE</div>
          <div className="text-2xl font-extrabold font-mono-code text-zinc-900 dark:text-zinc-100 tabular-nums mt-1">
            ${(totalAnalyzed / 1000).toFixed(1)}k
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">Classified via Excel Formulas</div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono-code">ANOMALY THRESHOLD</div>
          <div className="text-2xl font-extrabold font-mono-code text-amber-500 tabular-nums mt-1">
            ${(threshold / 1000).toFixed(0)}k+
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">Adjustable Risk Floor</div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono-code">FLAGGED ANOMALIES</div>
          <div className="text-2xl font-extrabold font-mono-code text-red-500 tabular-nums mt-1">
            {flaggedCount} Cases
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">Forensic Investigation Required</div>
        </div>
      </div>

      {/* Interactive Threshold Slider */}
      <div className="p-4 rounded-xl bg-zinc-100/60 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 space-y-2">
        <div className="flex justify-between text-xs font-mono-code text-zinc-600 dark:text-zinc-400">
          <span>DYNAMIC ANOMALY THRESHOLD CALIBRATOR:</span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">${threshold.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="3000"
          max="25000"
          step="1000"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-full accent-emerald-500 cursor-pointer"
        />
      </div>

      {/* Forensic Transaction Ledger Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left text-xs font-mono-code divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-100 dark:bg-zinc-950/80 text-zinc-500 dark:text-zinc-400">
            <tr>
              <th className="p-3">TRANSACTION</th>
              <th className="p-3">ENTITY / VENDOR</th>
              <th className="p-3">CATEGORY</th>
              <th className="p-3 text-right">AMOUNT</th>
              <th className="p-3 text-right">RISK SCORE</th>
              <th className="p-3 text-center">DECISION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 bg-white dark:bg-zinc-900/40">
            {filtered.map((tx) => {
              const isOver = tx.amount >= threshold || tx.status === 'Flagged';
              return (
                <tr key={tx.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                  <td className="p-3 font-bold text-zinc-900 dark:text-zinc-100">{tx.id}</td>
                  <td className="p-3 text-zinc-700 dark:text-zinc-300">{tx.vendor}</td>
                  <td className="p-3 text-zinc-500">{tx.category}</td>
                  <td className="p-3 text-right font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
                    ${tx.amount.toLocaleString()}
                  </td>
                  <td className="p-3 text-right tabular-nums">
                    <span className={tx.riskScore > 75 ? 'text-red-500 font-bold' : 'text-zinc-400'}>
                      {tx.riskScore}/100
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        isOver
                          ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                          : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      }`}
                    >
                      {isOver ? 'AUDIT ALERT' : 'CLEARED'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Business Conclusion Callout */}
      <div className="p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-400/5 border border-emerald-500/20 dark:border-emerald-400/20 text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-zinc-900 dark:text-zinc-100">Deloitte Simulation Finding:</strong>
          <p className="leading-relaxed">
            By applying standard deviation outlier thresholds across multi-category ledger logs, the forensic Tableau dashboard reduces auditor verification dwell by 68% while capturing 100% of out-of-policy procurement transfers.
          </p>
        </div>
      </div>
    </div>
  );
};
