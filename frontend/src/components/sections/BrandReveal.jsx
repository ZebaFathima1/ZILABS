import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, BadgeCheck, Trophy, Zap, ShieldCheck, Award } from 'lucide-react';
import ParticleField from '../effects/ParticleField';
import { BRAND } from '../../mock/mockData';

const VIDEO_URL = 'https://customer-assets.emergentagent.com/job_smart-automate-33/artifacts/etdvhqua_gemini_generated_video_69583f48.mp4';

const orbit = [
  { icon: BadgeCheck, label: 'Verified Credentials', color: '#00E5FF', angle: 0 },
  { icon: Trophy, label: 'Industry Recognition', color: '#FFD700', angle: 60 },
  { icon: Sparkles, label: 'Real-World Projects', color: '#00FFA3', angle: 120 },
  { icon: Zap, label: 'Lightning Reviews', color: '#A78BFA', angle: 180 },
  { icon: ShieldCheck, label: 'Trusted by Recruiters', color: '#F472B6', angle: 240 },
  { icon: Award, label: 'Mentor Endorsed', color: '#7C3AED', angle: 300 },
];

const BrandReveal = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);
  const rotateRing = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.10), transparent 55%)' }} />
        <div className="absolute inset-0 zv-grid-bg opacity-40" />
        <ParticleField density={45} linkDistance={120} mouseInteract={false} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80 font-mono">Brand DNA</div>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-[1.1]">
            One mark. <span className="zv-gradient-text">Infinite possibilities.</span>
          </h2>
          <p className="mt-4 text-white/60">Every credential, badge, and project carries the Zelvora mark — a promise of verified, real-world skill.</p>
        </div>

        <div className="relative mt-16 mx-auto" style={{ maxWidth: 760 }}>
          {/* Orbit rings */}
          <motion.div style={{ rotate: rotateRing }} className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 rounded-full border border-cyan-400/15" />
            <div className="absolute inset-[8%] rounded-full border border-purple-500/15" />
            <div className="absolute inset-[18%] rounded-full border border-emerald-400/10" />
          </motion.div>

          {/* Counter-rotating dashed ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[4%] rounded-full pointer-events-none"
            style={{
              background: 'conic-gradient(from 0deg, rgba(0,229,255,0.35), transparent 25%, rgba(124,58,237,0.35) 50%, transparent 75%, rgba(0,255,163,0.35))',
              WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 0)',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 0)'
            }}
          />

          {/* Orbiting badges */}
          {orbit.map((o, i) => {
            const rad = 260; // px
            const a = (o.angle * Math.PI) / 180;
            const x = Math.cos(a) * rad;
            const yy = Math.sin(a) * rad * 0.55;
            return (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.6 }}
                animate={{ y: [0, -8, 0] }}
                style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${yy}px)`, transitionDuration: `${3 + i * 0.3}s` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 px-3 py-2 rounded-full zv-glass text-xs whitespace-nowrap"
              >
                <span className="w-6 h-6 rounded-full grid place-items-center" style={{ background: `${o.color}22`, boxShadow: `0 0 16px ${o.color}55` }}>
                  <o.icon size={12} style={{ color: o.color }} />
                </span>
                <span className="text-white/80">{o.label}</span>
              </motion.div>
            );
          })}

          {/* Center: animated video logo */}
          <motion.div style={{ y: y1, scale }} className="relative mx-auto" >
            <div className="relative mx-auto aspect-square w-[260px] sm:w-[300px] md:w-[420px]">
              {/* Glow halo */}
              <div className="absolute -inset-10 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.35), rgba(124,58,237,0.25) 45%, transparent 70%)' }} />
              {/* Frame */}
              <div className="relative w-full h-full rounded-[28px] overflow-hidden zv-glass-strong"
                style={{ boxShadow: '0 30px 80px -20px rgba(0,229,255,0.45), 0 0 0 1px rgba(124,58,237,0.35) inset' }}>
                {/* Conic spinning border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-1 rounded-[30px] pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 0deg, #00E5FF, transparent 30%, #7C3AED 60%, transparent 80%, #00FFA3)',
                    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: 1,
                    borderRadius: 30
                  }}
                />
                <video
                  src={VIDEO_URL}
                  autoPlay loop muted playsInline preload="auto"
                  poster={BRAND.logo}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Top sheen */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.25) 100%)' }} />
              </div>

              {/* Floating chips */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-4 -left-6 zv-glass rounded-xl px-3 py-2 text-xs flex items-center gap-2 hidden md:flex">
                <Sparkles size={13} className="text-emerald-300" /> Verified Mark
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6.5, repeat: Infinity }}
                className="absolute -bottom-3 -right-5 zv-glass rounded-xl px-3 py-2 text-xs flex items-center gap-2 hidden md:flex">
                <BadgeCheck size={13} className="text-cyan-300" /> {BRAND.name}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            { k: 'Verified', v: 'Every credential is QR + URL verifiable, instantly.' },
            { k: 'Recognized', v: 'Endorsed by mentors and trusted by recruiters.' },
            { k: 'Yours', v: 'Build a portfolio that travels with you, forever.' },
          ].map((s, i) => (
            <motion.div key={s.k} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="zv-card p-5">
              <div className="text-[10px] uppercase tracking-widest text-cyan-300/80 font-mono">{s.k}</div>
              <div className="mt-1 text-sm text-white/80 leading-relaxed">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandReveal;
