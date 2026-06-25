import React from 'react';
import AuroraBackground from '../components/effects/AuroraBackground';

const Privacy = () => {
  return (
    <main className="relative pt-28 pb-20 min-h-screen overflow-hidden">
      <AuroraBackground />
      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80 font-mono">Legal</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Privacy <span className="zv-gradient-text-cool">Policy</span></h1>
          <p className="text-white/60 mt-3 text-sm">Effective Date: 25 June 2026</p>
        </div>

        <div className="mt-12 zv-glass-strong rounded-3xl p-6 md:p-10 text-white/80 space-y-8 leading-relaxed text-sm">
          <p>
            At Zelvora Technologies Pvt. Ltd., we respect your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you participate in Zelvora Industry Labs.
          </p>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">Information We Collect</h2>
            <p className="mb-3">We may collect:</p>
            <ul className="list-disc pl-5 space-y-2 text-white/70 font-mono text-xs">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Name</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Email Address</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Phone Number</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> College Name</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Educational Details</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Project Information</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Digital Credential Information</li>
            </ul>
          </section>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">How We Use Information</h2>
            <p className="mb-3">Your information is used to:</p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>Register participants</li>
              <li>Manage Industry Labs</li>
              <li>Issue digital badges</li>
              <li>Issue certificates</li>
              <li>Send announcements</li>
              <li>Verify credentials</li>
              <li>Improve our services</li>
            </ul>
          </section>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">Information Sharing</h2>
            <p className="mb-3">We do not sell personal information.</p>
            <p className="mb-3">We may share information only:</p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>When required by law</li>
              <li>With trusted service providers assisting our operations</li>
              <li>With your permission</li>
            </ul>
          </section>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to safeguard personal information. While we strive to protect your data, no online system can guarantee absolute security.
            </p>
          </section>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">Cookies</h2>
            <p>
              Our website may use cookies to improve user experience and website performance.
            </p>
          </section>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">Your Rights</h2>
            <p className="mb-3">You may request to:</p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>Update your information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your personal information (subject to legal or operational requirements)</li>
            </ul>
          </section>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">Contact</h2>
            <p className="mb-1 text-white/70">Email: <a href="mailto:info@zelvoratech.com" className="text-cyan-300 hover:underline">info@zelvoratech.com</a></p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Privacy;
