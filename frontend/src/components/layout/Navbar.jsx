import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BRAND } from '../../mock/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'verify', label: 'Verify', isRoute: true },
  { id: 'halloffame', label: 'Hall of Fame' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Section highlight spy via IntersectionObserver
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('verify');
      return;
    }

    const sections = ['home', 'about', 'projects', 'halloffame', 'faq', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Center of viewport trigger
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [location.pathname, location.key]);

  const handleNavClick = (link, e) => {
    e?.preventDefault();
    setOpen(false);

    if (link.isRoute) {
      navigate('/verify');
      setActiveSection('verify');
      return;
    }

    if (location.pathname === '/') {
      const el = document.getElementById(link.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${link.id}`);
    }
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="mx-auto max-w-7xl px-5">
        <div className={`flex items-center justify-between rounded-2xl px-4 py-2 transition-all duration-300 ${scrolled ? 'zv-glass-strong' : 'zv-glass'}`}>
          <Link to="/" onClick={(e) => handleNavClick({ id: 'home' }, e)} className="flex items-center gap-2.5 group shrink-0">
            <img src={BRAND.logo} alt="Zelvora Technologies" className="h-9 w-auto object-contain" />
            <div className="leading-tight hidden lg:block">
              <div className="text-[10px] text-cyan-300 font-mono font-bold tracking-widest">INDUSTRY LABS</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 mx-4">
            {navLinks.map(l => {
              const isActive = activeSection === l.id;
              return (
                <button
                  key={l.id}
                  onClick={(e) => handleNavClick(l, e)}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-all ${isActive ? 'text-white' : 'text-white/60 hover:text-white hover:bg-white/5 rounded-xl'}`}
                >
                  <span className="relative z-10">{l.label}</span>
                  {isActive && (
                    <motion.span layoutId="nav-pill" className="absolute left-1 right-1 -bottom-1.5 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Kept header spacing consistent, verify button in hero serves as secondary CTA */}
            <Link to="/verify" className="zv-btn-ghost !py-2 !px-5 text-sm">Verify Credential</Link>
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
              {navLinks.map(l => {
                const isActive = activeSection === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={(e) => handleNavClick(l, e)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition ${isActive ? 'text-white bg-white/5 font-semibold' : 'text-white/80 hover:bg-white/5'}`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
