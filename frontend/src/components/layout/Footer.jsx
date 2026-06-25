import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Mail } from 'lucide-react';
import { BRAND, CONTACT } from '../../mock/mockData';

const Footer = () => {
  return (
    <footer className="relative mt-24 border-t border-[#00dcb4]/15 bg-[#0a0e1a]">
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Left - Brand block */}
          <div className="col-span-1 md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-2">
              <img src={BRAND.logo} alt="Zelvora Technologies" className="h-16 w-auto object-contain mx-auto md:mx-0" />
              <div className="text-[11px] text-[#00dcb4] font-mono tracking-widest font-bold uppercase">INDUSTRY LABS</div>
            </div>
            <p className="mt-4 text-sm text-[#c8d0e0] max-w-sm leading-relaxed mx-auto md:mx-0">
              Build real-world projects. Earn digital credentials. Become industry ready.
            </p>
            <div className="text-xs text-[#7a8499] mt-2">A Zelvora Technologies initiative.</div>
            <div className="mt-6 flex items-center justify-center md:justify-start gap-2">
              {[
                { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/zelvora-technologies/?viewAsMember=true' },
                { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/zelvora.technologies' },
                { Icon: Mail, label: 'Email', href: `mailto:${CONTACT.email}` },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} aria-label={label} className="w-9 h-9 grid place-items-center rounded-lg bg-white/[0.02] border border-white/10 hover:border-[#00dcb4] hover:text-[#00dcb4] transition text-[#c8d0e0] duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Middle & Right - Platform and Company columns */}
          {[
            { title: 'Platform', items: [['Tracks','/marketplace'], ['Hall of Fame','/hall-of-fame'], ['Verify Credential','/verify']] },
            { title: 'Company', items: [['About','/about'], ['FAQ','/faq'], ['Contact','/contact']] }
          ].map(col => (
            <div key={col.title} className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="font-display font-semibold text-white/90 text-sm tracking-wide">{col.title}</div>
              <ul className="mt-4 space-y-3">
                {col.items.map(([label, href]) => (
                  <li key={label} className="flex items-center justify-center md:justify-start">
                    <span className="text-[#00dcb4] mr-2 font-bold select-none text-xs">•</span>
                    <Link to={href} className="text-sm text-[#c8d0e0] hover:text-[#00dcb4] transition-colors duration-200">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col md:flex-row gap-3 items-center justify-between text-xs">
          <div className="text-[#3d4557] font-semibold">© 2026 Zelvora Technologies Pvt. Ltd. All rights reserved.</div>
          <div className="flex items-center gap-2 text-[#3d4557] font-semibold">
            <Link to="/terms" className="hover:text-[#00dcb4] transition-colors duration-200">Terms</Link>
            <span className="select-none">|</span>
            <Link to="/privacy" className="hover:text-[#00dcb4] transition-colors duration-200">Privacy</Link>
            <span className="select-none">|</span>
            <a href="#" className="hover:text-[#00dcb4] transition-colors duration-200">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
