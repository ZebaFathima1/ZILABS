import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { BRAND } from '../../mock/mockData';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { to: '/', label: 'Home' },
  { to: '/marketplace', label: 'Projects' },
  { to: '/hall-of-fame', label: 'Hall of Fame' },
  { to: '/verify', label: 'Verify' }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu whenever route changes
  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  const handleLogout = () => { logout(); nav('/'); };
  const handleDashboardNav = () => nav(user?.role === 'admin' ? '/admin' : '/dashboard');

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className={`mx-auto max-w-7xl px-5`}>
        <div className={`flex items-center justify-between rounded-2xl px-4 py-2 transition-all duration-300 ${scrolled ? 'zv-glass-strong' : 'zv-glass'}`}>
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img src={BRAND.logo} alt="Zelvora Technologies" className="h-9 w-auto object-contain" />
            <div className="leading-tight hidden lg:block">
              <div className="text-[10px] text-cyan-300 font-mono font-bold tracking-widest">INDUSTRY LABS</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 mx-4">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => `relative px-4 py-2 text-sm font-medium transition-all ${isActive ? 'text-white' : 'text-white/60 hover:text-white hover:bg-white/5 rounded-xl'}`}
              >
                {({ isActive }) => (
                  <span className="relative z-10">
                    {l.label}
                    {isActive && (
                      <motion.span layoutId="nav-pill" className="absolute left-1 right-1 -bottom-1.5 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            {user ? (
              <div className="flex items-center gap-3">
                <button onClick={handleDashboardNav} className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 transition">
                  {user.role === 'admin' ? <ShieldCheck size={16} className="text-cyan-300" /> : <LayoutDashboard size={16} className="text-cyan-300" />}
                  <span>{user.role === 'admin' ? 'Admin' : 'Dashboard'}</span>
                </button>
                <button onClick={handleLogout} className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition" title="Logout">
                  <LogOut size={16} />
                </button>
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full ring-2 ring-cyan-400/30" />
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition">Sign in</Link>
                <Link to="/login" className="zv-btn-primary !py-2 !px-5 text-sm">Start Building</Link>
              </div>
            )}
          </div>

          <button className="md:hidden p-2 text-white" onClick={() => setOpen(v => !v)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="md:hidden mt-2 zv-glass-strong rounded-2xl p-3 flex flex-col gap-1"
            >
              {links.map(l => (
                <NavLink key={l.to} to={l.to} className="px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5">{l.label}</NavLink>
              ))}
              {user ? (
                <button onClick={handleDashboardNav} className="text-left px-3 py-2 rounded-lg text-sm bg-white/5">{user.role === 'admin' ? 'Admin' : 'Dashboard'}</button>
              ) : (
                <Link to="/login" className="zv-btn-primary text-center !py-2.5 mt-1">Start Building</Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
