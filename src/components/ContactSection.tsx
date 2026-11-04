import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Copy, Check, Send, Sparkles, MapPin, Clock, Download, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface ContactSectionProps {
  onOpenResume?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [roleType, setRoleType] = useState<string>('Full Stack Web Developer');
  const [istTime, setIstTime] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  // IST Clock for Nagpur, India
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setIstTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    sound.playClick(900);
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const copyPhone = () => {
    sound.playClick(900);
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playChime();
    setSubmitted(true);
  };

  const opportunityTypes = [
    'Full Stack Web Developer',
    'Frontend / React Engineer',
    'Python Developer',
    'Data Analytics / BI',
  ];

  return (
    <section id="contact" className="py-24 md:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Direct Contact & Availability */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="text-xs font-mono-code uppercase tracking-widest text-amber-500 dark:text-amber-400">
                Get In Touch
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                Let&apos;s build dynamic solutions.
              </h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Open to full-time engineering roles, high-impact internships, and collaborative development projects across full stack, React, Python, and data systems.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              {/* Email */}
              <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[11px] font-mono-code text-zinc-400 uppercase">
                    Official Email
                  </div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm sm:text-base font-bold font-mono-code text-zinc-900 dark:text-zinc-100 hover:text-amber-500 transition-colors truncate block"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-amber-500 hover:border-amber-400 transition-all shrink-0"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[11px] font-mono-code text-zinc-400 uppercase">
                    Phone & WhatsApp
                  </div>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-sm sm:text-base font-bold font-mono-code text-zinc-900 dark:text-zinc-100 hover:text-amber-500 transition-colors truncate block"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
                <button
                  onClick={copyPhone}
                  className="p-2.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-amber-500 hover:border-amber-400 transition-all shrink-0"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Location & IST Time Clock */}
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono-code">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>NAGPUR, MAHARASHTRA, INDIA</span>
                </div>
                <div className="text-xl font-bold font-mono-code tabular-nums text-zinc-900 dark:text-zinc-100">
                  {istTime || '14:30:00'} <span className="text-xs font-normal text-zinc-500">IST (UTC+5:30)</span>
                </div>
              </div>

              {onOpenResume && (
                <button
                  onClick={() => {
                    sound.playClick(900);
                    onOpenResume();
                  }}
                  className="px-3 py-2 rounded-xl border border-amber-400/80 bg-amber-400/10 hover:bg-amber-400 hover:text-zinc-950 text-amber-500 text-xs font-mono-code font-bold transition-all flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Message / Hire Inquiries Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm relative overflow-hidden">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-400 text-zinc-950 flex items-center justify-center mx-auto shadow-xl">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                      Message Transmitted!
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                      Thank you for connecting with Ayush Sarode! Your note has been received, and he will get back to you promptly at {formData.email || 'your email'}.
                    </p>
                    <button
                      onClick={() => {
                        sound.playClick(700);
                        setSubmitted(false);
                      }}
                      className="mt-4 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-xs font-mono-code uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                        01. Role / Project Domain
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {opportunityTypes.map((type) => (
                          <button
                            type="button"
                            key={type}
                            onClick={() => {
                              sound.playClick(800);
                              setRoleType(type);
                            }}
                            className={`p-3 text-xs font-medium rounded-xl border text-left transition-all ${
                              roleType === type
                                ? 'bg-amber-400/10 border-amber-400 text-zinc-900 dark:text-zinc-100 font-semibold'
                                : 'bg-zinc-50 dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono-code text-zinc-500 dark:text-zinc-400 mb-1.5">
                          YOUR NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Hiring Manager / Founder"
                          className="w-full px-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono-code text-zinc-500 dark:text-zinc-400 mb-1.5">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="contact@company.com"
                          className="w-full px-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code text-zinc-500 dark:text-zinc-400 mb-1.5">
                        MESSAGE / OPPORTUNITY DETAILS
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell Ayush about your engineering team, project goals, or open position..."
                        className="w-full px-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all"
                    >
                      <span>Send Message to Ayush</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
