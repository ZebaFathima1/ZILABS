import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, BadgeCheck, User, Award, Share2, Linkedin, Mail, CheckCircle2, AlertCircle, FileImage, FileText } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import AuroraBackground from '../components/effects/AuroraBackground';
import ParticleField from '../components/effects/ParticleField';
import { useCredentialVerification } from '../hooks/useCredentialVerification';

// Animation variants
const FADE = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
const FADE_UP = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 } };
const FADE_SCALE = { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0 } };
const PULSE_HALO = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1.6, opacity: 0 },
  transition: { duration: 1.4, repeat: Infinity },
};

const Verify = () => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [state, setState] = useState('idle'); // idle | searching | found | notfound | error
  const [isDownloading, setIsDownloading] = useState(null); // null | 'image' | 'pdf'
  const cardRef = useRef(null);
  
  const { verifyCredential, isError: isDBError, isFetched, isLoading: isDBLoading } = useCredentialVerification();

  const getBadgeDetails = (badgeNameStr) => {
    const name = String(badgeNameStr).toLowerCase();
    if (name.includes('excellence')) {
      return {
        img: '/excellence-badge.png',
        name: 'Excellence Award Badge',
        color: 'rgba(124, 58, 237, 0.2)',
        shadow: 'drop-shadow-[0_0_20px_rgba(124,58,237,0.4)]'
      };
    }
    if (name.includes('practitioner') || name.includes('ready')) {
      return {
        img: '/practitioner-badge.png',
        name: 'Industry Practitioner Badge',
        color: 'rgba(0, 229, 255, 0.2)',
        shadow: 'drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]'
      };
    }
    if (name.includes('builder') || name.includes('gold')) {
      return {
        img: '/builder-badge.png',
        name: 'Project Builder Badge',
        color: 'rgba(251, 191, 36, 0.2)',
        shadow: 'drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]'
      };
    }
    return {
      img: '/explorer-badge.png',
      name: 'Project Explorer Badge',
      color: 'rgba(34, 211, 238, 0.2)',
      shadow: 'drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]'
    };
  };

  const badgeDetails = getBadgeDetails(result?.Badge || '');
  const badgeImg = badgeDetails.img;
  const badgeName = badgeDetails.name;
  const badgeColor = badgeDetails.color;
  const badgeDropShadow = badgeDetails.shadow;

  const handleVerify = useCallback((credentialId) => {
    if (!credentialId?.trim()) return;
    
    setState('searching');
    setResult(null);

    const performLookup = () => {
      if (isDBError) {
        setState('error');
        return;
      }

      const match = verifyCredential(credentialId);
      if (match) {
        setResult(match);
        setState('found');
      } else {
        setState('notfound');
      }
    };

    if (isDBLoading && !isFetched) {
      const checkInterval = setInterval(() => {
        if (!isDBLoading || isFetched) {
          clearInterval(checkInterval);
          setTimeout(performLookup, 800);
        }
      }, 100);
      return;
    }

    setTimeout(performLookup, 1200);
  }, [verifyCredential, isDBError, isDBLoading, isFetched]);

  useEffect(() => {
    if (isFetched) {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      if (id && state === 'idle') {
        setCode(id);
        handleVerify(id);
      }
    }
  }, [isFetched, state, handleVerify]);

  const onVerifySubmit = (e) => {
    e?.preventDefault();
    handleVerify(code);
  };

  const shareableUrl = result ? `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(result['Credential ID'])}` : window.location.href;

  const handleLinkedInShare = () => {
    if (!result) return;
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableUrl)}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
  };

  const downloadAsImage = async () => {
    if (!cardRef.current || !result) return;
    setIsDownloading('image');
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // High resolution
        backgroundColor: '#0a0a0a',
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
          const el = clonedDoc.querySelector('[data-capture="credential-card"]');
          if (el) {
            el.style.borderRadius = '24px';
            el.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            const badge = el.querySelector('img');
            if (badge && badge.src) {
              const isPremiumBadge = badge.src.includes('explorer-badge.png') || 
                                     badge.src.includes('builder-badge.png') || 
                                     badge.src.includes('practitioner-badge.png') || 
                                     badge.src.includes('excellence-badge.png');
              if (!isPremiumBadge) {
                badge.style.clipPath = 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)';
              }
            }
          }
        }
      });
      const link = document.createElement('a');
      link.download = `Zelvora_Badge_${result['Credential ID']}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (err) {
      console.error('Image download failed:', err);
    } finally {
      setIsDownloading(null);
    }
  };

  const downloadAsPDF = async () => {
    if (!cardRef.current || !result) return;
    setIsDownloading('pdf');
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: '#0a0a0a',
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
          const el = clonedDoc.querySelector('[data-capture="credential-card"]');
          if (el) {
            el.style.borderRadius = '24px';
            const badge = el.querySelector('img');
            if (badge && badge.src) {
              const isPremiumBadge = badge.src.includes('explorer-badge.png') || 
                                     badge.src.includes('builder-badge.png') || 
                                     badge.src.includes('practitioner-badge.png') || 
                                     badge.src.includes('excellence-badge.png');
              if (!isPremiumBadge) {
                badge.style.clipPath = 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)';
              }
            }
          }
        }
      });
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 3, canvas.height / 3],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 3, canvas.height / 3);
      pdf.save(`Zelvora_Credential_${result['Credential ID']}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setIsDownloading(null);
    }
  };

  return (
    <main className="relative pt-28 pb-20 min-h-screen overflow-hidden">
      <AuroraBackground />
      <div className="absolute inset-0 opacity-50"><ParticleField density={45} /></div>
      <div className="relative max-w-3xl mx-auto px-6">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80 font-mono">Credential Verification</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Verify a <span className="zv-gradient-text">Zelvora credential</span></h1>
          <p className="text-white/60 mt-3">Paste a credential ID below to verify authenticity in seconds.</p>
        </div>

        <form onSubmit={onVerifySubmit} className="mt-8 zv-glass-strong rounded-2xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-4 py-2 sm:py-3">
            <ShieldCheck size={18} className="text-cyan-300" />
            <input 
              value={code} 
              onChange={e => setCode(e.target.value)} 
              placeholder="e.g. ZIL-PE-0001" 
              className="flex-1 bg-transparent outline-none font-mono text-sm placeholder-white/35 uppercase tracking-wider text-white" 
            />
          </div>
          <button 
            type="submit" 
            className="zv-btn-primary w-full sm:w-auto !py-2.5 !px-5 inline-flex items-center justify-center gap-2"
          >
            <Search size={16} /> Verify
          </button>
        </form>

        <div className="mt-3 text-center text-xs text-white/40">
          Try: <button onClick={() => { setCode('ZIL-PE-0001'); handleVerify('ZIL-PE-0001'); }} className="font-mono text-cyan-300 hover:underline">ZIL-PE-0001</button>
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {state === 'searching' && (
              <motion.div key="s" {...FADE} className="text-center py-12">
                <div className="inline-block w-8 h-8 border-2 border-cyan-300/20 border-t-cyan-300 rounded-full animate-spin mb-4"></div>
                <div className="text-white/55 text-sm font-medium tracking-wide">Verifying Credential...</div>
              </motion.div>
            )}

            {state === 'error' && (
              <motion.div key="e" {...FADE_UP} className="zv-card p-10 text-center border-rose-500/30">
                <AlertCircle size={32} className="mx-auto text-rose-400 mb-4" />
                <div className="text-rose-300 font-display text-lg">Unable to verify credentials right now.</div>
                <div className="text-sm text-white/55 mt-2">Please try again later.</div>
              </motion.div>
            )}

            {state === 'notfound' && (
              <motion.div key="n" {...FADE_UP} className="zv-card p-10 text-center border-amber-500/20">
                <div className="text-amber-300 font-display text-lg">Credential Not Found</div>
                <div className="text-sm text-white/55 mt-2">Please check your Credential ID and try again.</div>
              </motion.div>
            )}

            {state === 'found' && result && (
              <motion.div key="f" {...FADE_SCALE} className="flex flex-col gap-8">
                {/* Downloadable Card Container */}
                <div 
                  ref={cardRef} 
                  data-capture="credential-card"
                  className="relative zv-glass-strong rounded-3xl p-5 sm:p-10 overflow-hidden border-emerald-500/20 bg-[#0a0a0a]"
                >
                  <motion.div {...PULSE_HALO} className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-emerald-400/10" />
                  
                  <div className="relative text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-sm font-bold tracking-widest uppercase mb-6">
                      <CheckCircle2 size={16} /> VERIFIED
                    </div>
                    
                    <div className="relative w-44 h-44 sm:w-64 sm:h-64 mx-auto mb-6">
                      <div className="absolute inset-0 blur-3xl rounded-full" style={{ backgroundColor: badgeColor }} />
                      <img 
                        src={badgeImg} 
                        alt={badgeName} 
                        className={`relative w-full h-full object-contain ${badgeDropShadow}`}
                      />
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">{badgeName}</h2>
                  </div>

                  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 p-5 sm:p-8 zv-glass rounded-2xl border border-white/5">
                    <Row icon={ShieldCheck} label="Credential ID" value={result['Credential ID']} mono />
                    <Row icon={User} label="Student Name" value={result.Name} />
                    <Row icon={Mail} label="Email" value={result.Email} />
                    <Row icon={BadgeCheck} label="Badge" value={result.Badge} />
                    <Row icon={Award} label="Status" value={result.Status} status />
                    <Row icon={ShieldCheck} label="Issued By" value="Zelvora Industry Labs" />
                  </div>
                </div>

                {/* Actions Section */}
                <div className="flex flex-col items-stretch sm:items-center gap-6">
                  <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 w-full">
                    <button 
                      onClick={handleLinkedInShare}
                      className="zv-btn-primary flex items-center justify-center gap-3 px-8 py-3 text-base shadow-lg shadow-cyan-500/20 w-full sm:w-auto"
                    >
                      <Linkedin size={20} /> Share on LinkedIn
                    </button>
                    <button 
                      onClick={downloadAsPDF}
                      disabled={!!isDownloading}
                      className="zv-btn-ghost flex items-center justify-center gap-2 px-6 py-3 border border-white/10 hover:bg-white/5 disabled:opacity-50 w-full sm:w-auto"
                    >
                      <FileText size={18} /> {isDownloading === 'pdf' ? 'Generating PDF...' : 'Download PDF'}
                    </button>
                    <button 
                      onClick={downloadAsImage}
                      disabled={!!isDownloading}
                      className="zv-btn-ghost flex items-center justify-center gap-2 px-6 py-3 border border-white/10 hover:bg-white/5 disabled:opacity-50 w-full sm:w-auto"
                    >
                      <FileImage size={18} /> {isDownloading === 'image' ? 'Processing...' : 'Download Image'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

const Row = ({ icon: Icon, label, value, mono, status }) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono mb-1.5">
      <Icon size={12} className="text-cyan-300/60" /> {label}
    </div>
    <div className={`text-white/90 break-words ${mono ? 'font-mono text-sm' : 'text-base font-semibold'} ${status && value?.toLowerCase() === 'active' ? 'text-emerald-300' : ''}`}>
      {value || '—'}
    </div>
  </div>
);

export default Verify;
