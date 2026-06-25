import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Mail, Send, MessageSquare, Phone, MapPin, Clock } from 'lucide-react';
import AuroraBackground from '../components/effects/AuroraBackground';
import { LoadingBlock, ErrorBlock } from '../components/common/ApiStatus';
import { BRAND, CONTACT } from '../mock/mockData';
import { getContactInfo, submitContact, getApiErrorMessage } from '../services/api';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const contactQuery = useQuery({
    queryKey: ['contact', 'info'],
    queryFn: () => getContactInfo().then((r) => r.data),
    retry: 1,
  });

  const contact = contactQuery.data || CONTACT;
  const responseNote = contact.responseNote || 'We typically respond within 24 hours on business days.';

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await submitContact(form);
      setSubmitted(true);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to send message. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const infoItems = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: 'Address', value: contact.address },
    { icon: Clock, label: 'Hours', value: contact.hours },
  ];

  return (
    <main className="relative pt-28 pb-20 min-h-screen overflow-hidden">
      <AuroraBackground />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80 font-mono">Contact</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Get in <span className="zv-gradient-text-cool">Touch</span>
          </h1>
          <p className="text-white/60 mt-3">
            Have questions about tracks, credentials, or partnerships? We'd love to hear from you.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactQuery.isLoading ? (
              <LoadingBlock label="Loading contact info…" />
            ) : (
              <div className="zv-glass-strong rounded-2xl p-6">
                <div className="font-display font-semibold text-white/90 text-sm tracking-wide">{BRAND.parent}</div>
                <div className="text-xs text-cyan-300/80 font-mono tracking-widest mb-5">INDUSTRY LABS</div>
                <div className="space-y-4">
                  {infoItems.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg grid place-items-center shrink-0 bg-white/[0.04] border border-white/10">
                        <Icon size={16} className="text-cyan-300" />
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-widest text-white/40 font-mono">{label}</div>
                        {href ? (
                          <a href={href} className="text-sm text-white/85 hover:text-cyan-300 transition mt-0.5 block">{value}</a>
                        ) : (
                          <div className="text-sm text-white/85 mt-0.5">{value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="zv-card p-5">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <MessageSquare size={16} className="text-emerald-400" />
                <span>{responseNote}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-3 zv-glass-strong rounded-2xl p-6 md:p-8"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-full mx-auto grid place-items-center bg-emerald-400/10 border border-emerald-400/30 mb-4">
                  <Send size={22} className="text-emerald-400" />
                </div>
                <h2 className="font-display text-2xl font-bold">Message sent!</h2>
                <p className="text-white/60 mt-2 text-sm">Thank you for reaching out. Our team will get back to you at {form.email || 'your email'} soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-display text-xl font-semibold mb-1">Send us a message</h2>
                <p className="text-sm text-white/55 mb-4">Fill out the form and we'll get back to you shortly.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Your Name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                  <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                </div>
                <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Track inquiry, partnership, support..." required />
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/45 font-mono">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="mt-1.5 w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/50 transition resize-none"
                  />
                </div>
                {error && <p className="text-xs text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-lg px-3 py-2">{error}</p>}
                 <button type="submit" disabled={loading} className="zv-btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-70">
                  <Send size={16} /> {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

const Field = ({ label, name, value, onChange, type = 'text', placeholder, required }) => (
  <div>
    <label htmlFor={name} className="text-xs uppercase tracking-widest text-white/45 font-mono">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="mt-1.5 w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/50 transition"
    />
  </div>
);

export default Contact;
