import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, Mail } from 'lucide-react';
import AuroraBackground from '../components/effects/AuroraBackground';
import { FAQS, CONTACT } from '../mock/mockData';

const FAQItem = ({ item, isOpen, onToggle }) => (
  <div className="border-b border-white/5 last:border-0 font-sans">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      aria-expanded={isOpen}
    >
      <span className="font-display font-medium text-white/90 group-hover:text-cyan-300 transition">{item.q}</span>
      <ChevronDown
        size={18}
        className={`shrink-0 text-white/40 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-300' : ''}`}
      />
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <p className="pb-5 text-sm text-white/60 leading-relaxed pr-8">{item.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <main className="relative pt-28 pb-20 min-h-screen overflow-hidden">
      <AuroraBackground />
      <div className="relative max-w-3xl mx-auto px-6">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80 font-mono">FAQ</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Frequently Asked <span className="zv-gradient-text">Questions</span>
          </h1>
          <p className="text-white/60 mt-3">Everything you need to know about Zelvora Industry Labs.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="mt-12 zv-glass-strong rounded-2xl px-6 md:px-8"
        >
          {FAQS.map((item, i) => (
            <FAQItem
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-10 zv-card p-6 md:p-8 text-center"
        >
          <HelpCircle className="mx-auto text-cyan-300 mb-3" size={24} />
          <h2 className="font-display text-xl font-semibold">Still have questions?</h2>
          <p className="text-sm text-white/55 mt-2">
            Our team is happy to help. Send us a message.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="zv-btn-primary inline-flex items-center gap-2 text-sm">
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default FAQ;
