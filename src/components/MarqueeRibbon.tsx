import React from 'react';

interface MarqueeRibbonProps {
  text?: string[];
}

export const MarqueeRibbon: React.FC<MarqueeRibbonProps> = ({
  text = [
    'FULL STACK WEB DEVELOPMENT',
    'REACT & MODERN JAVASCRIPT',
    'PYTHON & PYQT DESKTOP SOFTWARE',
    'DELOITTE DATA ANALYTICS & TABLEAU',
    'SQLITE & MYSQL RELATIONAL DATABASES',
    'JAVA SERVOLETS & JSP ARCHITECTURE',
    'ELECTRONICS & TELECOMMUNICATION ENGINEERING',
  ],
}) => {
  return (
    <div className="py-5 border-y border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/60 overflow-hidden select-none">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {[...text, ...text].map((item, idx) => (
          <div key={idx} className="flex items-center mx-6">
            <span className="text-xs md:text-sm font-semibold tracking-widest uppercase font-mono-code text-zinc-500 dark:text-zinc-400 hover:text-cyan-400 transition-colors cursor-default">
              {item}
            </span>
            <span className="ml-12 text-zinc-300 dark:text-zinc-700 font-serif-display text-lg" aria-hidden="true">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
