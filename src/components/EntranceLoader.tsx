import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface EntranceLoaderProps {
  onComplete: () => void;
}

export const EntranceLoader: React.FC<EntranceLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING 3D PBR ENGINE');
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    // Check if user already saw the loader in this session (optional, but keep it snappy)
    const hasLoaded = sessionStorage.getItem('as_portfolio_loaded');

    const duration = 1800; // 1.8s snappy cinematic intro
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + increment + (Math.random() * 2));
        
        if (next < 30) {
          setStatusText('INITIALIZING THREE.JS 3D SCENE');
        } else if (next < 60) {
          setStatusText('COMPILING FULL-STACK REACT ARCHITECTURE');
        } else if (next < 85) {
          setStatusText('CONFIGURING DELOITTE ANALYTICS PIPELINE');
        } else if (next < 100) {
          setStatusText('SYSTEM ONLINE · WELCOME TO AYUSH SARODE');
        }

        if (next >= 100) {
          clearInterval(timer);
          setIsFinishing(true);
          sound.playChime();
          setTimeout(() => {
            sessionStorage.setItem('as_portfolio_loaded', 'true');
            onComplete();
          }, 450);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleSkip = () => {
    sound.playClick(900);
    setIsFinishing(true);
    sound.playChime();
    sessionStorage.setItem('as_portfolio_loaded', 'true');
    setTimeout(() => {
      onComplete();
    }, 200);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 sm:p-12 bg-zinc-950 text-white select-none overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Row */}
      <div className="w-full max-w-5xl flex items-center justify-between text-xs font-mono-code text-zinc-400 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>AYUSH SARODE · PORTFOLIO OS v2.6</span>
        </div>
        <button
          onClick={handleSkip}
          className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Cinematic Typography & Progress Display */}
      <div className="w-full max-w-xl text-center space-y-8 z-10 my-auto">
        {/* Name Wordmark Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2"
        >
          <div className="text-xs font-mono-code uppercase tracking-widest text-amber-400">
            Full Stack Developer & ETE Engineer
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans">
            Ayush Sarode
          </h1>
          <div className="text-xs font-mono-code text-zinc-400 pt-1">
            React · Python · Java · Data Analytics · Three.js
          </div>
        </motion.div>

        {/* Dynamic Percentage Readout */}
        <div className="space-y-4">
          <div className="text-6xl sm:text-7xl font-extrabold font-mono-code tabular-nums tracking-tighter text-zinc-100 flex items-center justify-center">
            <span>{Math.floor(progress).toString().padStart(2, '0')}</span>
            <span className="text-2xl sm:text-3xl font-light text-cyan-400 ml-1">%</span>
          </div>

          {/* Progress Bar with glowing head */}
          <div className="relative w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Dynamic Console Status Ticker */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono-code text-zinc-400 tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{statusText}</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-zinc-500 z-10">
        <div>NAGPUR, MAHARASHTRA, INDIA</div>
        <div className="flex items-center gap-2">
          <span>HARDWARE ACCELERATED WEBGL</span>
          <span>·</span>
          <span>60 FPS</span>
        </div>
      </div>
    </motion.div>
  );
};
