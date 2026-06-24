import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Search, SlidersHorizontal, Clock, Layers, Star, ArrowUpRight, Brain, Database, Lock, Cloud, Sparkles, Globe, Terminal, Code2, BarChart3, Palette, Megaphone } from 'lucide-react';
import AuroraBackground from '../components/effects/AuroraBackground';
import TiltCard from '../components/effects/TiltCard';
import { LoadingBlock, ErrorBlock } from '../components/common/ApiStatus';
import { getProjects, getTracks, getApiErrorMessage } from '../services/api';

const icons = {
  webdev: Globe,
  python: Terminal,
  java: Code2,
  fullstack: Layers,
  data: BarChart3,
  ai: Brain,
  uiux: Palette,
  cyber: Lock,
  marketing: Megaphone,
  cloud: Cloud
};

const HEADER_MOTION = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };
const CARD_MOTION = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

const Marketplace = () => {
  const [q, setQ] = useState('');
  const [track, setTrack] = useState('all');
  const [diff, setDiff] = useState('all');

  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects().then((r) => r.data),
    retry: 1,
  });
  const tracksQuery = useQuery({
    queryKey: ['tracks'],
    queryFn: () => getTracks().then((r) => r.data),
    retry: 1,
  });

  const filtered = useMemo(() => {
    const projects = projectsQuery.data || [];
    return projects.filter((p) =>
      (track === 'all' || p.track === track) &&
      (diff === 'all' || p.difficulty === diff) &&
      (q.trim() === '' || p.title.toLowerCase().includes(q.toLowerCase()) || (p.skills || []).join(' ').toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, track, diff, projectsQuery.data]);

  const allTracks = tracksQuery.data || [];
  const isLoading = projectsQuery.isLoading || tracksQuery.isLoading;
  const isError = projectsQuery.isError || tracksQuery.isError;

  return (
    <main className="relative pt-28 pb-20 min-h-screen overflow-hidden">
      <AuroraBackground />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div {...HEADER_MOTION} className="max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80 font-mono">Project Showcase</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Pick a project. <span className="zv-gradient-text">Start building.</span></h1>
          <p className="text-white/60 mt-3">Industry-aligned projects with weekly reviews, rubric-based grading, and verifiable credentials.</p>
        </motion.div>

        <div className="mt-8 zv-glass rounded-2xl p-3 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus-within:border-cyan-400/50">
            <Search size={16} className="text-white/45" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects, skills, tools..." className="flex-1 bg-transparent outline-none text-sm placeholder-white/35" />
          </div>
          <div className="flex gap-2">
            <select value={track} onChange={(e) => setTrack(e.target.value)} className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm focus:outline-none focus:border-cyan-400/50">
              <option value="all">All Tracks</option>
              {allTracks.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <select value={diff} onChange={(e) => setDiff(e.target.value)} className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm focus:outline-none focus:border-cyan-400/50">
              <option value="all">All Levels</option>
              <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
            </select>
            <button type="button" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm hover:border-cyan-400/50"><SlidersHorizontal size={14} /> Filters</button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Chip active={track === 'all'} onClick={() => setTrack('all')} label="All" color="#00E5FF" />
          {allTracks.map((t) => (
            <Chip key={t.id} active={track === t.id} onClick={() => setTrack(t.id)} label={t.name} color={t.color} />
          ))}
        </div>

        {isLoading && <LoadingBlock label="Loading projects…" />}

        {isError && (
          <ErrorBlock
            message={getApiErrorMessage(projectsQuery.error || tracksQuery.error, 'Failed to load projects.')}
            onRetry={() => {
              projectsQuery.refetch();
              tracksQuery.refetch();
            }}
          />
        )}

        {!isLoading && !isError && (
          <>
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p, i) => {
                const t = allTracks.find((x) => x.id === p.track);
                const Icon = icons[p.track] || Sparkles;
                return (
                  <motion.div key={p.id} {...CARD_MOTION} transition={{ duration: 0.45, delay: i * 0.04 }}>
                    <TiltCard className="zv-card overflow-hidden h-full group">
                      <div className="relative h-44 overflow-hidden">
                        <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/40 to-transparent" />
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full zv-glass text-[11px]" style={{ color: t?.color }}>
                          <Icon size={12} /> {t?.name}
                        </div>
                        <div className="absolute top-3 right-3 px-2 py-1 rounded-full zv-glass text-[11px] text-white/70">{p.difficulty}</div>
                      </div>
                      <div className="p-5">
                        <div className="font-display text-lg font-semibold">{p.title}</div>
                        <div className="mt-1 flex items-center gap-3 text-xs text-white/55">
                          <span className="inline-flex items-center gap-1"><Clock size={11} /> {p.duration}</span>
                          <span className="inline-flex items-center gap-1"><Star size={11} className="text-amber-300" /> 4.8</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {(p.skills || []).slice(0, 4).map((s) => <span key={s} className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-white/70">{s}</span>)}
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-[11px] text-white/45">{(p.outcomes || []).length} outcomes</div>
                          <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm text-cyan-300 hover:text-cyan-200">Inquire <ArrowUpRight size={14} /></Link>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
            {filtered.length === 0 && (
              <div className="mt-16 text-center text-white/50">No projects match your filters.</div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

const Chip = ({ active, onClick, label, color }) => (
  <button type="button" onClick={onClick} className={`px-3 py-1.5 rounded-full text-xs border transition ${active ? 'border-transparent' : 'border-white/10 hover:border-white/25'}`}
    style={active ? { background: `linear-gradient(135deg, ${color}33, ${color}11)`, color, boxShadow: `0 0 0 1px ${color}55 inset` } : {}}>
    {label}
  </button>
);

export default Marketplace;
