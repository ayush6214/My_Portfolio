import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Eye, Code, Database, BarChart2 } from 'lucide-react';
import { ProjectShowcase, FEATURED_PROJECTS } from '../data/portfolioData';
import { ThreeDCard } from './ThreeDCard';
import { DeloitteDashboardSimulator } from './DeloitteDashboardSimulator';
import { sound } from '../utils/audio';

interface SelectedWorksProps {
  onSelectProject: (project: ProjectShowcase) => void;
}

type CategoryFilter = 'All' | 'Full Stack' | 'Data Analytics' | 'Python & GUI' | 'Java & Enterprise';

export const SelectedWorks: React.FC<SelectedWorksProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<CategoryFilter>('All');
  const [showDeloitteSimulator, setShowDeloitteSimulator] = useState<boolean>(true);

  const categories: CategoryFilter[] = [
    'All',
    'Full Stack',
    'Data Analytics',
    'Python & GUI',
    'Java & Enterprise',
  ];

  const filtered = filter === 'All'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="works" className="py-24 md:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-3">
            <div className="text-xs font-mono-code uppercase tracking-widest text-amber-500 dark:text-amber-400">
              Applied Engineering & Simulations
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Featured Projects
            </h2>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick(850);
                  setFilter(cat);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filter === cat
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Bento Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {filtered.map((proj) => (
            <ThreeDCard
              key={proj.id}
              intensity={8}
              onClick={() => {
                sound.playClick(920);
                onSelectProject(proj);
              }}
              className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/60 flex flex-col justify-between space-y-6 hover:border-amber-400/80 cursor-pointer group"
            >
              <div className="space-y-4">
                {/* Header metadata unboxed */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{proj.associatedWith}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-code tabular-nums">{proj.period}</span>
                  </div>
                  <span className="text-xs font-mono-code text-amber-500 font-bold">
                    {proj.category}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>{proj.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 ml-2" />
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                  {proj.summary}
                </p>
              </div>

              {/* Metrics Pill Row */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-zinc-200 dark:border-zinc-800/80">
                {proj.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="text-sm font-extrabold font-mono-code tabular-nums text-zinc-900 dark:text-zinc-100">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-zinc-500 truncate">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack and Quick Inspect */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500 group-hover:underline">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Details</span>
                </span>
              </div>
            </ThreeDCard>
          ))}
        </div>

        {/* Live Deloitte Tableau Forensic Simulation Spotlight */}
        <div className="mt-16 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono-code uppercase tracking-widest text-emerald-500">
                Live Interactive Simulation
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                Deloitte Forensic Tableau Dashboard in Action
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playClick(750);
                setShowDeloitteSimulator(!showDeloitteSimulator);
              }}
              className="text-xs font-mono-code text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline"
            >
              {showDeloitteSimulator ? 'Collapse Simulation' : 'Expand Simulation'}
            </button>
          </div>

          {showDeloitteSimulator && <DeloitteDashboardSimulator />}
        </div>
      </div>
    </section>
  );
};
