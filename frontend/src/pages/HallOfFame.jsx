import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Medal, Flame, TrendingUp } from 'lucide-react';
import AuroraBackground from '../components/effects/AuroraBackground';
import { LEADERS } from '../mock/mockData';

const PODIUM_ORDER = [2, 1, 3]; // visual order: silver, gold, bronze
const PODIUM_META = {
  1: { color: '#FFD700', height: 'md:h-80', Icon: Crown },
  2: { color: '#C0C0C0', height: 'md:h-64', Icon: Medal },
  3: { color: '#CD7F32', height: 'md:h-56', Icon: Trophy },
};
const getPodiumMeta = (visualIndex) => PODIUM_META[PODIUM_ORDER[visualIndex]];

const HallOfFame = () => {
  const [tab, setTab] = useState('overall');
  const top3 = LEADERS.slice(0, 3);
  const rest = LEADERS.slice(3);

  return (
    <main className="relative pt-28 pb-20 min-h-screen overflow-hidden">
      <AuroraBackground />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80 font-mono">Hall of Fame</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mt-3">The <span className="zv-gradient-text">builders</span> shaping the future.</h1>
          <p className="text-white/60 mt-3">Top contributors, monthly champions, and capstone winners.</p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/10">
            {['overall','monthly','capstone'].map(t => (
              <button key={t} onClick={()=>setTab(t)} className={`relative px-4 py-1.5 text-xs uppercase tracking-widest font-mono rounded-lg transition ${tab===t?'text-white':'text-white/55'}`}>
                {tab===t && <motion.span layoutId="hof-tab" className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.18), rgba(124,58,237,0.22))', border: '1px solid rgba(0,229,255,0.35)' }} />}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Podium */}
        <div className="mt-14 grid md:grid-cols-3 gap-6 items-end">
          {[top3[1], top3[0], top3[2]].map((l, idx) => {
            const real = PODIUM_ORDER[idx];
            const { color: podiumColor, height: podiumHeight, Icon } = getPodiumMeta(idx);
            return (
              <motion.div key={l.rank} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`zv-glass-strong rounded-3xl p-6 text-center relative overflow-hidden ${podiumHeight}`}>
                <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(ellipse at top, ${podiumColor}55, transparent 65%)` }} />
                <div className="relative">
                  <div className="mx-auto w-20 h-20 rounded-full grid place-items-center mb-3" style={{ background: `conic-gradient(from 0deg, ${podiumColor}, #1a1f33, ${podiumColor})` }}>
                    <img src={l.avatar} alt={l.name} className="w-[72px] h-[72px] rounded-full ring-2 ring-black object-cover" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: `${podiumColor}22`, color: podiumColor }}>
                    <Icon size={12} /> #{real}
                  </div>
                  <div className="mt-3 font-display text-xl font-semibold">{l.name}</div>
                  <div className="text-xs text-white/55">{l.track} · {l.country}</div>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <Stat label="XP" value={l.xp.toLocaleString()} />
                    <Stat label="Projects" value={l.projects} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Table */}
        <div className="mt-10 zv-glass rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 text-[11px] uppercase tracking-widest text-white/45 px-5 py-3 border-b border-white/5 font-mono">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Student</div>
            <div className="col-span-3">Track</div>
            <div className="col-span-1 text-right">Projects</div>
            <div className="col-span-2 text-right">XP</div>
          </div>
          {rest.map((l, i) => (
            <motion.div key={l.rank} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}
              className="grid grid-cols-12 items-center px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition">
              <div className="col-span-1 font-mono text-white/60">#{l.rank}</div>
              <div className="col-span-5 flex items-center gap-3">
                <img src={l.avatar} alt="" className="w-9 h-9 rounded-full ring-1 ring-white/10" />
                <div>
                  <div className="text-sm">{l.name}</div>
                  <div className="text-[11px] text-white/45">{l.country}</div>
                </div>
              </div>
              <div className="col-span-3 text-sm text-white/70">{l.track}</div>
              <div className="col-span-1 text-right text-sm">{l.projects}</div>
              <div className="col-span-2 text-right text-sm font-display font-semibold zv-gradient-text-cool">{l.xp.toLocaleString()}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <Highlight icon={Flame} title="Hottest streak" value="42 days" sub="by Diego Alvarez" />
          <Highlight icon={TrendingUp} title="Biggest jump" value="+18 ranks" sub="by Hannah Becker" />
          <Highlight icon={Trophy} title="Capstone of the month" value="Fraud Detection" sub="by Aarav Mehta" />
        </div>
      </div>
    </main>
  );
};

const Stat = ({ label, value }) => (
  <div>
    <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">{label}</div>
    <div className="font-display font-bold zv-gradient-text-cool">{value}</div>
  </div>
);
const Highlight = ({ icon: Icon, title, value, sub }) => (
  <div className="zv-card p-5">
    <div className="flex items-center gap-2 text-xs text-white/55"><Icon size={14} className="text-cyan-300" /> {title}</div>
    <div className="font-display text-xl font-semibold mt-2">{value}</div>
    <div className="text-[11px] text-white/45 mt-1">{sub}</div>
  </div>
);

export default HallOfFame;
