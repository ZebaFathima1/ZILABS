import React from 'react';
import AuroraBackground from '../components/effects/AuroraBackground';

const Terms = () => {
  return (
    <main className="relative pt-28 pb-20 min-h-screen overflow-hidden">
      <AuroraBackground />
      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80 font-mono">Legal</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Terms & <span className="zv-gradient-text-cool">Conditions</span></h1>
          <p className="text-white/60 mt-3 text-sm">Effective Date: 25 June 2026</p>
        </div>

        <div className="mt-12 zv-glass-strong rounded-3xl p-6 md:p-10 text-white/80 space-y-8 leading-relaxed text-sm">
          <p>
            Welcome to Zelvora Technologies Pvt. Ltd. ("Zelvora", "we", "our", or "us"). By accessing or using <span className="text-cyan-300">labs.zelvoratech.com</span>, you agree to comply with these Terms & Conditions.
          </p>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">1. Eligibility</h2>
            <p>
              Participants must provide accurate registration details while joining Zelvora Industry Labs. We reserve the right to reject or cancel registrations containing false or misleading information.
            </p>
          </section>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">2. Industry Labs Program</h2>
            <p className="mb-3">
              Zelvora Industry Labs is an educational and industry exposure program designed to provide students with:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>Real-world projects</li>
              <li>Digital badges and credentials</li>
              <li>Mentorship</li>
              <li>Portfolio development</li>
              <li>Industry exposure</li>
              <li>Certificates upon successful completion (where applicable)</li>
            </ul>
            <p className="mt-3">
              Participation does not guarantee employment, internships, placements, or project selection.
            </p>
          </section>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">3. Digital Credentials</h2>
            <p className="mb-3">
              Digital badges and credentials issued by Zelvora are intended to recognize participation, achievements, and milestones.
            </p>
            <p className="mb-3">
              Any misuse, modification, duplication, resale, or false representation of Zelvora-issued credentials is strictly prohibited.
            </p>
            <p>
              Zelvora reserves the right to revoke any credential obtained through fraud, misconduct, or policy violations.
            </p>
          </section>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">4. Certificates</h2>
            <p className="mb-3">
              Certificates are issued only after satisfying the applicable program requirements.
            </p>
            <p>
              Administrative processing fees may apply.
            </p>
          </section>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">5. Fees</h2>
            <p className="mb-3">
              Certain services, including certificate processing, may require payment.
            </p>
            <p>
              Current certificate processing fee: <strong className="text-cyan-300">₹115</strong> (subject to change without prior notice).
            </p>
          </section>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">6. User Conduct</h2>
            <p className="mb-3">
              Participants agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>Submit false information</li>
              <li>Copy or plagiarize project work</li>
              <li>Misuse Zelvora branding</li>
              <li>Share confidential project information</li>
              <li>Disrupt community activities</li>
            </ul>
            <p className="mt-3">
              Violation may result in suspension or permanent removal.
            </p>
          </section>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">7. Intellectual Property</h2>
            <p className="mb-3">
              All logos, badges, digital credentials, website content, graphics, branding, and educational material remain the intellectual property of Zelvora Technologies Pvt. Ltd.
            </p>
            <p>
              No content may be copied, reproduced, distributed, or commercially used without written permission.
            </p>
          </section>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">8. Limitation of Liability</h2>
            <p className="mb-3">
              Zelvora shall not be responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>Personal device issues</li>
              <li>Internet interruptions</li>
              <li>Third-party service failures</li>
              <li>Indirect or consequential damages</li>
            </ul>
          </section>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">9. Changes</h2>
            <p className="mb-3">
              We reserve the right to modify these Terms & Conditions at any time.
            </p>
            <p>
              Continued use of the platform constitutes acceptance of the revised terms.
            </p>
          </section>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">10. Refund & Cancellation Policy</h2>
            <p className="mb-3">
              The certificate processing fee is currently: <strong className="text-cyan-300">₹115</strong>.
            </p>
            <p className="mb-3">
              <strong>Refund Eligibility:</strong> Refunds may be provided only if:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-white/70 mb-3">
              <li>Duplicate payment is made.</li>
              <li>Payment is deducted but the transaction fails.</li>
              <li>Zelvora cancels the program before commencement.</li>
            </ul>
            <p className="mb-3">
              <strong>Non-refundable Cases:</strong> Refunds will not be issued if:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-white/70 mb-3">
              <li>A participant voluntarily withdraws.</li>
              <li>Certificate generation has already started.</li>
              <li>Digital credentials or certificates have already been issued.</li>
              <li>Incorrect information was submitted by the participant.</li>
            </ul>
            <p>
              Approved refunds will normally be processed within 7–14 business days, depending on the payment provider.
            </p>
          </section>

          <section className="border-t border-white/5 pt-6">
            <h2 className="font-display text-lg font-bold text-white mb-3">11. Contact</h2>
            <p className="mb-2"><strong>Zelvora Technologies Pvt. Ltd.</strong></p>
            <p className="mb-1 text-white/70">Hyderabad, Telangana, India</p>
            <p className="mb-1 text-white/70">Email: <a href="mailto:info@zelvoratech.com" className="text-cyan-300 hover:underline">info@zelvoratech.com</a></p>
            <p className="text-white/70">Website: <a href="https://labs.zelvoratech.com" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">labs.zelvoratech.com</a></p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Terms;
