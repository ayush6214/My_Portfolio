import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Volume2, VolumeX, Moon, Sun, Menu, X, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  soundEnabled,
  setSoundEnabled,
  onOpenResume,
  onOpenContact,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const nextState = sound.toggle();
    setSoundEnabled(nextState);
  };

  const handleThemeToggle = () => {
    sound.playClick(920);
    setDarkMode((prev) => !prev);
  };

  const navLinks = [
    { label: 'Projects', href: '#works' },
    { label: 'Experience', href: '#experience' },
    { label: '3D Skills', href: '#skills' },
    { label: 'Code Lab', href: '#terminal' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Main navigation strictly following Top Bar Contract */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-zinc-950/85 dark:bg-zinc-950/85 bg-white/90 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/80 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            onClick={() => sound.playHover()}
            className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 whitespace-nowrap shrink-0 hover:text-cyan-400 transition-colors"
          >
            {PERSONAL_INFO.name}
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick(750)}
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-400 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + utility buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Audio Feedback & Ambient Player Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundEnabled ? 'Mute background ambient & tactile audio' : 'Enable ambient soundtrack & tactile audio'}
              aria-label="Toggle background ambient soundtrack and audio effects"
              className="px-2.5 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-1.5"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span className="flex items-center gap-0.5 h-3 ml-0.5" aria-hidden="true">
                    <span className="w-0.5 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-0.5 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-0.5 h-3.5 bg-cyan-400 rounded-full animate-bounce" />
                  </span>
                </>
              ) : (
                <VolumeX className="w-4 h-4 opacity-60" />
              )}
            </button>

            {/* Dark / Light Mode Switch */}
            <button
              onClick={handleThemeToggle}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Primary Action Button: Resume PDF */}
            <button
              onClick={() => {
                sound.playClick(900);
                onOpenResume();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-950 bg-amber-400 rounded-lg hover:bg-amber-300 active:scale-95 transition-all whitespace-nowrap shrink-0 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => {
                sound.playClick(700);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden px-6 pt-3 pb-6 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800"
          >
            <div className="flex flex-col gap-4 text-base font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    sound.playClick(750);
                    setMobileMenuOpen(false);
                  }}
                  className="text-zinc-700 dark:text-zinc-300 hover:text-cyan-400 py-1"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  sound.playClick(900);
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="mt-2 w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-zinc-950 bg-amber-400 rounded-lg hover:bg-amber-300 flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>View & Download Resume PDF</span>
              </button>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
};
