import React from 'react';
import { 
  ShieldCheck, Rocket, Award, Users, Target, Info, AlertTriangle, 
  AlertCircle, Mail, Clock, Globe 
} from 'lucide-react';
import AuroraBackground from '../components/effects/AuroraBackground';

const Terms = () => {
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

      <div className="relative max-w-4xl mx-auto px-6">
        
        {/* HERO STRIP */}
        <div className="relative border-b border-white/5 pb-10 mb-12">
          <div className="absolute -top-20 left-1/3 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight">Terms & Conditions</h1>
              <p className="text-sm text-[#ccd6e0]/60 mt-1 font-mono">labs.zelvoratech.com</p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-white/5 text-white/70 border border-white/10 px-3 py-1.5 rounded-full text-xs font-mono">
                Effective: June 2026
              </span>
              <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5">
                <Globe size={13} className="text-cyan-300" /> Governed by Indian Law
              </span>
              <span className="bg-purple-500/10 text-purple-300 border border-purple-400/20 px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-purple-300" /> IT Act 2000 Compliant
              </span>
            </div>
          </div>
        </div>

        {/* MAIN LEGAL CONTENT */}
        <div className="space-y-16">
            
            {/* INTRODUCTION */}
            <section id="intro" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">INTRODUCTION</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Agreement to Terms</h2>
              
              {/* Blue info highlight box */}
              <div className="bg-cyan-950/20 border border-cyan-500/20 text-cyan-200 rounded-2xl p-5 md:p-6 text-sm leading-relaxed my-6 flex gap-4 items-start shadow-[0_0_15px_rgba(0,212,255,0.05)]">
                <Info size={20} className="text-cyan-400 shrink-0 mt-0.5" />
                <p>
                  These Terms govern use of <strong>labs.zelvoratech.com</strong>, operated by <strong>Zelvora Technologies Pvt. Ltd.</strong>, incorporated under the Companies Act 2013, Hyderabad, India. By accessing or registering on the Platform, the User agrees to these Terms and the Privacy Policy. These Terms are a legally binding agreement under the Information Technology Act, 2000.
                </p>
              </div>
            </section>

            {/* SECTION 01 */}
            <section id="eligibility" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 01</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Eligibility</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>
                  The Platform is open to all age groups. Users under 18 years of age must obtain parental or legal guardian consent before access. By accepting these Terms, the parent or guardian accepts responsibility for the minor's activity and use of the platform.
                </p>
                <p>
                  The User must be fully capable of entering a legally binding contract under the <strong>Indian Contract Act, 1872</strong>. You must provide accurate, current, and complete details at registration.
                </p>
              </div>
            </section>

            {/* SECTION 02 */}
            <section id="accounts" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 02</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">User Accounts</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>
                  The User is solely responsible for maintaining the confidentiality of login credentials. You must notify <strong>info@zelvoratech.com</strong> immediately upon discovering any unauthorized account access or data breach.
                </p>
                <p>
                  All activity recorded under your account is your responsibility. Accounts are non-transferable and cannot be shared, sold, or leased to third parties. We reserve the right to suspend or terminate accounts that violate these guidelines.
                </p>
              </div>
            </section>

            {/* SECTION 03 */}
            <section id="services" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 03</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Platform Services</h2>
              <p className="text-[#ccd6e0] text-sm leading-[1.75] mb-6">
                We provide learners with a project-centric training environment. Our core offerings include:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                {[
                  { icon: Rocket, title: 'Industry Projects', desc: 'Real-world project briefs across web development, design, and other tech domains.' },
                  { icon: Award, title: 'Certificates', desc: 'Verifiable completion certificates upon successful project submission and evaluation.' },
                  { icon: Users, title: 'Mentorship', desc: 'Access to verified industry mentors for code review, feedback, and technical guidance.' },
                  { icon: Target, title: 'Placement Support', desc: 'Optional portfolio and profile sharing with hiring partners, subject to explicit consent.' }
                ].map((item) => (
                  <div key={item.title} className="zv-glass-strong rounded-2xl p-5 hover:border-cyan-400/30 transition duration-300 relative group">
                    <div className="w-10 h-10 rounded-xl grid place-items-center mb-4 bg-cyan-500/10 group-hover:scale-105 transition-transform duration-300">
                      <item.icon className="text-cyan-300" size={18} />
                    </div>
                    <h3 className="font-display font-semibold text-white text-base">{item.title}</h3>
                    <p className="text-xs text-[#ccd6e0]/70 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#ccd6e0]/60 italic">
                Note: We reserve the right to modify, suspend, or discontinue any platform feature or service with reasonable prior notice.
              </p>
            </section>

            {/* SECTION 04 */}
            <section id="payments" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 04</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Fees, Payments & Refunds</h2>
              
              <div className="overflow-x-auto border border-white/5 rounded-2xl bg-black/25 mb-6">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-white/[0.03] text-white border-b border-white/10 font-mono">
                      <th className="p-4 font-medium w-1/4">Topic</th>
                      <th className="p-4 font-medium">Policy Detail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#ccd6e0]/80">
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Payment Terms</td>
                      <td className="p-4">All program fees are due in full at enrollment. Prices listed are in Indian Rupees (INR) and are inclusive of GST.</td>
                    </tr>
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Payment Methods</td>
                      <td className="p-4">Payments are securely processed via third-party gateways using UPI, Net Banking, Debit/Credit Cards, and popular Wallets.</td>
                    </tr>
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Refund Window</td>
                      <td className="p-4">Refund requests are eligible within 7 calendar days of purchase, provided the user has accessed less than 30% of the program content. No refunds will be issued after this 7-day window.</td>
                    </tr>
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Failed Transactions</td>
                      <td className="p-4">In cases where payment is deducted but enrollment is not generated, access will not be granted. Please contact support immediately.</td>
                    </tr>
                    <tr className="even:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">Chargebacks</td>
                      <td className="p-4">Initiating a bank chargeback without contacting our support team first is a policy violation and may result in immediate account suspension.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 05 */}
            <section id="acceptable-use" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 05</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Acceptable Use</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>To preserve the academic integrity of our platform, Users must comply with these guidelines. You must NOT:</p>
                <ul className="list-disc pl-5 space-y-2 text-[#ccd6e0]/80">
                  <li>Resell, share, or redistribute platform course materials or resources.</li>
                  <li>Submit plagiarized projects or undisclosed AI-generated code.</li>
                  <li>Attempt to hack, disable, or compromise website security controls.</li>
                  <li>Impersonate other students, mentors, or platform staff.</li>
                  <li>Upload scripts, malware, or destructive code.</li>
                  <li>Harass, abuse, or disrupt other community members.</li>
                  <li>Use scrapers, spiders, or automated bots to pull platform data.</li>
                  <li>Leverage platform materials for commercial purposes without explicit permission.</li>
                </ul>

                {/* Red danger highlight box */}
                <div className="bg-rose-950/20 border border-rose-500/20 text-rose-200 rounded-2xl p-5 md:p-6 text-sm leading-relaxed my-6 flex gap-4 items-start shadow-[0_0_15px_rgba(244,63,94,0.05)]">
                  <AlertTriangle size={20} className="text-rose-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Violation Warning:</strong> Breach of acceptable use policies will result in immediate account termination without refund, and severe cases will be reported to government authorities under the <strong>Information Technology Act, 2000</strong>.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 06 */}
            <section id="ip" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 06</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Intellectual Property</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>
                  All platform educational content, project roadmaps, design elements, logo branding, graphics, and code templates are the sole intellectual property of <strong>Zelvora Technologies Pvt. Ltd.</strong> and are protected under the <strong>Copyright Act, 1957</strong>.
                </p>
                <p>
                  Users receive a limited, non-exclusive, non-transferable, revocable license for personal, educational use only. Project submissions uploaded by users remain their own intellectual property; however, by submitting them, you grant Zelvora a perpetual, royalty-free, limited license to showcase your submissions on our portfolio and leaderboard pages with proper author attribution.
                </p>
              </div>
            </section>

            {/* SECTION 07 */}
            <section id="credentials" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 07</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Certificates & Credentials</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>
                  Completion certificates are issued solely upon successful project completion and scoring by our review mentors. Our certificates recognize project completion and practical skills; they are not government-recognized university degrees or diplomas.
                </p>
                <p>
                  Zelvora reserves the right to revoke certificates and badges if plagiarism or fraud is discovered post-issuance. Public verification links for your credentials are guaranteed to remain valid for a minimum of 3 years from the issue date.
                </p>
              </div>
            </section>

            {/* SECTION 08 */}
            <section id="user-content" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 08</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">User-Generated Content</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>
                  When you submit content, portfolio links, or community posts, you guarantee that you own the rights to that content. You grant Zelvora a royalty-free license to host and display this content on the platform.
                </p>
                <p>
                  You must not upload defamatory, offensive, copyrighted, or illegal content. Zelvora reserves the right to delete violating content immediately without prior notification.
                </p>
              </div>
            </section>

            {/* SECTION 09 */}
            <section id="third-party" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 09</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Third-Party Links & Services</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>
                  Our platform connects to third-party tools (such as GitHub, YouTube, Vercel, and Figma). These links are provided for learning convenience only.
                </p>
                <p>
                  Zelvora has no control over third-party policies, privacy terms, or content changes. Accessing these external tools is completely at your own risk.
                </p>
              </div>
            </section>

            {/* SECTION 10 */}
            <section id="disclaimers" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 10</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Disclaimers & Limitation of Liability</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                
                {/* Amber warning highlight box */}
                <div className="bg-amber-950/20 border border-amber-500/20 text-amber-200 rounded-2xl p-5 md:p-6 text-sm leading-relaxed my-6 flex gap-4 items-start shadow-[0_0_15px_rgba(245,158,11,0.05)]">
                  <AlertCircle size={20} className="text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Disclaimers:</strong> The platform and all its content are provided on an "as is" and "as available" basis without any express or implied warranties. Zelvora Technologies does not guarantee employment, placements, or specific career outcomes.
                  </p>
                </div>

                <p>
                  Zelvora, its directors, employees, and mentors will not be held liable for any indirect, incidental, or consequential damages resulting from platform downtime or performance issues.
                </p>
                <p>
                  Our total legal liability for any claim arising from your use of the platform is capped at the total fee paid by you in the 3 months preceding the claim.
                </p>
              </div>
            </section>

            {/* SECTION 11 */}
            <section id="indemnity" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 11</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Indemnification</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>
                  The User agrees to indemnify, defend, and hold harmless Zelvora Technologies Pvt. Ltd., its directors, employees, mentors, and processing partners from any legal claims, damages, liabilities, or losses arising from:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-[#ccd6e0]/80">
                  <li>Your violation of these Terms or the Privacy Policy.</li>
                  <li>Your misuse of the platform or its assets.</li>
                  <li>Any user-generated content or code you submit.</li>
                  <li>Your violation of any applicable law or third-party rights.</li>
                </ul>
              </div>
            </section>

            {/* SECTION 12 */}
            <section id="termination" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 12</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Termination</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>
                  Zelvora reserves the right to suspend or terminate your account and platform access if: you breach these Terms, your behavior is determined to be harmful to the community, or we are required to do so by legal directives.
                </p>
                <p>
                  Access will cease immediately upon termination. All fees are non-refundable in cases where termination is for cause. You may request account deletion at any time by contacting our support team.
                </p>
              </div>
            </section>

            {/* SECTION 13 */}
            <section id="modifications" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 13</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Modifications to Terms</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>
                  We reserve the right to modify these Terms at any time. Material changes will be communicated to registered users via email or on-site banner announcements at least 14 days before taking effect.
                </p>
                <p>
                  Your continued use of the platform after the modifications take effect constitutes your agreement to the updated Terms.
                </p>
              </div>
            </section>

            {/* SECTION 14 */}
            <section id="governing-law" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 14</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Governing Law & Dispute Resolution</h2>
              <div className="text-[#ccd6e0] leading-[1.75] text-sm space-y-4">
                <p>
                  These Terms are governed by and construed in accordance with the laws of India.
                </p>
                <p>
                  Any dispute, claim, or difference will first be attempted to be resolved via good-faith negotiation within 30 days. Any unresolved dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in <strong>Hyderabad, Telangana, India</strong>.
                </p>
              </div>
            </section>

            {/* SECTION 15 */}
            <section id="contact" className="scroll-mt-32">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[#ccd6e0]/40 font-mono mb-1">SECTION 15</div>
              <h2 className="font-display text-2xl font-medium mb-4 text-white">Contact Us</h2>
              <p className="text-[#ccd6e0] text-sm leading-[1.75] mb-6">
                If you have questions about these Terms, licensing questions, or support inquiries, please contact our legal and support team:
              </p>

              {/* Glassmorphism Contact Card */}
              <div className="zv-glass-strong rounded-3xl p-6 md:p-8 border border-cyan-400/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 via-purple-500/5 to-transparent opacity-60" />
                <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold uppercase mb-4">
                      Legal & Support
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">Zelvora Technologies Pvt. Ltd.</h3>
                    <p className="text-xs text-white/55 mt-1 font-mono uppercase tracking-wider">Hyderabad, Telangana, India</p>
                    <p className="text-sm text-[#ccd6e0]/80 mt-3 leading-relaxed">
                      LMS Operations and Compliance Department.
                    </p>
                  </div>
                  
                  <div className="space-y-4 md:border-l md:border-white/10 md:pl-8">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl grid place-items-center shrink-0 bg-white/[0.04] border border-white/10">
                        <Mail size={16} className="text-cyan-300" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-[#ccd6e0]/40 font-mono">Email Inquiry</div>
                        <a href="mailto:info@zelvoratech.com" className="text-sm text-white hover:text-cyan-300 transition-colors font-semibold">info@zelvoratech.com</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl grid place-items-center shrink-0 bg-white/[0.04] border border-white/10">
                        <Clock size={16} className="text-purple-300" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-[#ccd6e0]/40 font-mono">SLA Response</div>
                        <div className="text-sm text-white/90 font-semibold">Within 7 business days</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

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

export default Terms;
