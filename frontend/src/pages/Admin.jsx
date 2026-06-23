import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, BadgeCheck, ShieldCheck, BarChart3, CheckCircle2, XCircle, Eye, Plus, ArrowUpRight, FileBadge, GraduationCap, Sparkles } from 'lucide-react';
import AuroraBackground from '../components/effects/AuroraBackground';
import { useAuth } from '../context/AuthContext';
import { ADMIN_STATS, ADMIN_SUBMISSIONS, TRACKS, LEADERS } from '../mock/mockData';

const SUBMISSION_STATUS_STYLES = {
  Approved: 'bg-emerald-400/10 text-emerald-300',
  'In Review': 'bg-amber-300/10 text-amber-200',
  Rejected: 'bg-rose-400/10 text-rose-300',
  Pending: 'bg-cyan-400/10 text-cyan-200',
};
const getSubmissionStatusStyle = (status) => SUBMISSION_STATUS_STYLES[status] || 'bg-cyan-400/10 text-cyan-200';

const Admin = () => {
  const { user } = useAuth();
  const [subs, setSubs] = useState(ADMIN_SUBMISSIONS);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;

  const setStatus = (id, status) => setSubs(arr => arr.map(s => s.id === id ? { ...s, status } : s));

  return (
    <main className="relative pt-28 pb-20 min-h-screen overflow-hidden">
      <AuroraBackground />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80 font-mono">Admin Console</div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">Mission control</h1>
          </div>
          <button className="zv-btn-primary !py-2.5 !px-4 text-sm inline-flex items-center gap-2"><Plus size={14} /> New Program</button>
        </div>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ADMIN_STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.05 }} className="zv-card p-5">
              <div className="text-[10px] uppercase tracking-widest text-white/45 font-mono">{s.label}</div>
              <div className="mt-1 font-display text-2xl font-bold zv-gradient-text-cool">{typeof s.value === 'number' ? s.value.toLocaleString() : s.value}</div>
              <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-emerald-300"><ArrowUpRight size={11} /> {s.delta}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 zv-card p-6">
            <div className="flex items-center justify-between">
              <div className="font-display text-lg font-semibold">Pending submissions</div>
              <div className="text-xs text-white/55">{subs.filter(s=>s.status==='Pending'||s.status==='In Review').length} need review</div>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-white/45 font-mono text-left">
                    <th className="py-2 font-medium">Student</th>
                    <th className="py-2 font-medium">Project</th>
                    <th className="py-2 font-medium">Track</th>
                    <th className="py-2 font-medium">Status</th>
                    <th className="py-2 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subs.map(s => (
                    <tr key={s.id} className="border-t border-white/5">
                      <td className="py-3">{s.student}</td>
                      <td className="py-3 text-white/70">{s.project}</td>
                      <td className="py-3 text-white/55">{s.track}</td>
                      <td className="py-3">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${getSubmissionStatusStyle(s.status)}`}>{s.status}</span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button title="View" className="w-8 h-8 grid place-items-center rounded-lg bg-white/[0.04] border border-white/10 hover:border-cyan-400/40"><Eye size={13} className="text-cyan-300" /></button>
                          <button onClick={()=>setStatus(s.id, 'Approved')} title="Approve" className="w-8 h-8 grid place-items-center rounded-lg bg-emerald-400/10 border border-emerald-400/20 hover:border-emerald-400/60"><CheckCircle2 size={13} className="text-emerald-300" /></button>
                          <button onClick={()=>setStatus(s.id, 'Rejected')} title="Reject" className="w-8 h-8 grid place-items-center rounded-lg bg-rose-400/10 border border-rose-400/20 hover:border-rose-400/60"><XCircle size={13} className="text-rose-300" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="zv-card p-6">
              <div className="font-display text-lg font-semibold">Quick actions</div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <ActionTile icon={GraduationCap} label="Add student" />
                <ActionTile icon={FileBadge} label="Issue credential" />
                <ActionTile icon={ShieldCheck} label="Create badge" />
                <ActionTile icon={Sparkles} label="New program" />
              </div>
            </div>

            <div className="zv-card p-6">
              <div className="flex items-center justify-between">
                <div className="font-display text-lg font-semibold">Top tracks</div>
                <BarChart3 size={16} className="text-cyan-300" />
              </div>
              <div className="mt-4 space-y-3">
                {TRACKS.slice(0,5).map((t, i) => {
                  const pct = [88, 76, 64, 52, 44][i];
                  return (
                    <div key={t.id}>
                      <div className="flex items-center justify-between text-xs"><span>{t.name}</span><span className="text-white/55">{pct}%</span></div>
                      <div className="mt-1 h-1.5 rounded-full bg-white/[0.05]">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${t.color}, ${t.color}88)` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="zv-card p-6">
              <div className="font-display text-lg font-semibold">Top students</div>
              <div className="mt-3 space-y-2">
                {LEADERS.slice(0,4).map(l => (
                  <div key={l.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition">
                    <img src={l.avatar} alt="" className="w-8 h-8 rounded-full ring-1 ring-white/10" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate">{l.name}</div>
                      <div className="text-[10px] text-white/45">{l.track}</div>
                    </div>
                    <div className="text-xs font-mono text-cyan-300">{l.xp.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const ActionTile = ({ icon: Icon, label }) => (
  <button className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-400/[0.04] transition text-left group">
    <Icon size={16} className="text-cyan-300" />
    <div className="mt-2 text-xs">{label}</div>
  </button>
);

export default Admin;
