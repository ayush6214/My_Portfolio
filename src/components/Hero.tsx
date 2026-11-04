import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, FileText, Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThreeCanvasHero } from './ThreeCanvasHero';
import { sound } from '../utils/audio';

interface HeroProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenContact }) => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 dark:bg-cyan-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Split-Screen Hero Grid (12 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          
          {/* Left Column: Typographic Hierarchy & Resume Profile */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Clean unboxed editorial kicker */}
              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium tracking-wider text-amber-500 dark:text-amber-400 uppercase">
                <span>{PERSONAL_INFO.name}</span>
                <span aria-hidden="true" className="text-zinc-400 dark:text-zinc-600">·</span>
                <span>{PERSONAL_INFO.headline}</span>
                <span aria-hidden="true" className="text-zinc-400 dark:text-zinc-600">·</span>
                <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {PERSONAL_INFO.location}
                </span>
              </div>

              {/* Display Headline with text-wrap: balance */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.08] [text-wrap:balance]">
                Building user-centric <span className="text-cyan-500 dark:text-cyan-400">full-stack web solutions</span> with modern code and data rigor.
              </h1>

              {/* Career Objective from PDF */}
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                {PERSONAL_INFO.objective}
              </p>
            </motion.div>

            {/* Interactive Primary CTAs & Resume Triggers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 pt-2"
            >
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    sound.playClick(900);
                    onOpenResume();
                  }}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-950 bg-amber-400 rounded-lg hover:bg-amber-300 active:scale-95 transition-all shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>View & Download Resume (PDF)</span>
                </button>

                <a
                  href="#experience"
                  onClick={() => sound.playClick(850)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-all active:scale-95"
                >
                  <span>Explore Experience</span>
                  <ArrowDownRight className="w-4 h-4 text-cyan-400" />
                </a>
              </div>

              {/* Direct verified contact metadata */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-mono-code pt-1">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
                <span aria-hidden="true" className="text-zinc-400 dark:text-zinc-700">·</span>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Three.js Interactive 3D Canvas */}
          <div className="lg:col-span-5 flex items-stretch">
            <ThreeCanvasHero />
          </div>

        </div>

        {/* Full-Width Claim-to-Proof Metric Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-24 pt-10 border-t border-zinc-200 dark:border-zinc-800/80 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {PERSONAL_INFO.stats.map((stat) => (
            <div
              key={stat.label}
              onMouseEnter={() => sound.playHover()}
              className="space-y-1.5 group cursor-default"
            >
              <div className="text-3xl md:text-4xl font-extrabold font-mono-code tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
