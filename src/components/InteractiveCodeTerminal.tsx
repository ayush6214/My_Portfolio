import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Play, CheckCircle2, Copy, Check, RotateCcw, Sparkles } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const InteractiveCodeTerminal: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [outputLogs, setOutputLogs] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const project = FEATURED_PROJECTS[selectedIdx];

  const executionSimulations: Record<string, string[]> = {
    'deloitte-analytics': [
      '[Deloitte Forensic Engine v2.4] Initializing data ingestion pipeline...',
      'Loaded 25,000 ledger transactions from forensic audit repository.',
      'Computing Z-score distribution across amount and velocity vectors...',
      'Statistical threshold calibrated: μ + 2.5σ = $14,850.00',
      'ALERT: 42 transactions flagged exceeding threshold.',
      'Tableau export package generated: /exports/forensic_risk_summary.twbx',
      'STATUS: Verification complete. Risk mitigation brief delivered.'
    ],
    'plasmid-react-app': [
      '[Vite v6.1] Building Plasmid responsive component tree...',
      'Optimized 18 modular components with zero runtime warnings.',
      'Tailwind CSS v4 JIT compilation completed in 42ms.',
      'Accessibility audit: 100% WCAG 2.1 AA compliant.',
      'Lighthouse simulated score: 98/100 (Performance), 100/100 (Accessibility).',
      'STATUS: Production bundle ready for client deployment.'
    ],
    'internshala-python-gui': [
      '[Python 3.11 Runtime] Launching PyQt Desktop GUI...',
      'Connecting to SQLite database: /data/internshala_records.db',
      'Schema verified: Table [records] indexed with primary key [id].',
      'CRUD transaction benchmark: 1,000 INSERT operations in 4.2ms.',
      'PyQt main event loop running at 60 FPS.',
      'Final Assessment Evaluation Grade: 83% Marks (Passed with Honors).'
    ],
    'it-networkz-java-servlet': [
      '[Apache Tomcat 10.1] Starting Servlet Context [/portal]...',
      'Loading JDBC MySQL driver: com.mysql.cj.jdbc.Driver',
      'Connected to MySQL database on localhost:3306 via XAMPP.',
      'Servlet [UserAuthServlet] mapped to endpoint /auth/login',
      'JSP engine precompiled dashboard.jsp with zero syntax errors.',
      'STATUS: HTTP 200 OK. Ready to process enterprise sessions.'
    ]
  };

  const runCode = () => {
    sound.playClick(900);
    setIsRunning(true);
    setOutputLogs(['[Starting execution...]']);

    const logs = executionSimulations[project.id] || ['Execution successful.'];
    let currentLogIndex = 0;

    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setOutputLogs((prev) => [...prev, logs[currentLogIndex]]);
        sound.playClick(400 + currentLogIndex * 60);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        sound.playChime();
      }
    }, 280);
  };

  const copyCode = () => {
    if (!project.codeSnippet) return;
    sound.playClick(900);
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-950/70 border-y border-zinc-200 dark:border-zinc-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-3">
            <div className="text-xs font-mono-code uppercase tracking-widest text-amber-500 dark:text-amber-400">
              Interactive Execution Lab
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Code & Engineering Stacks
            </h2>
          </div>

          {/* Project selector buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-zinc-200/60 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            {FEATURED_PROJECTS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  sound.playClick(820);
                  setSelectedIdx(idx);
                  setOutputLogs([]);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedIdx === idx
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {p.category}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Container */}
        <div className="mt-12 rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Code Editor */}
          <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-between">
            {/* Editor Top Bar */}
            <div className="flex items-center justify-between px-6 py-3.5 bg-zinc-900/90 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs font-mono-code text-zinc-400">
                  {project.codeSnippet?.filename || 'snippet.ts'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyCode}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono-code flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="px-3 py-1 rounded bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-zinc-950 text-xs font-mono-code font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunning ? 'Executing...' : 'Run Code'}</span>
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-6 overflow-x-auto text-xs font-mono-code text-zinc-300 leading-relaxed font-normal min-h-[280px]">
              <pre className="whitespace-pre">
                <code>{project.codeSnippet?.code}</code>
              </pre>
            </div>

            {/* Context Footer */}
            <div className="px-6 py-3 bg-zinc-900/40 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono-code text-zinc-500">
              <span>ASSOCIATED WITH: {project.associatedWith}</span>
              <span className="text-amber-400">{project.techStack.slice(0, 3).join(' · ')}</span>
            </div>
          </div>

          {/* Right Column: Simulated Terminal Execution Console */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-black/90 p-6 space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 text-xs font-mono-code text-zinc-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>LIVE CONSOLE OUTPUT</span>
                </div>
                {outputLogs.length > 0 && (
                  <button
                    onClick={() => setOutputLogs([])}
                    className="text-zinc-500 hover:text-zinc-300"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="mt-4 space-y-2 font-mono-code text-xs text-zinc-300 min-h-[220px]">
                {outputLogs.length === 0 ? (
                  <div className="text-zinc-600 flex flex-col items-center justify-center pt-16 space-y-2">
                    <Sparkles className="w-6 h-6 text-zinc-700" />
                    <span>Click &quot;Run Code&quot; to compile and simulate execution</span>
                  </div>
                ) : (
                  outputLogs.map((log, i) => (
                    <div
                      key={i}
                      className={
                        log.includes('ALERT')
                          ? 'text-amber-400'
                          : log.includes('STATUS') || log.includes('Passed')
                          ? 'text-emerald-400 font-bold'
                          : 'text-zinc-400'
                      }
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Project Metrics Summary */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-800/80">
              {project.metrics.map((m) => (
                <div key={m.label} className="p-2 rounded bg-zinc-900/60 text-center">
                  <div className="text-sm font-bold font-mono-code text-white tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-[10px] text-zinc-500 truncate">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
