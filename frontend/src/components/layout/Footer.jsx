import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Mail } from 'lucide-react';
import { BRAND, CONTACT } from '../../mock/mockData';

const Footer = () => {
  return (
    <footer className="relative mt-24 border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top, rgba(124,58,237,0.10), transparent 60%)' }} />
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="flex flex-col gap-2">
              <img src={BRAND.logo} alt="Zelvora Technologies" className="h-16 w-auto object-contain" />
              <div className="text-[11px] text-cyan-300/80 font-mono tracking-widest">INDUSTRY LABS</div>
            </div>
            <p className="mt-4 text-sm text-white/60 max-w-sm">
              Build real-world projects. Earn digital credentials. Become industry ready. A Zelvora Technologies initiative.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/zelvora-technologies/?viewAsMember=true' },
                { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/zelvora.technologies' },
                { Icon: Mail, label: 'Email', href: `mailto:${CONTACT.email}` },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} className="w-9 h-9 grid place-items-center rounded-lg bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition text-white/70">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: 'Platform', items: [['Tracks','/marketplace'], ['Hall of Fame','/hall-of-fame'], ['Verify Credential','/verify']] },
            { title: 'Company', items: [['About','/about'], ['FAQ','/faq'], ['Contact','/contact']] }
          ].map(col => (
            <div key={col.title}>
              <div className="font-display font-semibold text-white/90 text-sm tracking-wide">{col.title}</div>
              <ul className="mt-3 space-y-2">
                {col.items.map(([label, href]) => (
                  <li key={label}>
                    <Link to={href} className="text-sm text-white/55 hover:text-cyan-300 transition">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/45">
          <div>© {new Date().getFullYear()} {BRAND.parent}. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-cyan-300">Terms</a>
            <a href="#" className="hover:text-cyan-300">Privacy</a>
            <a href="#" className="hover:text-cyan-300">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
