import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Rocket, Target, ShieldCheck, Sparkles, Award, BadgeCheck, Star, ArrowRight, CheckCircle2, Code2, Zap, Trophy, Brain, Cloud, Database, Lock, Layers, Globe, Terminal, BarChart3, Palette, Megaphone } from 'lucide-react';
import AuroraBackground from '../components/effects/AuroraBackground';
import ParticleField from '../components/effects/ParticleField';
import TiltCard from '../components/effects/TiltCard';
import MagneticButton from '../components/effects/MagneticButton';
import { STATS, TESTIMONIALS, BRAND } from '../mock/mockData';
import { getTracks, getBadges, getLeaderboard } from '../services/api';
import BrandReveal from '../components/sections/BrandReveal';

const ZELVORA_VIDEO = 'https://customer-assets.emergentagent.com/job_smart-automate-33/artifacts/etdvhqua_gemini_generated_video_69583f48.mp4';
const trackIcons = {
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
  { id: "webdev", name: "Web Development", color: "#00E5FF", desc: "Build modern responsive websites and web applications.", image: "/webdev-cover.jpg" },
  { id: "python", name: "Python Development", color: "#3776AB", desc: "Master Python programming for automation, scripting, and backend development.", image: "/python-cover.jpg" },
  { id: "java", name: "Java Development", color: "#F89820", desc: "Build scalable enterprise backend systems using Java and Spring Boot.", image: "/java-cover.jpg" },
  { id: "fullstack", name: "Full Stack Development", color: "#7C3AED", desc: "Ship full-stack applications end-to-end with modern frameworks.", image: "/fullstack-cover.jpg" },
  { id: "data", name: "Data Analytics", color: "#00FFA3", desc: "Analyze data, perform statistical tests, and build interactive dashboards.", image: "/data-cover.jpg" },
  { id: "ai", name: "Artificial Intelligence", color: "#EC4899", desc: "Build production machine learning and AI models with real-world datasets.", image: "/ai-cover.jpg" },
  { id: "uiux", name: "UI/UX Design", color: "#F472B6", desc: "Design premium, highly interactive user experiences and interfaces.", image: "/uiux-cover.jpg" },
  { id: "cyber", name: "Cyber Security", color: "#EF4444", desc: "Secure modern networks, perform pen testing, and conduct security audits.", image: "/cyber-cover.jpg" },
  { id: "marketing", name: "Digital Marketing", color: "#10B981", desc: "Drive growth and brand engagement through modern digital strategies.", image: "/marketing-cover.jpg" },
  { id: "cloud", name: "Cloud & DevOps", color: "#FBBF24", desc: "Deploy and orchestrate highly available infrastructure and pipelines on cloud.", image: "/cloud-cover.jpg" }
];

const PODIUM_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];
const getPodiumColor = (rankIndex) => PODIUM_COLORS[rankIndex] || PODIUM_COLORS[2];

