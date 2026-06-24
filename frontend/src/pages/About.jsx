import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, Target, ShieldCheck, Users, Lightbulb, Globe, ArrowRight } from 'lucide-react';
import AuroraBackground from '../components/effects/AuroraBackground';
import { BRAND, STATS, CONTACT } from '../mock/mockData';

const VALUES = [
  { icon: Target, title: 'Real Projects', desc: 'Every program is built around shipping production-grade work — not toy exercises or slide decks.' },
  { icon: ShieldCheck, title: 'Verified Proof', desc: 'Credentials with unique IDs, QR codes, and public verification pages that recruiters trust.' },
  { icon: Users, title: 'Industry Mentors', desc: '320+ mentors from tech companies review your code, score your work, and endorse top performers.' },
  { icon: Lightbulb, title: 'Learn by Building', desc: 'Structured roadmaps with weekly milestones so you grow skills while delivering outcomes.' },
];

const About = () => {
  return (
    <main className="relative pt-28 pb-20 min-h-screen overflow-hidden">
      <AuroraBackground />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80 font-mono">About Us</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mt-3">
            About <span className="zv-gradient-text">{BRAND.name}</span>
          </h1>
          <p className="text-white/60 mt-4 text-lg leading-relaxed">
            An initiative by {BRAND.parent} — bridging the gap between academic learning and industry-ready skills through real projects and verifiable credentials.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mt-14 zv-glass-strong rounded-3xl p-8 md:p-12"
        >
          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-cyan-400" /> Who we are
                </h2>
                
                {/* Zelvora Technologies */}
                <div className="mt-6 border-l-2 border-cyan-400/20 pl-4 py-1">
                  <h3 className="text-cyan-300 font-display text-lg font-semibold">
                    Zelvora Technologies
                  </h3>
                  <p className="mt-2 text-white/70 text-sm leading-relaxed">
                    Zelvora Technologies is an AI-driven company transforming education and technology. We build intelligent solutions for students, empower learners with AI skills, and deliver real-world tech innovations.
                  </p>
                  <p className="mt-2 text-white/70 text-sm leading-relaxed">
                    Through cutting-edge artificial intelligence, we develop adaptive AI models for personalized student support, custom software integrations for enterprise workflows, and hands-on AI workshops to unlock practical skills and real-world insights.
                  </p>
                </div>

                {/* Zelvora Industry Labs */}
                <div className="mt-8 border-l-2 border-purple-500/20 pl-4 py-1">
                  <h3 className="text-purple-300 font-display text-lg font-semibold">
                    Zelvora Industry Labs
                  </h3>
                  <p className="mt-2 text-white/70 text-sm leading-relaxed">
                    As the learning and project-based training arm of Zelvora Technologies, we created Industry Labs to bridge a persistent gap: while students graduate with degrees, they often lack the provable, hands-on experience that modern hiring teams demand.
                  </p>
                  <p className="mt-2 text-white/70 text-sm leading-relaxed">
                    Our platform gives learners a structured path to ship real projects, receive mentor reviews, earn digital badges and certificates, and showcase achievements that can be verified by anyone — instantly.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-4">
                {STATS.map(s => (
                  <div key={s.label} className="zv-card p-5 text-center flex flex-col justify-center">
                    <div className="text-2xl font-display font-bold zv-gradient-text-cool">{s.value}</div>
                    <div className="text-[11px] uppercase tracking-widest text-white/55 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <section className="mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80 font-mono">What we do</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">Building industry-ready talent</h2>
            <p className="text-white/60 mt-3">We run a project-first learning ecosystem — not another video course platform.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="zv-card p-6"
              >
                <div className="w-11 h-11 rounded-xl grid place-items-center mb-4" style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.18), rgba(124,58,237,0.18))' }}>
                  <v.icon className="text-cyan-300" size={20} />
                </div>
                <div className="font-display font-semibold text-lg">{v.title}</div>
                <p className="text-sm text-white/55 mt-2 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80 font-mono">Our Mission</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">Make skills <span className="zv-gradient-text-cool">provable</span></h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              { step: '01', title: 'Pick a Track', desc: 'Choose from Web Development, Python Development, Java Development, Full Stack Development, Data Analytics, Artificial Intelligence, UI/UX Design, Cyber Security, Digital Marketing, or Cloud & DevOps.' },
              { step: '02', title: 'Build & Ship', desc: 'Complete guided projects with weekly milestones and mentor code reviews.' },
              { step: '03', title: 'Earn & Verify', desc: 'Receive verifiable credentials with QR codes and public verification pages.' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="zv-glass rounded-2xl p-6"
              >
                <div className="text-xs font-mono text-cyan-300/70">{s.step}</div>
                <div className="font-display text-xl font-semibold mt-2">{s.title}</div>
                <p className="text-sm text-white/55 mt-2">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-20 zv-glass-strong rounded-3xl p-8 md:p-12 text-center"
        >
          <Globe className="mx-auto text-cyan-300 mb-4" size={28} />
          <h2 className="font-display text-2xl md:text-3xl font-bold">Based in India, built for the world</h2>
          <p className="text-white/60 mt-3 max-w-xl mx-auto">
            Headquartered in {CONTACT.address}, we serve 12,000+ students across India and globally — from IITs and NITs to universities worldwide.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/marketplace" className="zv-btn-primary inline-flex items-center gap-2">
              <Rocket size={18} /> Explore Tracks
            </Link>
            <Link to="/contact" className="zv-btn-ghost inline-flex items-center gap-2">
              Get in Touch <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default About;
