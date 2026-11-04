import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Code, Database, Cpu, Wrench, Sparkles, Orbit } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { ThreeDCard } from './ThreeDCard';
import { sound } from '../utils/audio';

export const Skills3DCloud: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  // 3D Tag Sphere data
  const tags = [
    { text: 'React', category: 'Frontend', color: '#06b6d4' },
    { text: 'Python', category: 'Backend', color: '#f59e0b' },
    { text: 'Java', category: 'Backend', color: '#ef4444' },
    { text: 'JavaScript', category: 'Frontend', color: '#eab308' },
    { text: 'Data Analytics', category: 'Analytics', color: '#10b981' },
    { text: 'MySQL', category: 'Database', color: '#3b82f6' },
    { text: 'SQLite', category: 'Database', color: '#8b5cf6' },
    { text: 'HTML5', category: 'Frontend', color: '#f97316' },
    { text: 'CSS3', category: 'Frontend', color: '#0ea5e9' },
    { text: 'Tableau', category: 'Analytics', color: '#14b8a6' },
    { text: 'PyQt GUI', category: 'Backend', color: '#a855f7' },
    { text: 'Servlets', category: 'Backend', color: '#f43f5e' },
    { text: 'JSP', category: 'Backend', color: '#6366f1' },
    { text: 'Apache Tomcat', category: 'Tools', color: '#eab308' },
    { text: 'XAMPP', category: 'Tools', color: '#fb923c' },
    { text: 'Eclipse IDE', category: 'Tools', color: '#38bdf8' },
    { text: 'VS Code', category: 'Tools', color: '#2563eb' },
    { text: 'Tailwind CSS', category: 'Frontend', color: '#38bdf8' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 360);

    const radius = Math.min(width, height) * 0.38;

    // Distribute tags evenly on a sphere using Fibonacci spiral
    const count = tags.length;
    const nodes = tags.map((tag, i) => {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      return {
        ...tag,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      };
    });

    let angleX = 0.003;
    let angleY = 0.004;
    let isMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      angleY = dx * 0.0003;
      angleX = -dy * 0.0003;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotate around X and Y axes
      nodes.forEach((node) => {
        // Y rotation
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;

        // X rotation
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        node.x = x1;
        node.y = y2;
        node.z = z2;

        // 3D perspective projection
        const fov = 400;
        const scale = fov / (fov + node.z);
        const projX = node.x * scale + width / 2;
        const projY = node.y * scale + height / 2;
        const alpha = Math.max(0.15, (node.z + radius) / (2 * radius));

        ctx.font = `600 ${Math.max(10, 13 * scale)}px "JetBrains Mono", monospace`;
        ctx.fillStyle = node.color;
        ctx.globalAlpha = alpha;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.text, projX, projY);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <section id="skills" className="py-24 md:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-3">
            <div className="text-xs font-mono-code uppercase tracking-widest text-amber-500 dark:text-amber-400">
              Technical Proficiencies
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Core Skills & Tools
            </h2>
          </div>

          <div className="text-xs font-mono-code text-zinc-500 flex items-center gap-2">
            <Orbit className="w-4 h-4 text-cyan-400" />
            <span>INTERACTIVE 3D SKILL CLUSTER (DRAG TO ROTATE)</span>
          </div>
        </div>

        {/* 3D Sphere & Skill Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 items-center">
          
          {/* Left Column: Interactive 3D Sphere Canvas */}
          <div className="lg:col-span-5 h-[380px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950/80 p-6 flex flex-col items-center justify-between relative overflow-hidden shadow-xl">
            <div className="w-full flex items-center justify-between text-xs font-mono-code text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                3D KINEMATIC SPHERE
              </span>
              <span className="text-zinc-600">18 TECHNOLOGIES</span>
            </div>

            <canvas
              ref={canvasRef}
              className="cursor-grab active:cursor-grabbing w-full h-[300px]"
              title="Click and drag to spin 3D skill sphere"
            />

            <div className="text-[11px] font-mono-code text-zinc-500">
              CLICK & DRAG TO SPIN CLUSTER
            </div>
          </div>

          {/* Right Column: Categorized 3D Tilt Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <ThreeDCard
                key={cat.title}
                intensity={10}
                className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex flex-col justify-between space-y-4 hover:border-amber-400/60 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      {idx === 0 && <Code className="w-4 h-4 text-amber-500" />}
                      {idx === 1 && <Cpu className="w-4 h-4 text-cyan-500" />}
                      {idx === 2 && <Database className="w-4 h-4 text-emerald-500" />}
                      {idx === 3 && <Wrench className="w-4 h-4 text-purple-500" />}
                      <span>{cat.title}</span>
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill.name}
                        onMouseEnter={() => sound.playHover()}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono-code bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 hover:border-amber-400 hover:text-amber-500 transition-colors cursor-default"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/80 text-[11px] font-mono-code text-zinc-500 flex justify-between">
                  <span>PRACTICAL MASTERY</span>
                  <span className="text-amber-500">VERIFIED</span>
                </div>
              </ThreeDCard>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
