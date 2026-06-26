import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Eye, Trash2, XCircle, LifeBuoy, Scale, 
  UserCheck, ShieldAlert, Globe, ChevronRight 
} from 'lucide-react';
import AuroraBackground from '../components/effects/AuroraBackground';

const SECTIONS = [
  { id: 'intro', label: '01. Who We Are' },
  { id: 'data-collect', label: '02. What Data We Collect' },
  { id: 'why-collect', label: '03. Why We Collect Data' },
  { id: 'legal-basis', label: '04. Legal Basis' },
  { id: 'data-share', label: '05. How We Share Data' },
  { id: 'rights', label: '06. Your Rights' },
  { id: 'retention', label: '07. Data Retention' },
  { id: 'security', label: '08. Security Safeguards' },
  { id: 'cookies', label: '09. Cookies & Tracking' },
  { id: 'children', label: '10. Children\'s Data' },
  { id: 'cross-border', label: '11. Cross-Border Transfers' },
];

const Privacy = () => {
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220; // Offset for sticky navbar
      
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 120,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <main className="relative pt-28 pb-20 min-h-screen overflow-hidden bg-[#050d1a] text-white">
      <AuroraBackground />
      
      {/* Background Subtle Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* HERO STRIP */}
        <div className="relative border-b border-white/5 pb-10 mb-12">
          <div className="absolute -top-20 left-1/3 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-black/40 border border-cyan-400/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.15)]">
                <img src="/logo.png" alt="Zelvora" className="w-[55%] h-[55%] object-contain" />
              </div>
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight">Privacy Policy</h1>
                <p className="text-sm text-[#ccd6e0]/60 mt-1 font-mono">labs.zelvoratech.com</p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,212,255,0.1)]">
                <ShieldCheck size={13} className="text-cyan-300" /> DPDP Act 2023 Compliant
              </span>
              <span className="bg-white/5 text-white/70 border border-white/10 px-3 py-1.5 rounded-full text-xs font-mono">
                Effective: June 2025
              </span>
              <span className="bg-purple-500/10 text-purple-300 border border-purple-400/20 px-3 py-1.5 rounded-full text-xs font-mono">
                Full Enforcement: May 2027
              </span>
            </div>
          </div>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* STICKY LEFT SIDEBAR (Collapses to horizontal scroll on mobile) */}
          <aside className="lg:col-span-3">
            {/* Mobile Top Anchor Nav */}
            <div className="lg:hidden sticky top-[72px] z-40 bg-[#050d1a]/90 backdrop-blur-md border border-white/5 rounded-2xl p-2.5 overflow-x-auto whitespace-nowrap flex items-center gap-2 -mx-2 mb-8">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                    activeSection === s.id
                      ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/30'
                      : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {s.label.split('. ')[1]}
                </button>
              ))}
            </div>

            {/* Desktop Sticky Sidebar (Linewise timeline style) */}
            <div className="hidden lg:block sticky top-28 self-start max-h-[calc(100vh-9rem)] overflow-y-auto border-l border-white/5 space-y-2.5 pl-0 pr-2">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#ccd6e0]/40 font-mono mb-4 pl-4 font-semibold">NAVIGATION</div>
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`w-full text-left py-0.5 text-xs md:text-sm transition-all duration-200 block border-l-2 pl-4 -ml-[1.5px] ${
                    activeSection === s.id
                      ? 'border-cyan-400 text-cyan-300 font-medium'
                      : 'border-transparent text-[#ccd6e0]/60 hover:text-white hover:border-white/10'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </aside>

          {/* MAIN LEGAL CONTENT */}
          <div className="lg:col-span-9 space-y-16">
            
            {/* 01. INTRODUCTION */}
            <section id="intro" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 01</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Introduction & Who We Are</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>
                  Welcome to Zelvora Industry Labs (<strong>labs.zelvoratech.com</strong>), a premium project-based education and training platform operated by <strong>Zelvora Technologies Pvt. Ltd.</strong> ("Zelvora", "we", "our", or "us"), headquartered in Hyderabad, Telangana, India. We are committed to protecting the personal data of our users, students, and participants ("Data Principals") in accordance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act 2023)</strong> and other applicable Indian laws.
                </p>
                <p>
                  This Privacy Policy details how we collect, process, store, transfer, and secure your personal data when you register, participate in our labs, submit project portfolios, earn credentials, or access our online systems. By registering or using the platform, you acknowledge and consent to the data practices described herein.
                </p>
              </div>
            </section>

            {/* 02. WHAT DATA WE COLLECT */}
            <section id="data-collect" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 02</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">What Personal Data We Collect</h2>
              <p className="text-[#ccd6e0] text-sm leading-[1.75] mb-6">
                We collect personal data only to the extent necessary to deliver structured industry training, issue verifiable badges, and ensure the security of our platform.
              </p>
              
              <div className="overflow-x-auto border border-white/5 rounded-2xl bg-black/25">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-white/[0.03] text-white border-b border-white/10 font-mono">
                      <th className="p-4 font-medium">Data Category</th>
                      <th className="p-4 font-medium">Specific Elements Collected</th>
                      <th className="p-4 font-medium">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#ccd6e0]/80">
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Profile Information</td>
                      <td className="p-4">Full name, email address, contact phone number, college/university name, degree program, and graduation year.</td>
                      <td className="p-4">User Registration Form</td>
                    </tr>
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Project & LMS Activity</td>
                      <td className="p-4">Code submissions, project repositories, weekly milestone progress, mentor rubrics, scores, and badges earned.</td>
                      <td className="p-4">LMS Platform Submissions</td>
                    </tr>
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Billing Information</td>
                      <td className="p-4">Billing address, billing name, payment status, transaction reference numbers (note: we do not store full credit card/UPI details).</td>
                      <td className="p-4">Third-party Payment Gateway</td>
                    </tr>
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Technical & Usage Logs</td>
                      <td className="p-4">IP address, browser type, operating system version, device identifiers, referral URLs, access times, and click patterns.</td>
                      <td className="p-4">Automatically via server logs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 03. WHY WE COLLECT YOUR DATA */}
            <section id="why-collect" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 03</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Why We Collect Your Data</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>We process your personal data for the following specific and legitimate purposes:</p>
                <ul className="list-disc pl-5 space-y-2.5 text-[#ccd6e0]/80">
                  <li><strong>LMS Platform Delivery:</strong> Managing course tracks, tracking milestones, linking mentor evaluations, and recording grades.</li>
                  <li><strong>Credential Issuance:</strong> Binding verified digital badges (Project Explorer, Project Builder, Industry Ready, Excellence Award) to your profile and providing public QR/URL verification links.</li>
                  <li><strong>Support & Correspondence:</strong> Communicating announcements, project deadlines, mentor feedback, and responding to helpdesk inquiries.</li>
                  <li><strong>Security & Maintenance:</strong> Guarding our systems against malicious activity, detecting plagiarism, and performing technical debugging.</li>
                  <li><strong>Transactional Updates:</strong> Processing certificate fees and delivering legal invoice copies.</li>
                </ul>
              </div>
            </section>

            {/* 04. LEGAL BASIS FOR PROCESSING */}
            <section id="legal-basis" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 04</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Legal Basis for Processing</h2>
              <p className="text-[#ccd6e0] text-sm leading-[1.75] mb-6">
                Under the DPDP Act 2023, data processing must be grounded in lawful bases. We process your data under the following legal provisions:
              </p>
              
              <div className="overflow-x-auto border border-white/5 rounded-2xl bg-black/25">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-white/[0.03] text-white border-b border-white/10 font-mono">
                      <th className="p-4 font-medium">Activity</th>
                      <th className="p-4 font-medium">Data Categories</th>
                      <th className="p-4 font-medium">DPDP Lawful Ground</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#ccd6e0]/80">
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Lab registration & grading</td>
                      <td className="p-4">Profile Data, Academic Progress</td>
                      <td className="p-4">Consent (Section 6)</td>
                    </tr>
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Credential verification page</td>
                      <td className="p-4">Name, Badge, Credential ID</td>
                      <td className="p-4">Consent / Performance of Contractual Terms</td>
                    </tr>
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Payment & receipt delivery</td>
                      <td className="p-4">Billing & Transaction Info</td>
                      <td className="p-4">Performance of Transaction / Legal Obligation</td>
                    </tr>
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Security & log analysis</td>
                      <td className="p-4">IP logs, Technical Logs</td>
                      <td className="p-4">Certain Legitimate Uses (Section 7)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 05. HOW WE SHARE YOUR DATA */}
            <section id="data-share" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 05</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">How We Share Your Data</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>
                  Zelvora does not sell, lease, or rent your personal data to advertisers. We share your data only with trusted partners and sub-processors necessary to run the platform, bound by strict data protection agreements:
                </p>
                <ul className="list-disc pl-5 space-y-2.5 text-[#ccd6e0]/80">
                  <li><strong>Mentors & Evaluators:</strong> Industry professionals who grade submissions see your name and code files.</li>
                  <li><strong>Verification Requestors:</strong> Anyone who queries our system using your public Credential ID or scans your certificate QR code will see your name, badge title, and issuance date to verify authenticity.</li>
                  <li><strong>Service Providers:</strong> Cloud storage (Vercel, MongoDB Atlas), transactional email hosts, and payment gateways.</li>
                  <li><strong>Legal Requirement:</strong> If compelled by an Indian court of law, regulatory board, or government authority.</li>
                </ul>
              </div>
            </section>

            {/* 06. YOUR RIGHTS AS A DATA PRINCIPAL */}
            <section id="rights" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 06</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Your Rights as a Data Principal</h2>
              <p className="text-[#ccd6e0] text-sm leading-[1.75] mb-8">
                In compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act), you possess the following key rights concerning your personal data:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { icon: Eye, title: 'Right to Access', desc: 'Request a summary of your personal data processed and details of third-party sharing.' },
                  { icon: UserCheck, title: 'Right to Correction', desc: 'Correct, complete, or update any inaccurate or outdated information in your profile.' },
                  { icon: Trash2, title: 'Right to Erasure', desc: 'Request deletion of your data when its collection purpose is fulfilled.' },
                  { icon: XCircle, title: 'Withdraw Consent', desc: 'Withdraw consent at any time, easily and without negative consequences for previous processing.' },
                  { icon: LifeBuoy, title: 'Grievance Redressal', desc: 'Submit complaints regarding any platform service directly to our support team at info@zelvoratech.com.' },
                  { icon: Scale, title: 'DPB Complaint', desc: 'Escalate grievances to the Data Protection Board of India if our resolution fails.' }
                ].map((item) => (
                  <div key={item.title} className="zv-glass-strong rounded-2xl p-5 hover:border-cyan-400/35 transition duration-300 relative group">
                    <div className="w-10 h-10 rounded-xl grid place-items-center mb-4 bg-cyan-500/10 group-hover:scale-105 transition-transform duration-300">
                      <item.icon className="text-cyan-300" size={18} />
                    </div>
                    <h3 className="font-display font-semibold text-white text-base">{item.title}</h3>
                    <p className="text-xs text-[#ccd6e0]/70 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 07. DATA RETENTION */}
            <section id="retention" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 07</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Data Retention</h2>
              <p className="text-[#ccd6e0] text-sm leading-[1.75] mb-6">
                We store personal data only as long as required to fulfill the purposes of processing and satisfy regulatory and compliance obligations.
              </p>
              
              <div className="overflow-x-auto border border-white/5 rounded-2xl bg-black/25">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-white/[0.03] text-white border-b border-white/10 font-mono">
                      <th className="p-4 font-medium">Data Category</th>
                      <th className="p-4 font-medium">Retention Period</th>
                      <th className="p-4 font-medium">Reason for Retention</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#ccd6e0]/80">
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Profile & Account Info</td>
                      <td className="p-4">Active registration + 3 years</td>
                      <td className="p-4">Academic history reference & portal re-access</td>
                    </tr>
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Project submissions & files</td>
                      <td className="p-4">5 years from upload</td>
                      <td className="p-4">Academic integrity audits, plagiarism scans, and grade verifications</td>
                    </tr>
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Digital Badges & Credentials</td>
                      <td className="p-4">Indefinite</td>
                      <td className="p-4">Preserving credential ledger integrity for employer checks (unless deleted via principal erasure request)</td>
                    </tr>
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Technical & Audit logs</td>
                      <td className="p-4">180 days</td>
                      <td className="p-4">Security incident auditing and threat analysis</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 08. SECURITY SAFEGUARDS */}
            <section id="security" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 08</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Security Safeguards</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>
                  We implement robust technical and organizational security controls to guard your personal data against accidental loss, unauthorized access, altercations, or leaks:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-[#ccd6e0]/80">
                  <li><strong>Data Encryption:</strong> All platform traffic is encrypted in transit using Transport Layer Security (TLS 1.3) and encrypted at rest on our databases.</li>
                  <li><strong>Access Controls:</strong> Database and server access is restricted using strict role-based access controls (RBAC) and multi-factor authentication (MFA).</li>
                  <li><strong>Milestone Monitoring:</strong> Regular dependency scans, vulnerability reviews, and configuration checkups.</li>
                </ul>
                <p className="mt-3 text-xs text-[#ccd6e0]/60 italic flex items-center gap-1.5 bg-white/[0.02] border border-white/5 rounded-lg p-3">
                  <ShieldAlert size={14} className="text-[#00d4ff] shrink-0 mt-0.5" />
                  Note: While we apply commercial-grade measures to secure your personal data, no internet transmission or database storage can be guaranteed 100% secure.
                </p>
              </div>
            </section>

            {/* 09. COOKIES & TRACKING */}
            <section id="cookies" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 09</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Cookies & Tracking</h2>
              <p className="text-[#ccd6e0] text-sm leading-[1.75] mb-6">
                Our platform uses cookies and similar tracking files to authenticate sessions, record your preferences, and gauge general website traffic patterns.
              </p>
              
              <div className="overflow-x-auto border border-white/5 rounded-2xl bg-black/25">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-white/[0.03] text-white border-b border-white/10 font-mono">
                      <th className="p-4 font-medium">Cookie Category</th>
                      <th className="p-4 font-medium">Purpose</th>
                      <th className="p-4 font-medium">Lifespan</th>
                      <th className="p-4 font-medium">Management</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#ccd6e0]/80">
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Essential Cookies</td>
                      <td className="p-4">Identifies active user sessions, login state, and prevents cross-site request forgery attacks.</td>
                      <td className="p-4">Session only</td>
                      <td className="p-4">Required for basic site functionality.</td>
                    </tr>
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Analytics Cookies</td>
                      <td className="p-4">Tracks anonymous user flows, page load speeds, and bounce rates to optimize user experiences.</td>
                      <td className="p-4">Up to 2 years</td>
                      <td className="p-4">Can block via browser cookie blocker extension.</td>
                    </tr>
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Preference Cookies</td>
                      <td className="p-4">Stores system defaults, theme choices (dark mode), and user interface state.</td>
                      <td className="p-4">1 year</td>
                      <td className="p-4">Adjustable via browser preferences.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 10. CHILDREN'S DATA */}
            <section id="children" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 10</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Children's Data</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>
                  In compliance with the DPDP Act 2023 guidelines on child safety, Zelvora Industry Labs does not target or knowingly collect data from children under the age of 18 without verifiable parental consent.
                </p>
                <p>
                  If you are under 18, your parent or guardian must register on your behalf and authorize your participation. If we discover that we have inadvertently collected personal data from a child under 18 without verifiable parental consent, we will delete that information immediately from our database records.
                </p>
              </div>
            </section>

            {/* 11. CROSS-BORDER DATA TRANSFERS */}
            <section id="cross-border" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 11</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Cross-Border Data Transfers</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>
                  Your personal data is primarily stored on servers located within India. However, we utilize global cloud hosting infrastructure (such as MongoDB Atlas and Vercel CDN) and database processing partners whose servers may be situated globally.
                </p>
                <p>
                  Any cross-border transfer of data is performed in strict compliance with the framework permitted under the DPDP Act 2023. We ensure that our processors implement security safeguards equivalent to our internal standards.
                </p>
              </div>
            </section>

          </div>
        </div>

        {/* BOTTOM PAGE FOOTER */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-[#ccd6e0]/55 gap-4">
          <div>© 2026 Zelvora Technologies Pvt. Ltd. · All Rights Reserved</div>
          <div className="font-mono text-cyan-400/80 hover:text-cyan-300 transition-colors">
            <a href="https://labs.zelvoratech.com" target="_blank" rel="noopener noreferrer">labs.zelvoratech.com</a>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Privacy;
