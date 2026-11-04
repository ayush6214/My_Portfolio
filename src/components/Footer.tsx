import React from 'react';
import { ArrowUp, Download, Mail, Phone, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface FooterProps {
  onOpenResume?: () => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume, onReplayIntro }) => {
  const [copiedLink, setCopiedLink] = React.useState(false);

  const scrollToTop = () => {
    sound.playClick(950);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    sound.playClick(900);
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const currentYear = 2026;

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Copyright and identity */}
        <div className="space-y-1 text-center md:text-left">
          <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-center md:justify-start gap-2">
            <span>{PERSONAL_INFO.name}</span>
            <span className="text-zinc-400">·</span>
            <span className="text-xs font-normal text-zinc-500 font-mono-code">Full Stack Developer</span>
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            © {currentYear} Ayush Sarode. Built with Three.js, React, and modern kinetic motion. Nagpur, India.
          </div>
        </div>

        {/* Center: Real external references & PDF trigger */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
          {onOpenResume && (
            <button
              onClick={() => {
                sound.playClick(900);
                onOpenResume();
              }}
              className="text-amber-500 hover:text-amber-400 flex items-center gap-1.5 font-bold"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume (PDF)</span>
            </button>
          )}

          {onReplayIntro && (
            <button
              onClick={() => {
                sound.playClick(800);
                onReplayIntro();
              }}
              className="hover:text-cyan-400 transition-colors"
            >
              Replay Intro
            </button>
          )}

          <button
            onClick={handleShare}
            className={`transition-colors font-medium ${
              copiedLink ? 'text-emerald-400 font-bold' : 'hover:text-amber-400'
            }`}
            title="Copy website link to clipboard"
          >
            {copiedLink ? 'Link Copied! ✓' : 'Share Website'}
          </button>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            onClick={() => sound.playHover()}
            className="hover:text-cyan-400 transition-colors"
          >
            Email
          </a>
          <a
            href={`tel:${PERSONAL_INFO.phone}`}
            onClick={() => sound.playHover()}
            className="hover:text-cyan-400 transition-colors"
          >
            Call / WhatsApp
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playHover()}
            className="hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playHover()}
            className="hover:text-cyan-400 transition-colors"
          >
            LinkedIn
          </a>
        </div>

        {/* Right: Back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs font-mono-code text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
