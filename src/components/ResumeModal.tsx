import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink, FileText, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCES, EDUCATION_LIST, CERTIFICATIONS } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClick(600);
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop Scrim */}
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

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl z-10 flex flex-col text-zinc-900 dark:text-zinc-100"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-400 text-zinc-950">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Ayush Sarode — Official Resume
                </h3>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  Full Stack Developer · ETE Engineering
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={PERSONAL_INFO.resumePath}
                download="Ayush_Sarode_Resume.pdf"
                onClick={() => sound.playClick(900)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <button
                onClick={() => {
                  sound.playClick(600);
                  onClose();
                }}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close resume preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Contact Strip */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code">
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>{PERSONAL_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>{PERSONAL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Career Objective */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono-code uppercase tracking-widest text-amber-500 dark:text-amber-400">
                Career Objective
              </h4>
              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {PERSONAL_INFO.objective}
              </p>
            </div>

            {/* Work Experiences from Resume */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono-code uppercase tracking-widest text-amber-500 dark:text-amber-400">
                Work Experience & Internships
              </h4>
              <div className="space-y-4">
                {WORK_EXPERIENCES.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                        {exp.role} · <span className="text-amber-500 dark:text-amber-400">{exp.company}</span>
                      </div>
                      <div className="text-xs font-mono-code tabular-nums text-zinc-500 dark:text-zinc-400">
                        {exp.period} ({exp.location})
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-800 text-[11px] font-mono-code text-zinc-700 dark:text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education from Resume */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono-code uppercase tracking-widest text-amber-500 dark:text-amber-400">
                Education
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EDUCATION_LIST.map((edu) => (
                  <div
                    key={edu.degree}
                    className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-code text-amber-500 tabular-nums">
                        {edu.period}
                      </span>
                      {edu.score && (
                        <span className="text-xs font-mono-code font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                          {edu.score}
                        </span>
                      )}
                    </div>
                    <h5 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {edu.degree}
                    </h5>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {edu.institution}, {edu.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PDF Direct Embed Previewer */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono-code uppercase tracking-widest text-amber-500 dark:text-amber-400">
                  Original PDF Document View
                </h4>
                <a
                  href={PERSONAL_INFO.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono-code text-zinc-500 hover:text-amber-400 flex items-center gap-1"
                >
                  <span>Open Full PDF in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="w-full h-[400px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950">
                <iframe
                  src={PERSONAL_INFO.resumePath}
                  title="Ayush Sarode Resume PDF"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono-code">ESC</kbd> to return
            </span>

            <a
              href={PERSONAL_INFO.resumePath}
              download="Ayush_Sarode_Resume.pdf"
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-amber-500 transition-colors"
            >
              <span>Download Official PDF</span>
              <Download className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
