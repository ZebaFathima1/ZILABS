import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, GraduationCap } from 'lucide-react';
import AuroraBackground from '../components/effects/AuroraBackground';
import ParticleField from '../components/effects/ParticleField';
import { useAuth } from '../context/AuthContext';
import { BRAND } from '../mock/mockData';

const Login = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = (e) => {
    e?.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login({ email: email || (role === 'admin' ? 'admin@zelvoratech.com' : 'aarav@zelvoratech.com'), role });
      nav(role === 'admin' ? '/admin' : '/dashboard');
    }, 700);
  };

  return (
    <main className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <AuroraBackground />
      <div className="absolute inset-0 opacity-60"><ParticleField density={50} linkDistance={110} /></div>
      <div className="relative max-w-md w-full mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="zv-glass-strong rounded-3xl p-8">
          <div className="flex flex-col items-center text-center gap-2">
            <img src={BRAND.logo} className="h-14 w-auto object-contain" alt="Zelvora Technologies" />
            <div className="text-[11px] text-cyan-300/80 font-mono tracking-widest">INDUSTRY LABS</div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/10">
            {[
              { id: 'student', label: 'Student', icon: GraduationCap },
              { id: 'admin', label: 'Admin', icon: ShieldCheck }
            ].map(r => (
              <button key={r.id} onClick={() => setRole(r.id)} className={`relative inline-flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition ${role===r.id?'text-white':'text-white/55 hover:text-white'}`}>
                {role===r.id && <motion.span layoutId="role-pill" className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.18), rgba(124,58,237,0.22))', border: '1px solid rgba(0,229,255,0.35)' }} />}
                <span className="relative inline-flex items-center gap-2"><r.icon size={14} /> {r.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-5 space-y-3">
            <Field icon={Mail}><input type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-transparent outline-none text-sm placeholder-white/35" /></Field>
            <Field icon={Lock}>
              <input type={show?'text':'password'} placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-transparent outline-none text-sm placeholder-white/35" />
              <button type="button" onClick={()=>setShow(s=>!s)} className="text-white/45 hover:text-white">{show?<EyeOff size={15} />:<Eye size={15} />}</button>
            </Field>
            <div className="flex items-center justify-between text-xs">
              <label className="inline-flex items-center gap-2 text-white/55"><input type="checkbox" className="accent-cyan-400" /> Remember me</label>
              <a href="#" className="text-cyan-300 hover:underline">Forgot password?</a>
            </div>
            <button disabled={loading} type="submit" className="zv-btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? 'Signing in…' : (<>Continue <ArrowRight size={16} /></>)}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/35">
            <div className="flex-1 h-px bg-white/10" /> OR <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={submit} className="zv-btn-ghost !py-2.5 text-sm inline-flex items-center justify-center gap-2">
              <GoogleIcon /> Google
            </button>
            <button onClick={submit} className="zv-btn-ghost !py-2.5 text-sm inline-flex items-center justify-center gap-2">
              <GithubIcon /> GitHub
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-white/45">
            New to Zelvora? <Link to="/login" className="text-cyan-300 hover:underline">Create your account</Link>
          </div>
        </motion.div>
        <p className="mt-4 text-center text-[11px] text-white/35">By continuing, you agree to our Terms and Privacy.</p>
      </div>
    </main>
  );
};

const Field = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus-within:border-cyan-400/50 transition">
    <Icon size={15} className="text-white/50" />
    {children}
  </div>
);

const GoogleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#FFC107" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.4 4 9.8 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.3 35.1 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.6 5.1C9.7 39.6 16.3 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5h-1.9V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.3 5.3C40.9 36.6 44 30.8 44 24c0-1.2-.1-2.4-.4-3.5z"/></svg>
);
const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5 3.3 9.3 7.8 10.8.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.8C23.5 5.7 18.3.5 12 .5z"/></svg>
);

export default Login;
