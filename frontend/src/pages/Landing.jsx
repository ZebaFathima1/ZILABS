import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const HOF_MEMBERS = [
  { name: "Zeba Fathima", track: "UI/UX Design", badge: "Project Explorer" },
  { name: "Mirza Amaanullah Baig", track: "Full Stack Development", badge: "Project Builder" },
  { name: "MD Uzair", track: "Artificial Intelligence", badge: "Excellence Award" },
  { name: "Sofia Romero", track: "Java Development", badge: "Industry Practitioner" },
  { name: "Kenji Watanabe", track: "Python Development", badge: "Industry Practitioner" },
  { name: "Aarav Mehta", track: "Web Development", badge: "Project Explorer" }
];

const EcosystemAnimation = () => {
  const [angle, setAngle] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('orbit'); // 'orbit' | 'verify' | 'cert' | 'spotlight'
  const [verifyingIndex, setVerifyingIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [certStep, setCertStep] = useState(0);
  const [particles, setParticles] = useState([]);

  // Generate random particles
  useEffect(() => {
    const pts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * -15,
    }));
    setParticles(pts);
  }, []);

  // Smooth orbital tick
  useEffect(() => {
    if (currentPhase === 'verify') return;
    let animId;
    const tick = () => {
      setAngle(prev => (prev + 0.003) % (2 * Math.PI));
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [currentPhase]);

  // Phase transition timeline
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase(prev => {
        if (prev === 'orbit') {
          setVerifyingIndex(Math.floor(Math.random() * 8));
          return 'verify';
        }
        if (prev === 'verify') {
          setVerifyingIndex(-1);
          return 'cert';
        }
        if (prev === 'cert') {
          setSpotlightIdx(Math.floor(Math.random() * HOF_MEMBERS.length));
          return 'spotlight';
        }
        // spotlight -> orbit
        return 'orbit';
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Certificate generation sequence steps (1 -> 2 -> 3)
  useEffect(() => {
    if (currentPhase !== 'cert') {
      setCertStep(0);
      return;
    }
    const stepInterval = setInterval(() => {
      setCertStep(prev => (prev + 1) % 3);
    }, 1100);
    return () => clearInterval(stepInterval);
  }, [currentPhase]);

  const rawNodes = [
    { id: 'practitioner', name: 'Industry Practitioner', image: '/practitioner-badge.png', color: '#00E5FF', idCode: 'ZIL-IP-0042', date: '24 Jun 2026', status: 'VERIFIED', student: 'Sofia Romero' },
    { id: 'excellence', name: 'Excellence Award', image: '/excellence-badge.png', color: '#7C3AED', idCode: 'ZIL-EA-0001', date: '23 Jun 2026', status: 'VERIFIED', student: 'MD Uzair' },
    { id: 'ai', name: 'AI Specialist', color: '#EC4899', isIcon: true, icon: Brain, idCode: 'ZIL-AI-9021', date: '24 Jun 2026', status: 'VERIFIED', student: 'MD Uzair' },
    { id: 'webdev', name: 'Web Development', color: '#10B981', isIcon: true, icon: Globe, idCode: 'ZIL-WD-5412', date: '24 Jun 2026', status: 'VERIFIED', student: 'Aarav Mehta' },
    { id: 'python', name: 'Python Development', color: '#3776AB', isIcon: true, icon: Terminal, idCode: 'ZIL-PY-8891', date: '24 Jun 2026', status: 'VERIFIED', student: 'Kenji Watanabe' },
    { id: 'java', name: 'Java Development', color: '#F89820', isIcon: true, icon: Code2, idCode: 'ZIL-JV-2026', date: '24 Jun 2026', status: 'VERIFIED', student: 'Sofia Romero' },
    { id: 'data', name: 'Data Science', color: '#00FFA3', isIcon: true, icon: BarChart3, idCode: 'ZIL-DS-3304', date: '24 Jun 2026', status: 'VERIFIED', student: 'Mirza Amaanullah Baig' },
    { id: 'cyber', name: 'Cyber Security', color: '#EF4444', isIcon: true, icon: ShieldCheck, idCode: 'ZIL-CS-0711', date: '24 Jun 2026', status: 'VERIFIED', student: 'Zeba Fathima' }
  ];

  const w0 = 250;
  const h0 = 210;

  // Compute 3D coords for all nodes
  const nodes = rawNodes.map((node, i) => {
    const nodeBaseAngle = (i * Math.PI / 4) + angle;
    
    // Tilted circular orbit: Rx=175, Ry=70
    const x = Math.cos(nodeBaseAngle) * 175;
    const y = Math.sin(nodeBaseAngle) * 70;
    
    // Depth z between -1 (back) and 1 (front)
    const z = Math.sin(nodeBaseAngle);

    // Map depth to visual properties
    const scale = 0.75 + (z + 1) * 0.225; // 0.75 to 1.2
    const opacity = 0.35 + (z + 1) * 0.325; // 0.35 to 1.0
    const zIndex = Math.round((z + 1) * 100); // 0 to 200
    const blurAmount = z < 0 ? Math.abs(z) * 1.5 : 0;

    const isVerifying = verifyingIndex === i;
    const isSelected = selectedIndex === i;

    // Smooth position interpolation targets
    const tx = isVerifying ? 0 : x;
    const ty = isVerifying ? 0 : y;
    const tScale = isVerifying ? 1.4 : (isSelected ? scale * 1.2 : scale);
    const tOpacity = isVerifying ? 1.0 : (verifyingIndex !== -1 ? 0.15 : opacity);
    const tZIndex = isVerifying ? 300 : (isSelected ? 250 : zIndex);
    const tFilter = isVerifying ? 'blur(0px)' : `blur(${blurAmount}px)`;

    return {
      ...node,
      x: tx,
      y: ty,
      scale: tScale,
      opacity: tOpacity,
      zIndex: tZIndex,
      filter: tFilter,
      isVerifying,
      isSelected
    };
  });

  const verifiedBadge = verifyingIndex !== -1 ? nodes[verifyingIndex] : null;
  const selectedBadge = selectedIndex !== -1 ? nodes[selectedIndex] : null;

  return (
    <div className="relative h-[480px] w-full zv-glass-strong rounded-3xl overflow-hidden border border-white/5 flex items-center justify-center select-none bg-gradient-to-b from-[#050814] to-[#0a0d1a]">
      
      {/* CYBER SCANNING ANIMATED GRID BACKGROUND */}
      <motion.div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 229, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          backgroundPosition: 'center',
        }}
        animate={{ backgroundPosition: ["0px 0px", "0px 24px"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050814]/75 to-[#050814] pointer-events-none" />

      {/* Floating particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{
            y: ['0px', '-70px', '0px'],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* GLOWING NETWORK CONSTELLATION SVG PATHS */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
        {/* Draw lines to center Zelvora core */}
        {nodes.map((node) => (
          <motion.line
            key={`center-line-${node.id}`}
            x1={w0}
            y1={h0}
            x2={w0 + node.x}
            y2={h0 + node.y}
            stroke={node.isVerifying ? '#00FFA3' : (node.isSelected ? '#00E5FF' : node.color)}
            strokeWidth={node.isVerifying || node.isSelected ? '2' : '1'}
            strokeOpacity={node.isVerifying || node.isSelected ? '0.8' : '0.2'}
            strokeDasharray="5 3"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
          />
        ))}

        {/* Draw mesh constellations loop connecting orbiting badges */}
        {nodes.map((node, i) => {
          const nextNode = nodes[(i + 1) % nodes.length];
          if (node.isVerifying || nextNode.isVerifying) return null;
          return (
            <line
              key={`ring-line-${node.id}`}
              x1={w0 + node.x}
              y1={h0 + node.y}
              x2={w0 + nextNode.x}
              y2={h0 + nextNode.y}
              stroke="rgba(0, 229, 255, 0.15)"
              strokeWidth="0.8"
            />
          );
        })}
      </svg>

      {/* CENTRAL NODE: Zelvora Hub with Cyan Aura & soft glow */}
      <div 
        className="absolute z-100 flex items-center justify-center pointer-events-none"
        style={{ left: `${w0 - 32}px`, top: `${h0 - 32}px`, width: '64px', height: '64px' }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl shadow-[0_0_40px_rgba(0,229,255,0.6)]"
        />
        <div className="w-12 h-12 rounded-full bg-black/90 border border-cyan-400/40 flex items-center justify-center shadow-[inset_0_0_10px_rgba(0,229,255,0.4)]">
          <img src="/logo.png" alt="Zelvora" className="w-[60%] h-[60%] object-contain" />
        </div>
      </div>

      {/* ORBITING/VERIFYING BADGE NODES */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          onClick={() => {
            if (currentPhase !== 'verify') {
              setSelectedIndex(selectedIndex === i ? -1 : i);
            }
          }}
          whileHover={{ 
            scale: node.isVerifying ? 1.4 : 1.25, 
            boxShadow: `0 0 20px ${node.color}, inset 0 0 10px ${node.color}` 
          }}
          animate={{
            x: node.x,
            y: node.y,
            scale: node.scale,
            opacity: node.opacity,
            zIndex: node.zIndex,
            filter: node.filter,
          }}
          transition={{
            type: 'spring',
            stiffness: 75,
            damping: 15
          }}
          className="absolute flex items-center justify-center cursor-pointer"
          style={{
            left: `${w0 - 20}px`,
            top: `${h0 - 20}px`,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(4, 6, 12, 0.95)',
            border: `1.5px solid ${node.isVerifying ? '#00FFA3' : (node.isSelected ? '#00E5FF' : node.color)}`,
            boxShadow: node.isVerifying 
              ? `0 0 25px #00FFA3, inset 0 0 8px #00FFA3` 
              : (node.isSelected ? `0 0 20px #00E5FF` : `0 0 8px ${node.color}35`),
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            {node.image ? (
              <img src={node.image} alt={node.name} className="w-[80%] h-[80%] object-contain" />
            ) : (
              <node.icon size={16} style={{ color: node.color }} />
            )}
          </div>
        </motion.div>
      ))}

      {/* CREDENTIAL VERIFICATION SCAN SCENE */}
      <AnimatePresence>
        {currentPhase === 'verify' && verifiedBadge && (
          <div className="absolute inset-0 pointer-events-none z-250 flex flex-col items-center justify-end pb-12">
            {/* Green Laser Scanline Sweep */}
            <motion.div
              initial={{ top: '25%' }}
              animate={{ top: ['25%', '65%', '25%'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#00FFA3] to-transparent shadow-[0_0_12px_#00FFA3]"
            />

            {/* Verification HUD details projection */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              className="w-[85%] mx-auto font-mono text-xs text-[#00FFA3]"
            >
              <div className="border border-[#00FFA3]/40 p-4 bg-black/90 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,163,0.15)] rounded-xl relative">
                {/* Verified green badge checkmark */}
                <div className="absolute -top-3.5 left-6 w-7 h-7 rounded-full bg-[#00FFA3] border-2 border-black flex items-center justify-center text-black shadow-[0_0_10px_#00FFA3]">
                  <CheckCircle2 size={14} className="stroke-[2.5]" />
                </div>
                
                <div className="flex justify-between items-center mt-1 border-b border-[#00FFA3]/20 pb-2 mb-2">
                  <div className="text-[11px] font-bold tracking-widest text-[#00FFA3]">{verifiedBadge.idCode}</div>
                  <div className="text-[9px] text-[#00FFA3]/75 font-bold uppercase tracking-wider">✓ Verified Credential</div>
                </div>
                <div className="grid grid-cols-2 gap-y-1 text-[10px] text-white/95">
                  <div><span className="text-[#00FFA3]/60">NAME:</span> {verifiedBadge.student}</div>
                  <div><span className="text-[#00FFA3]/60">BADGE:</span> {verifiedBadge.name}</div>
                  <div><span className="text-[#00FFA3]/60">ISSUED:</span> {verifiedBadge.date}</div>
                  <div><span className="text-[#00FFA3]/60">STATUS:</span> {verifiedBadge.status}</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CERTIFICATE GENERATION SEQUENCE DIAGRAM */}
      <AnimatePresence>
        {currentPhase === 'cert' && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            className="absolute top-6 inset-x-4 z-300 pointer-events-none"
          >
            <div className="zv-glass p-3 rounded-2xl flex items-center justify-between border border-cyan-400/20 bg-[#04060c]/90 backdrop-blur-md shadow-[0_0_15px_rgba(0,229,255,0.15)] font-mono text-[9px] text-cyan-300">
              {/* Step 1 */}
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/[0.02]">
                <div className={`w-2.5 h-2.5 rounded-full border border-cyan-400 flex items-center justify-center text-[6px] ${certStep >= 0 ? 'bg-cyan-400 text-black' : ''}`}>1</div>
                <span className={certStep === 0 ? 'text-white font-bold' : 'opacity-65'}>Badge Earned</span>
              </div>
              <ArrowRight size={10} className={certStep === 0 ? 'text-cyan-400 animate-pulse' : 'opacity-30'} />
              
              {/* Step 2 */}
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/[0.02]">
                <div className={`w-2.5 h-2.5 rounded-full border border-cyan-400 flex items-center justify-center text-[6px] ${certStep >= 1 ? 'bg-cyan-400 text-black' : ''}`}>2</div>
                <span className={certStep === 1 ? 'text-white font-bold' : 'opacity-65'}>Certificate Issued</span>
              </div>
              <ArrowRight size={10} className={certStep === 1 ? 'text-cyan-400 animate-pulse' : 'opacity-30'} />
              
              {/* Step 3 */}
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/[0.02]">
                <div className={`w-2.5 h-2.5 rounded-full border border-cyan-400 flex items-center justify-center text-[6px] ${certStep >= 2 ? 'bg-cyan-400 text-black' : ''}`}>3</div>
                <span className={certStep === 2 ? 'text-white font-bold' : 'opacity-65'}>Verified Credential</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HALL OF FAME MEMBER SPOTLIGHT */}
      <AnimatePresence>
        {currentPhase === 'spotlight' && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            className="absolute top-6 inset-x-4 z-300 pointer-events-none"
          >
            <div className="zv-glass p-3.5 rounded-2xl border border-purple-500/30 bg-[#04060c]/95 backdrop-blur-md text-center shadow-[0_0_15px_rgba(124,58,237,0.15)] font-mono">
              <div className="text-[10px] uppercase text-purple-400 tracking-[0.25em] font-bold">🏆 Hall of Fame</div>
              <div className="text-white text-xs font-bold mt-1.5">{HOF_MEMBERS[spotlightIdx].name}</div>
              <div className="text-white/55 text-[10px] mt-0.5">{HOF_MEMBERS[spotlightIdx].track}</div>
              <div className="text-cyan-300 text-[9px] mt-1.5 font-bold tracking-wider">[ {HOF_MEMBERS[spotlightIdx].badge.toUpperCase()} ]</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* USER INTERACTION HUD OVERLAY (when clicked manual selection) */}
      <AnimatePresence>
        {currentPhase !== 'verify' && selectedBadge && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            className="absolute bottom-4 left-4 right-4 font-mono text-xs text-cyan-300 pointer-events-auto"
          >
            <div className="relative border-l-2 border-t-2 border-cyan-400/50 p-3 bg-black/85 backdrop-blur-md shadow-[0_0_15px_rgba(0,229,255,0.1)] rounded-br-xl">
              <button 
                onClick={() => setSelectedIndex(-1)}
                className="absolute top-2 right-2 text-white/40 hover:text-white/90 font-mono text-[9px] cursor-pointer"
              >
                [ESC]
              </button>
              <div className="text-[9px] uppercase text-white/40 mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Querying_Node_Metadata
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px]">
                <div><span className="text-white/40">NAME:</span> <span className="text-white">{selectedBadge.name}</span></div>
                <div><span className="text-white/40">UUID:</span> <span className="text-white/80">{selectedBadge.idCode}</span></div>
                <div><span className="text-white/40">MINTED:</span> <span className="text-white/85">{selectedBadge.date}</span></div>
                <div><span className="text-white/40">VERIFY:</span> <span className="text-emerald-400">{selectedBadge.status}</span></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DEFAULT HUD SUBTITLE */}
      {currentPhase !== 'verify' && !selectedBadge && (
        <div className="absolute bottom-4 left-4 right-4 font-mono text-[9px] text-cyan-300/40 pointer-events-none">
          <div className="relative border-l-2 border-t-2 border-cyan-400/25 p-3 bg-black/45 backdrop-blur-sm">
            <div className="absolute right-0 bottom-0 border-r-2 border-b-2 border-cyan-400/25 w-3 h-3" />
            <div className="uppercase mb-0.5 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-cyan-400/60 animate-pulse" />
              Ecosystem Status // ACTIVE
            </div>
            <div>Select any orbiting node to trace its verification signature.</div>
          </div>
        </div>
      )}
    </div>
  );
};

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
    .filter(b => b.id !== 'b2')
    .map(b => ({
      ...b,
      image: badgeImages[b.id] || b.image
    }))
    .sort((x, y) => {
      const order = { 'b1': 1, 'b3': 2, 'b4': 3, 'b5': 4 };
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
                <EcosystemAnimation />
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
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
