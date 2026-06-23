import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, GraduationCap, User } from 'lucide-react';
import AuroraBackground from '../components/effects/AuroraBackground';
import ParticleField from '../components/effects/ParticleField';
import { LoadingBlock } from '../components/common/ApiStatus';
import { useAuth } from '../context/AuthContext';
import { BRAND } from '../mock/mockData';

const Login = () => {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, login, register, authLoading } = useAuth();
  const nav = useNavigate();

  if (authLoading) {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <AuroraBackground />
        <LoadingBlock label="Checking session…" />
      </main>
    );
  }

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  };

  const submit = async (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (mode === 'login') {
        result = await login({ email, password });
      } else {
        if (!name.trim()) {
          setError('Please enter your full name.');
          return;
        }
        result = await register({ name: name.trim(), email, password, role });
      }

      if (result.success) {
        nav(result.user.role === 'admin' ? '/admin' : '/dashboard');
      } else {
        setError(result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <AuroraBackground />
      <div className="absolute inset-0 opacity-60"><ParticleField density={50} linkDistance={110} /></div>
      <div className="relative max-w-md w-full mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="zv-glass-strong rounded-3xl p-8"
        >
          <div className="flex flex-col items-center text-center gap-2">
            <img src={BRAND.logo} className="h-14 w-auto object-contain" alt="Zelvora Technologies" />
            <div className="text-[11px] text-cyan-300/80 font-mono tracking-widest">INDUSTRY LABS</div>
          </div>

          {/* Sign In / Sign Up toggle */}
          <div className="mt-6 grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/10">
            {[
              { id: 'login', label: 'Sign In' },
              { id: 'register', label: 'Sign Up' },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => switchMode(m.id)}
                className={`relative py-2 rounded-lg text-sm transition ${mode === m.id ? 'text-white' : 'text-white/55 hover:text-white'}`}
              >
                {mode === m.id && (
                  <motion.span
                    layoutId="mode-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,229,255,0.18), rgba(124,58,237,0.22))',
                      border: '1px solid rgba(0,229,255,0.35)',
                    }}
                  />
                )}
                <span className="relative">{m.label}</span>
              </button>
            ))}
          </div>

          {/* Role selector */}
          <div className="mt-3 grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/10">
            {[
              { id: 'student', label: 'Student', icon: GraduationCap },
              { id: 'admin', label: 'Admin', icon: ShieldCheck },
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`relative inline-flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition ${role === r.id ? 'text-white' : 'text-white/55 hover:text-white'}`}
              >
                {role === r.id && (
                  <motion.span
                    layoutId="role-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,229,255,0.12), rgba(124,58,237,0.15))',
                      border: '1px solid rgba(0,229,255,0.2)',
                    }}
                  />
                )}
                <span className="relative inline-flex items-center gap-2">
                  <r.icon size={14} /> {r.label}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-5 space-y-3">
            {mode === 'register' && (
              <Field icon={User}>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full bg-transparent outline-none text-sm placeholder-white/35"
                />
              </Field>
            )}
            <Field icon={Mail}>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-sm placeholder-white/35"
              />
            </Field>
            <Field icon={Lock}>
              <input
                type={show ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-sm placeholder-white/35"
              />
              <button type="button" onClick={() => setShow(s => !s)} className="text-white/45 hover:text-white shrink-0">
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </Field>

            {mode === 'login' && (
              <div className="flex items-center justify-between text-xs">
                <label className="inline-flex items-center gap-2 text-white/55">
                  <input type="checkbox" className="accent-cyan-400" /> Remember me
                </label>
                <a href="#" className="text-cyan-300 hover:underline">Forgot password?</a>
              </div>
            )}

            {error && (
              <p className="text-xs text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              type="submit"
              className="zv-btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading
                ? (mode === 'login' ? 'Signing in…' : 'Creating account…')
                : (<>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={16} /></>)
              }
            </button>
          </form>

          {mode === 'login' && (
            <>
              <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/35">
                <div className="flex-1 h-px bg-white/10" /> Demo accounts <div className="flex-1 h-px bg-white/10" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-white/50">
                <button
                  onClick={() => { setEmail('aarav@zelvoratech.com'); setPassword('zelvora123'); }}
                  className="zv-btn-ghost !py-2 text-xs"
                >
                  Student demo
                </button>
                <button
                  onClick={() => { setEmail('admin@zelvoratech.com'); setPassword('admin123'); setRole('admin'); }}
                  className="zv-btn-ghost !py-2 text-xs"
                >
                  Admin demo
                </button>
              </div>
            </>
          )}

          <div className="mt-5 text-center text-xs text-white/45">
            {mode === 'login'
              ? <>New to Zelvora? <button onClick={() => switchMode('register')} className="text-cyan-300 hover:underline">Create your account</button></>
              : <>Already have an account? <button onClick={() => switchMode('login')} className="text-cyan-300 hover:underline">Sign in</button></>
            }
          </div>
        </motion.div>
        <p className="mt-4 text-center text-[11px] text-white/35">By continuing, you agree to our Terms and Privacy.</p>
      </div>
    </main>
  );
};

const Field = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus-within:border-cyan-400/50 transition">
    <Icon size={15} className="text-white/50 shrink-0" />
    {children}
  </div>
);

export default Login;