const Landing = () => {
  const tracksQuery = useQuery({
    queryKey: ['tracks'],
    queryFn: () => getTracks().then((r) => r.data),
    retry: 1,
  });
  const badgesQuery = useQuery({
    queryKey: ['badges'],
    queryFn: () => getBadges().then((r) => r.data),
    retry: 1,
  });
  const leadersQuery = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => getLeaderboard().then((r) => r.data),
    retry: 1,
  });

  const tracks = LOCAL_TRACKS.filter((t) => ['python', 'fullstack', 'ai'].includes(t.id));
  const rawBadges = badgesQuery.data || [];
  const badgeImages = {
    'b1': '/explorer-badge.png',
    'b3': '/builder-badge.png',
    'b4': '/practitioner-badge.png',
    'b5': '/excellence-badge.png'
  };
  const badges = [...rawBadges]
    .map(b => ({
      ...b,
      image: badgeImages[b.id] || b.image
    }))
    .sort((x, y) => {
      const order = { 'b1': 1, 'b3': 2, 'b4': 3, 'b5': 4, 'b2': 5 };
      return (order[x.id] || 99) - (order[y.id] || 99);
    });
  const leaders = leadersQuery.data || [];

  return (
    <main className="relative overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center pt-28 pb-20">
        <AuroraBackground />
        <div className="absolute inset-0"><ParticleField density={70} /></div>
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full zv-glass text-xs text-cyan-300 mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 zv-pulse-ring" />
                Industry-grade learning — not another internship
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.03] tracking-tight"
              >
                Build <span className="zv-gradient-text">Real-World</span> Projects.<br />
                Earn <span className="zv-gradient-text-cool">Verifiable</span> Credentials.<br />
                Become <span className="zv-gradient-text">Industry Ready</span>.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-6 text-lg text-white/65 max-w-xl leading-relaxed"
              >
                Learn through industry-focused projects, earn verifiable credentials, and showcase your achievements with proof recruiters trust.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <MagneticButton as={Link} to="/marketplace" className="zv-btn-primary inline-flex items-center gap-2">
                  <Rocket size={18} /> Explore Tracks
                </MagneticButton>
                <MagneticButton as={Link} to="/verify" className="zv-btn-ghost inline-flex items-center gap-2">
                  <Target size={18} /> Verify Certificate
                </MagneticButton>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl"
              >
                {STATS.map(s => (
                  <div key={s.label} className="zv-glass rounded-xl p-4">
                    <div className="text-2xl font-display font-bold zv-gradient-text-cool">{s.value}</div>
                    <div className="text-[11px] uppercase tracking-widest text-white/55 mt-1">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative">
              <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="relative">
                <div className="absolute -inset-10 bg-gradient-to-br from-cyan-500/20 via-purple-500/15 to-emerald-400/15 blur-3xl rounded-full" />
                <TiltCard className="relative zv-glass-strong rounded-3xl p-6 zv-glow-cyan">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="text-[10px] font-mono text-white/40">zelvoratech.com/credential/preview</div>
                  </div>
                  <div className="mt-5 rounded-2xl p-6 bg-gradient-to-br from-[#0a1424] to-[#0e0a1f] border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden ring-1 ring-cyan-400/40">
                        <video src={ZELVORA_VIDEO} autoPlay loop muted playsInline preload="auto" poster={BRAND.logo} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-widest text-cyan-300/80 font-mono">Verified Credential</div>
                        <div className="font-display text-lg">Industry Ready — Artificial Intelligence</div>
                      </div>
                      <BadgeCheck className="ml-auto text-emerald-400" />
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                      <Info label="Recipient" value="Aarav Mehta" />
                      <Info label="Project" value="Real-Time Fraud Detection" />
                      <Info label="Credential ID" value="ZV-2026-AM-0421" />
                      <Info label="Issued" value="30 Jun 2026" />
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full bg-white/10 ring-2 ring-black grid place-items-center text-[10px] font-mono">+9k</div>
                      </div>
                      <div className="text-[10px] text-white/40 font-mono">SCAN → VERIFY ONLINE</div>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <Mini icon={Trophy} label="Top 1%" />
                    <Mini icon={Star} label="Mentor Endorsed" />
                    <Mini icon={Zap} label="Verified On-Chain" />
                  </div>
                </TiltCard>
                <motion.div initial={{ y: 0 }} animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -top-6 -left-8 zv-glass rounded-xl px-3 py-2 text-xs flex items-center gap-2">
                  <Sparkles size={14} className="text-emerald-300" /> +1,240 XP
                </motion.div>
                <motion.div initial={{ y: 0 }} animate={{ y: [0, 8, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute -bottom-5 -right-6 zv-glass rounded-xl px-3 py-2 text-xs flex items-center gap-2">
                  <Award size={14} className="text-cyan-300" /> New badge unlocked
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS / TRUST BAR */}
      <section className="relative py-6 border-y border-white/5 overflow-hidden">
        <div className="text-center text-[11px] uppercase tracking-[0.25em] text-white/40 mb-4">Loved by students from</div>
        <div className="relative overflow-hidden">
          <div className="flex gap-12 zv-marquee whitespace-nowrap min-w-max">
            {[...Array(2)].map((_, k) => (
              <div key={`row-${k}`} className="flex gap-12 items-center px-6">
                {['IIT Bombay','NIT Trichy','IIIT Hyderabad','BITS Pilani','VIT','SRM','Manipal','Anna University','Amrita','Delhi University','NUS','UToronto'].map(n => (
                  <span key={`${n}-${k}`} className="font-display text-white/40 hover:text-white/80 transition text-sm tracking-wide">{n}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND REVEAL */}
      <BrandReveal />

      {/* HOW IT WORKS */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Heading eyebrow="How it works" title={<>Four steps. <span className="zv-gradient-text-cool">Real proof of work.</span></>} sub="Pick a track, build with mentors, get reviewed, earn credentials recruiters can verify." />
          <div className="mt-14 grid md:grid-cols-4 gap-5">
            {[
              { icon: Code2, title: 'Pick a Track', desc: 'Choose from Web Development, Python Development, Java Development, Full Stack Development, Data Analytics, Artificial Intelligence, UI/UX Design, Cyber Security, Digital Marketing, or Cloud & DevOps.' },
              { icon: Rocket, title: 'Build Projects', desc: 'Ship real, industry-aligned projects with weekly milestones.' },
              { icon: ShieldCheck, title: 'Get Reviewed', desc: 'Detailed mentor reviews, code feedback, and rubrics.' },
              { icon: BadgeCheck, title: 'Earn Credentials', desc: 'Verifiable badges and certificates with QR + URL.' }
            ].map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="zv-card p-6 zv-shine">
                <div className="w-11 h-11 rounded-xl grid place-items-center mb-4" style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.18), rgba(124,58,237,0.18))' }}>
                  <s.icon className="text-cyan-300" size={20} />
                </div>
                <div className="text-xs font-mono text-white/40">{String(i+1).padStart(2,'0')}</div>
                <div className="font-display text-lg font-semibold mt-1">{s.title}</div>
                <div className="text-sm text-white/55 mt-2 leading-relaxed">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section className="relative py-24">
        <div className="absolute inset-0 zv-grid-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Heading eyebrow="Tracks" title={<>Programs built with <span className="zv-gradient-text">industry</span>.</>} sub="Each track has a curated project roadmap, weekly mentor reviews and a capstone." />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tracks.map((t, i) => {
              const Icon = trackIcons[t.id] || Sparkles;
              return (
                <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}>
                  <Link to="/marketplace" className="block h-full group/card">
                    <TiltCard className="zv-card p-6 h-full hover:border-cyan-400/50 transition-all duration-300 relative overflow-hidden group">
                      {t.image ? (
                        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-5 border border-white/10 group-hover/card:border-cyan-400/35 transition-all duration-300">
                          <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute top-3 left-3 w-9 h-9 rounded-lg grid place-items-center bg-black/60 backdrop-blur-md border border-white/10">
                            <Icon size={16} style={{ color: t.color }} />
                          </div>
                          <div className="absolute top-3 right-3 w-9 h-9 rounded-lg grid place-items-center bg-black/60 backdrop-blur-md border border-white/10">
                            <ArrowRight size={16} className="text-white/70 group-hover/card:text-cyan-300 group-hover/card:translate-x-0.5 transition-all duration-300" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="w-11 h-11 rounded-xl grid place-items-center" style={{ background: `${t.color}22`, boxShadow: `0 0 24px ${t.color}33` }}>
                            <Icon size={20} style={{ color: t.color }} />
                          </div>
                          <ArrowRight size={16} className="text-white/30 group-hover/card:text-cyan-300 group-hover/card:translate-x-0.5 transition-all duration-300" />
                        </div>
                      )}
                      <div className="mt-5 font-display text-xl font-semibold">{t.name}</div>
                      <div className="text-sm text-white/55 mt-2">{t.desc}</div>
                      <div className="mt-5 flex items-center gap-4 text-xs text-white/55">
                        <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-400" /> 12+ projects</span>
                        <span className="inline-flex items-center gap-1.5"><Star size={12} className="text-amber-300" /> Capstone</span>
                      </div>
                    </TiltCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 flex justify-center">
            <Link to="/marketplace">
              <MagneticButton>
                <span className="zv-btn-primary flex items-center gap-2 text-sm font-medium">
                  Explore Tracks <ArrowRight size={15} />
                </span>
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* CREDENTIAL ECOSYSTEM */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Heading eyebrow="Credential Ecosystem" title={<>Badges that <span className="zv-gradient-text-cool">recruiters trust</span>.</>} sub="Every badge has a unique credential ID, QR code, public verification page, and one-click LinkedIn share." />
          <div className="mt-14 grid md:grid-cols-5 gap-5">
            {badges.map((b, i) => (
              <motion.div key={b.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
                className="zv-card p-6 text-center group">
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  {b.image ? (
                    <>
                      <div className="absolute inset-0 rounded-full blur-xl opacity-40 animate-pulse" style={{ background: `radial-gradient(circle, ${b.color}55, transparent 70%)` }} />
                      <img src={b.image} alt={b.name} className="relative w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 rounded-full blur-xl opacity-60" style={{ background: `radial-gradient(circle, ${b.color}55, transparent 70%)` }} />
                      <div className="relative w-20 h-20 rounded-full grid place-items-center" style={{ background: `conic-gradient(from 0deg, ${b.color}, #1a1f33, ${b.color})` }}>
                        <div className="w-[68px] h-[68px] rounded-full bg-[#0a0d14] grid place-items-center">
                          <Award size={26} style={{ color: b.color }} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-4 font-display font-semibold">{b.name}</div>
                <div className="text-[11px] uppercase tracking-widest text-white/45 mt-1">{b.tier}</div>
                <div className="text-xs text-white/55 mt-3 leading-relaxed">{b.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERBOARD PREVIEW */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Heading eyebrow="Hall of Fame" title={<>The builders <span className="zv-gradient-text">leading the way</span>.</>} sub="Monthly champions, top contributors, and capstone winners." />
          
          {leaders.length === 0 ? (
            <div className="mt-14 text-center py-16 zv-glass-strong rounded-3xl p-6 max-w-xl mx-auto border border-cyan-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent opacity-60" />
              <div className="relative z-10">
                <div className="w-14 h-14 mx-auto rounded-xl bg-white/[0.04] border border-white/10 grid place-items-center mb-4">
                  <Trophy size={24} className="text-cyan-300" />
                </div>
                <h2 className="font-display text-xl font-bold text-white">Top 10 Achievers Coming Soon</h2>
                <p className="text-white/65 mt-2 text-xs leading-relaxed max-w-md mx-auto">
                  Verified members who make outstanding contributions to Zelvora Industry Labs will be featured here.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-14 grid lg:grid-cols-3 gap-6">
              {leaders.slice(0, 3).map((l, i) => {
                const podiumColor = getPodiumColor(i);
                return (
                  <motion.div key={l.rank} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="zv-card p-6 relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 text-7xl font-display font-bold opacity-10">#{l.rank}</div>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={l.avatar} alt={l.name} className="w-16 h-16 rounded-full ring-2" style={{ boxShadow: `0 0 24px ${podiumColor}66`, borderColor: podiumColor }} />
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full grid place-items-center text-[11px] font-bold" style={{ background: podiumColor, color: '#0a0d14' }}>#{l.rank}</div>
                      </div>
                      <div>
                        <div className="font-display font-semibold">{l.name}</div>
                        <div className="text-xs text-white/55">{l.track} · {l.country}</div>
                      </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between text-sm">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40">XP</div>
                        <div className="font-display font-bold zv-gradient-text-cool">{l.xp.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40">Projects</div>
                        <div className="font-display font-bold">{l.projects}</div>
                      </div>
                      <Link to="/hall-of-fame" className="text-xs text-cyan-300 hover:underline">View profile →</Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {leaders.length > 0 && (
            <div className="mt-8 text-center">
              <Link to="/hall-of-fame" className="zv-btn-ghost inline-flex items-center gap-2"><Trophy size={16} /> See full Hall of Fame</Link>
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Heading eyebrow="Wall of love" title={<>Stories from <span className="zv-gradient-text-cool">our builders</span>.</>} sub="Real outcomes from students who shipped real work." />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.blockquote key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="zv-card p-6 text-sm relative">
                <Star className="absolute top-4 right-4 text-amber-300" size={14} />
                <p className="text-white/85 leading-relaxed">“{t.quote}”</p>
                <footer className="mt-4 text-xs text-white/55"><span className="text-white/85 font-semibold">{t.name}</span> · {t.role}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl zv-glass-strong p-10 md:p-14 text-center">
            <div className="absolute inset-0 opacity-60"><AuroraBackground withGrid={false} /></div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.2em] text-cyan-300 mb-5">Ready when you are</div>
              <h3 className="font-display text-4xl md:text-5xl font-bold leading-tight">Build. Learn. <span className="zv-gradient-text">Showcase. Grow.</span></h3>
              <p className="text-white/65 mt-4 max-w-2xl mx-auto">Join 12,000+ students building real projects that move careers forward.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <MagneticButton as={Link} to="/marketplace" className="zv-btn-primary inline-flex items-center gap-2">
                  <Rocket size={18} /> Explore Tracks
                </MagneticButton>
                <MagneticButton as={Link} to="/verify" className="zv-btn-ghost inline-flex items-center gap-2">
                  <Target size={18} /> Verify Certificate
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const Heading = ({ eyebrow, title, sub }) => (
  <div className="text-center max-w-3xl mx-auto">
    <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80 font-mono">{eyebrow}</div>
    <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-[1.1]">{title}</h2>
    {sub && <p className="mt-4 text-white/60">{sub}</p>}
  </div>
);

const Info = ({ label, value }) => (
  <div>
    <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">{label}</div>
    <div className="text-white/90 mt-0.5">{value}</div>
  </div>
);

const Mini = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-white/70">
    <Icon size={13} className="text-cyan-300" /> {label}
  </div>
);

export default Landing;
