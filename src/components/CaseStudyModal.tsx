import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Check, Code, Layers, FileCode } from 'lucide-react';
import { ProjectShowcase } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface CaseStudyModalProps {
  project: ProjectShowcase | null;
  onClose: () => void;
  onSelectProject: (p: ProjectShowcase) => void;
  allProjects: ProjectShowcase[];
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'learnings'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClick(600);
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClick(600);
            onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl z-10 flex flex-col text-zinc-900 dark:text-zinc-100"
        >
          {/* Top Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">{project.associatedWith}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-500 font-bold">{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-code tabular-nums">{project.period}</span>
            </div>

            <button
              onClick={() => {
                sound.playClick(600);
                onClose();
              }}
              aria-label="Close modal"
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Header Banner */}
          <div className="p-6 sm:p-8 bg-zinc-950 text-white border-b border-zinc-800 space-y-3">
            <span className="px-2.5 py-1 rounded bg-amber-400/20 text-amber-400 text-xs font-mono-code uppercase tracking-wider">
              {project.category} Project Showcase
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl">
              {project.subtitle}
            </p>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-3 divide-x divide-zinc-200 dark:divide-zinc-800 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
            {project.metrics.map((m) => (
              <div key={m.label} className="p-4 sm:p-6 text-center space-y-1">
                <div className="text-xl sm:text-3xl font-extrabold font-mono-code tabular-nums text-zinc-900 dark:text-zinc-100">
                  {m.value}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Tab navigation */}
            <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-lg w-fit">
              <button
                onClick={() => {
                  sound.playClick(800);
                  setActiveTab('overview');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                Project Overview
              </button>
              {project.codeSnippet && (
                <button
                  onClick={() => {
                    sound.playClick(800);
                    setActiveTab('code');
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    activeTab === 'code'
                      ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  Code Implementation
                </button>
              )}
              <button
                onClick={() => {
                  sound.playClick(800);
                  setActiveTab('learnings');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'learnings'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                Key Takeaways
              </button>
            </div>

            {/* Active Tab Panel */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-mono-code text-zinc-400 dark:text-zinc-500 mb-2">
                    Executive Summary
                  </h4>
                  <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {project.overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-mono-code text-zinc-400 dark:text-zinc-500 mb-3">
                      Core Deliverables
                    </h4>
                    <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                      {project.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-mono-code text-zinc-400 dark:text-zinc-500 mb-3">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono-code px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800/80 rounded border border-zinc-200/60 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'code' && project.codeSnippet && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-widest font-mono-code text-zinc-400 dark:text-zinc-500">
                    Source: {project.codeSnippet.filename}
                  </h4>
                  <span className="text-xs font-mono-code text-amber-500 uppercase">
                    {project.codeSnippet.language}
                  </span>
                </div>
                <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 overflow-x-auto text-xs font-mono-code text-zinc-300">
                  <pre>
                    <code>{project.codeSnippet.code}</code>
                  </pre>
                </div>
              </motion.div>
            )}

            {activeTab === 'learnings' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h4 className="text-xs uppercase tracking-widest font-mono-code text-zinc-400 dark:text-zinc-500">
                  Technical Learnings & Competencies Developed
                </h4>
                <div className="space-y-3">
                  {project.keyLearnings.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 flex items-start gap-4"
                    >
                      <span className="font-mono-code text-sm font-bold text-amber-500 shrink-0">
                        0{idx + 1}.
                      </span>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono-code">ESC</kbd> to return
            </span>

            <button
              onClick={() => {
                sound.playClick(900);
                onSelectProject(nextProject);
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
