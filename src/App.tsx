/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeRibbon } from './components/MarqueeRibbon';
import { SelectedWorks } from './components/SelectedWorks';
import { Skills3DCloud } from './components/Skills3DCloud';
import { InteractiveCodeTerminal } from './components/InteractiveCodeTerminal';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { EntranceLoader } from './components/EntranceLoader';
import { WalkingScrollProgress } from './components/WalkingScrollProgress';
import { ProjectShowcase, FEATURED_PROJECTS } from './data/portfolioData';
import { AnimatePresence, motion } from 'motion/react';
import { sound } from './utils/audio';

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectShowcase | null>(null);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);

  // Sync theme with document.documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Synchronize background ambient audio and sfx with soundEnabled state
  useEffect(() => {
    sound.setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  // Unlock Web Audio context on initial user gesture if enabled
  useEffect(() => {
    const handleFirstGesture = () => {
      if (soundEnabled) {
        sound.startAmbient();
      }
    };
    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [soundEnabled]);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Smooth Entrance Animation Overlay / Loader */}
      <AnimatePresence mode="wait">
        {loading && (
          <EntranceLoader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans relative selection:bg-amber-400 selection:text-zinc-950"
      >
        {/* Spring Physics Interactive Cursor */}
        <CustomCursor />

        {/* 3D Walking Scout & Glowing Progress Rail */}
        <WalkingScrollProgress />

        {/* Top 3-Zone Navigation */}
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          onOpenResume={() => setResumeOpen(true)}
          onOpenContact={scrollToContact}
        />

        {/* Main Content Sections with Scroll-Triggered Entrance Animations */}
        <main className="space-y-4">
          {/* Split Hero with Three.js Real-Time 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Hero
              onOpenResume={() => setResumeOpen(true)}
              onOpenContact={scrollToContact}
            />
          </motion.div>

          {/* Continuous Dynamic Section Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
          >
            <MarqueeRibbon />
          </motion.div>

          {/* Selected Projects, Case Studies, and Deloitte Tableau Simulator */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SelectedWorks onSelectProject={(p) => setSelectedProject(p)} />
          </motion.div>

          {/* Interactive 3D Kinematic Skills Sphere & Proficiencies */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Skills3DCloud />
          </motion.div>

          {/* Interactive Code Execution Lab & Project Stacks */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <InteractiveCodeTerminal />
          </motion.div>

          {/* Verified Experience, Education, and Bootcamps / Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <ExperienceTimeline />
          </motion.div>

          {/* Direct Contact, Nagpur IST Clocks & Inquiries */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <ContactSection onOpenResume={() => setResumeOpen(true)} />
          </motion.div>
        </main>

        {/* Minimal Clean Footer */}
        <Footer
          onOpenResume={() => setResumeOpen(true)}
          onReplayIntro={() => setLoading(true)}
        />

        {/* Official Resume Preview & Download Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />

        {/* Project Deep-Dive Modal */}
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(p) => setSelectedProject(p)}
          allProjects={FEATURED_PROJECTS}
        />
      </motion.div>
    </>
  );
}
