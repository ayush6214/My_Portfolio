import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, GraduationCap, Award, Briefcase, CheckCircle2, Building, Calendar, MapPin } from 'lucide-react';
import { WORK_EXPERIENCES, EDUCATION_LIST, CERTIFICATIONS } from '../data/portfolioData';
import { ThreeDCard } from './ThreeDCard';
import { sound } from '../utils/audio';

export const ExperienceTimeline: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'certifications'>('experience');

  const toggleExpand = (idx: number) => {
    sound.playClick(780);
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="experience" className="py-24 md:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-3">
            <div className="text-xs font-mono-code uppercase tracking-widest text-amber-500 dark:text-amber-400">
              Verified Qualifications
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Experience & Education
            </h2>
          </div>

          {/* Segmented Controls for Tab Switching */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            {[
              { id: 'experience', label: 'Work Experience', count: WORK_EXPERIENCES.length },
              { id: 'education', label: 'Education', count: EDUCATION_LIST.length },
              { id: 'certifications', label: 'Certifications', count: CERTIFICATIONS.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick(850);
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-1.5 opacity-60 font-mono-code text-[11px]">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="mt-12">
          {/* Tab 1: Work Experience & Internships */}
          {activeTab === 'experience' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-4">
                {WORK_EXPERIENCES.map((exp, idx) => {
                  const isOpen = expandedIndex === idx;
                  return (
                    <ThreeDCard
                      key={exp.id}
                      intensity={6}
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isOpen
                          ? 'border-zinc-400 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/70 shadow-md'
                          : 'border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/40 hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <button
                        onClick={() => toggleExpand(idx)}
                        className="w-full p-6 text-left flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                            <span className="font-mono-code tabular-nums font-semibold text-zinc-800 dark:text-zinc-200">
                              {exp.period}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{exp.location}</span>
                            <span aria-hidden="true">·</span>
                            <span className="text-amber-500 font-mono-code font-bold">
                              {exp.badge}
                            </span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                            {exp.role} <span className="text-amber-500 dark:text-amber-400 font-normal">@ {exp.company}</span>
                          </h3>
                        </div>

                        <div className={`p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="px-6 pb-6 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 space-y-4">
                              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {exp.description}
                              </p>

                              <div className="space-y-2 pt-2">
                                <h4 className="text-xs uppercase tracking-wider font-mono-code text-zinc-400 dark:text-zinc-500">
                                  Scope of Work & Technologies
                                </h4>
                                <ul className="space-y-2">
                                  {exp.responsibilities.map((r, i) => (
                                    <li key={i} className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2.5">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                      <span>{r}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="pt-3 flex flex-wrap gap-2">
                                {exp.techStack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="text-[11px] font-mono-code text-zinc-700 dark:text-zinc-300 bg-zinc-200/60 dark:bg-zinc-800 px-2.5 py-1 rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </ThreeDCard>
                  );
                })}
              </div>

              {/* Sidebar: Key Internship Takeaways */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 space-y-4">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-amber-500" />
                    <span>Internship Milestones</span>
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Ayush has accumulated practical industry experience across both software backends (Python, SQLite, Java, MySQL) and responsive user-centric frontends (React, HTML5, CSS3).
                  </p>
                  <div className="space-y-3 pt-2">
                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80">
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Internshala Capstone</div>
                      <div className="text-[11px] text-emerald-500 font-mono-code">Scored 83% Marks in Assessment</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80">
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Plasmid Web Platform</div>
                      <div className="text-[11px] text-cyan-500 font-mono-code">Modern React & State Management</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80">
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">IT-NetworkZ Infosystems</div>
                      <div className="text-[11px] text-amber-500 font-mono-code">Tomcat 10, Servlets & MySQL DB</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Education */}
          {activeTab === 'education' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {EDUCATION_LIST.map((edu) => (
                <ThreeDCard
                  key={edu.degree}
                  intensity={10}
                  className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono-code text-zinc-500 tabular-nums">
                          {edu.period}
                        </span>
                        {edu.score && (
                          <span className="text-xs font-mono-code font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                            {edu.score}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                        {edu.degree}
                      </h3>
                      <div className="text-xs font-medium text-amber-500 dark:text-amber-400 mt-1">
                        {edu.institution} · {edu.location}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                    <div className="text-xs font-mono-code uppercase text-zinc-400">
                      Core Academic Focus Areas
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.courses.map((c) => (
                        <span
                          key={c}
                          className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </ThreeDCard>
              ))}
            </div>
          )}

          {/* Tab 3: Trainings / Certifications */}
          {activeTab === 'certifications' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CERTIFICATIONS.map((cert) => (
                <ThreeDCard
                  key={cert.title}
                  intensity={10}
                  className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono-code">
                      <span className="text-amber-500 font-semibold">{cert.issuer}</span>
                      <span className="text-zinc-500 tabular-nums">{cert.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {cert.title}
                    </h3>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {cert.description}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      {cert.highlights.map((h, i) => (
                        <div key={i} className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-1.5">
                    {cert.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </ThreeDCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
