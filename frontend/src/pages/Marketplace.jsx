import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Brain, Cloud, Sparkles, Globe, Terminal, Code2, BarChart3, Palette, Megaphone, ShieldCheck, CheckCircle2, Layers } from 'lucide-react';
import AuroraBackground from '../components/effects/AuroraBackground';
import TiltCard from '../components/effects/TiltCard';

const icons = {
  webdev: Globe,
  python: Terminal,
  java: Code2,
  fullstack: Layers,
  data: BarChart3,
  ai: Brain,
  uiux: Palette,
  cyber: ShieldCheck,
  marketing: Megaphone,
  cloud: Cloud
};

const LOCAL_TRACKS = [
  { id: "webdev", name: "Web Development", color: "#00E5FF", desc: "Build modern responsive websites and web applications." },
  { id: "python", name: "Python Development", color: "#3776AB", desc: "Master Python programming for automation, scripting, and backend development." },
  { id: "java", name: "Java Development", color: "#F89820", desc: "Build scalable enterprise backend systems using Java and Spring Boot." },
  { id: "fullstack", name: "Full Stack Development", color: "#7C3AED", desc: "Ship full-stack applications end-to-end with modern frameworks." },
  { id: "data", name: "Data Analytics", color: "#00FFA3", desc: "Analyze data, perform statistical tests, and build interactive dashboards." },
  { id: "ai", name: "Artificial Intelligence", color: "#EC4899", desc: "Build production machine learning and AI models with real-world datasets." },
  { id: "uiux", name: "UI/UX Design", color: "#F472B6", desc: "Design premium, highly interactive user experiences and interfaces." },
  { id: "cyber", name: "Cyber Security", color: "#EF4444", desc: "Secure modern networks, perform pen testing, and conduct security audits." },
  { id: "marketing", name: "Digital Marketing", color: "#10B981", desc: "Drive growth and brand engagement through modern digital strategies." },
  { id: "cloud", name: "Cloud & DevOps", color: "#FBBF24", desc: "Deploy and orchestrate highly available infrastructure and pipelines on cloud." }
];

const Marketplace = () => {
  const [q, setQ] = useState('');

  const filteredTracks = useMemo(() => {
    return LOCAL_TRACKS.filter((t) =>
      q.trim() === '' ||
      t.name.toLowerCase().includes(q.toLowerCase()) ||
      t.desc.toLowerCase().includes(q.toLowerCase())
    );
  }, [q]);

  return (
    <main className="relative pt-28 pb-20 min-h-screen overflow-hidden">
      <AuroraBackground />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80 font-mono">Industry Tracks</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Choose a track. <span className="zv-gradient-text">Build your career.</span></h1>
          <p className="text-white/60 mt-3">Select from our 10 professional, project-based learning tracks with mentor review and verifiable industry credentials.</p>
        </motion.div>

        <div className="mt-8 zv-glass rounded-2xl p-3 flex items-center gap-2 max-w-xl">
          <Search size={16} className="text-white/45 ml-2" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tracks..." className="flex-1 bg-transparent outline-none text-sm placeholder-white/35 text-white" />
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((t, i) => {
            const Icon = icons[t.id] || Sparkles;
            return (
              <motion.div key={t.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.04 }}>
                <TiltCard className="zv-card p-6 h-full flex flex-col justify-between relative group overflow-hidden">
                  <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-all duration-300" style={{ background: `radial-gradient(circle at top right, ${t.color}, transparent 60%)` }} />
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl grid place-items-center" style={{ background: `${t.color}22`, boxShadow: `0 0 20px ${t.color}22` }}>
                        <Icon size={20} style={{ color: t.color }} />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Track</span>
                    </div>
                    <h2 className="mt-5 font-display text-xl font-semibold text-white/90 group-hover:text-cyan-300 transition-colors duration-300">{t.name}</h2>
                    <p className="text-sm text-white/55 mt-2 leading-relaxed">{t.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-white/45">
                    <CheckCircle2 size={12} className="text-emerald-400" />
                    <span>Industry-ready</span>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
        {filteredTracks.length === 0 && (
          <div className="mt-16 text-center text-white/50">No tracks match your search filters.</div>
        )}
      </div>
    </main>
  );
};

export default Marketplace;
