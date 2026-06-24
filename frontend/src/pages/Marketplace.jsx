import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Search, Clock, Star, ArrowUpRight, Brain, Database, Lock, Cloud, Sparkles, Globe, Terminal, Code2, BarChart3, Palette, Megaphone, ShieldCheck, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
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

const LOCAL_PROJECTS = [
  { id: "p1", title: "Real-Time Fraud Detection", track: "ai", difficulty: "Advanced", skills: ["Python", "XGBoost", "Kafka", "Streamlit"] },
  { id: "p2", title: "SaaS Billing Platform", track: "fullstack", difficulty: "Intermediate", skills: ["React", "Node", "Stripe", "Postgres"] },
  { id: "p3", title: "Retail Sales Analytics", track: "data", difficulty: "Beginner", skills: ["Pandas", "SQL", "PowerBI"] },
  { id: "p4", title: "Zero Trust Network Audit", track: "cyber", difficulty: "Advanced", skills: ["Kali", "Burp", "OWASP", "Wireshark"] },
  { id: "p5", title: "Multi-Region K8s Deployment", track: "cloud", difficulty: "Advanced", skills: ["AWS", "Kubernetes", "Terraform", "GitOps"] },
  { id: "p6", title: "RAG Research Assistant", track: "ai", difficulty: "Intermediate", skills: ["LangChain", "Pinecone", "OpenAI", "FastAPI"] },
  { id: "p7", title: "Computer Vision Quality Inspector", track: "ai", difficulty: "Intermediate", skills: ["PyTorch", "YOLO", "Edge"] },
  { id: "p8", title: "Real-Time Chat with Presence", track: "webdev", difficulty: "Beginner", skills: ["React", "Socket.io", "Redis"] },
  { id: "p9", title: "Automated Web Scraping Engine", track: "python", difficulty: "Intermediate", skills: ["Python", "BeautifulSoup", "Scrapy", "PostgreSQL"] },
  { id: "p10", title: "Enterprise Microservices Infrastructure", track: "java", difficulty: "Advanced", skills: ["Java", "Spring Boot", "Docker", "Eureka"] },
  { id: "p11", title: "Neomorphic E-Commerce Experience", track: "uiux", difficulty: "Beginner", skills: ["Figma", "Design Systems", "Prototyping", "User Research"] },
  { id: "p12", title: "SEO & Growth Campaign Optimizer", track: "marketing", difficulty: "Intermediate", skills: ["Google Analytics", "SEO", "A/B Testing", "Copywriting"] }
];

const Marketplace = () => {
  const [q, setQ] = useState('');

  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects().then((r) => r.data),
    retry: 1,
  });

  const projects = projectsQuery.data || LOCAL_PROJECTS;
  const isLoading = projectsQuery.isLoading;

  const filteredTracks = useMemo(() => {
    return LOCAL_TRACKS.filter((t) => {
      const matchQuery = q.trim() === '' ||
        t.name.toLowerCase().includes(q.toLowerCase()) ||
        t.desc.toLowerCase().includes(q.toLowerCase());
      
      const trackProjects = projects.filter((p) => p.track === t.id);
      const matchProjects = trackProjects.some((p) =>
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        (p.skills || []).join(' ').toLowerCase().includes(q.toLowerCase())
      );
      
      return matchQuery || matchProjects;
    });
  }, [q, projects]);

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
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tracks, projects, skills..." className="flex-1 bg-transparent outline-none text-sm placeholder-white/35 text-white" />
        </div>

        {isLoading && <LoadingBlock label="Loading tracks…" />}

        {!isLoading && (
          <>
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTracks.map((t, i) => {
                const Icon = icons[t.id] || Sparkles;
                const trackProjects = projects.filter((p) => p.track === t.id);
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
                        
                        {trackProjects.length > 0 && (
                          <div className="mt-5 pt-4 border-t border-white/5">
                            <div className="text-[10px] uppercase tracking-wider text-cyan-300/70 font-mono mb-2">Curriculum Projects ({trackProjects.length})</div>
                            <div className="space-y-2">
                              {trackProjects.map((p) => (
                                <div key={p.id} className="p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition duration-300 flex items-center justify-between">
                                  <div className="flex flex-col min-w-0 pr-2">
                                    <span className="text-xs font-medium text-white/80 truncate">{p.title}</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {(p.skills || []).slice(0, 3).map((s) => (
                                        <span key={s} className="text-[9px] font-mono text-white/45">{s}</span>
                                      ))}
                                    </div>
                                  </div>
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-cyan-300/80 font-mono shrink-0">{p.difficulty}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-white/45">
                          <CheckCircle2 size={12} className="text-emerald-400" />
                          <span>Industry-ready</span>
                        </div>
                        <Link to="/contact" className="inline-flex items-center gap-1 text-sm text-cyan-300 hover:text-cyan-200 font-medium group/btn">
                          Inquire Track <ChevronRight size={14} className="transform group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
            {filteredTracks.length === 0 && (
              <div className="mt-16 text-center text-white/50">No tracks match your search filters.</div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Marketplace;
