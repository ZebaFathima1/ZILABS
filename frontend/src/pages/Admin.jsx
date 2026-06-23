import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Users, BadgeCheck, ShieldCheck, BarChart3, CheckCircle2, XCircle, Eye, Plus, ArrowUpRight, FileBadge, GraduationCap, Sparkles } from 'lucide-react';
import AuroraBackground from '../components/effects/AuroraBackground';
import { LoadingBlock, ErrorBlock } from '../components/common/ApiStatus';
import { useAuth } from '../context/AuthContext';
import {
  getAdminStats,
  getAdminSubmissions,
  updateSubmissionStatus,
  getTracks,
  getLeaderboard,
  getApiErrorMessage,
} from '../services/api';

const SUBMISSION_STATUS_STYLES = {
  Approved: 'bg-emerald-400/10 text-emerald-300',
  'In Review': 'bg-amber-300/10 text-amber-200',
  Rejected: 'bg-rose-400/10 text-rose-300',
  Pending: 'bg-cyan-400/10 text-cyan-200',
};
const getSubmissionStatusStyle = (status) => SUBMISSION_STATUS_STYLES[status] || 'bg-cyan-400/10 text-cyan-200';

const Admin = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [actionError, setActionError] = useState('');
  const [localSubs, setLocalSubs] = useState([]);

  const statsQuery = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => getAdminStats().then((r) => r.data),
    retry: 1,
    enabled: !!user && user.role === 'admin',
  });
  const submissionsQuery = useQuery({
    queryKey: ['admin', 'submissions'],
    queryFn: () => getAdminSubmissions().then((r) => r.data),
    retry: 1,
    enabled: !!user && user.role === 'admin',
  });
  const tracksQuery = useQuery({
    queryKey: ['tracks'],
    queryFn: () => getTracks().then((r) => r.data),
    retry: 1,
    enabled: !!user && user.role === 'admin',
  });
  const leadersQuery = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => getLeaderboard().then((r) => r.data),
    retry: 1,
    enabled: !!user && user.role === 'admin',
  });

  useEffect(() => {
    if (submissionsQuery.data) setLocalSubs(submissionsQuery.data);
  }, [submissionsQuery.data]);

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => updateSubmissionStatus(id, status),
    onMutate: ({ id, status }) => {
      setActionError('');
      setLocalSubs((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'submissions'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
    onError: (err) => {
      setActionError(getApiErrorMessage(err, 'Failed to update submission status.'));
      queryClient.invalidateQueries({ queryKey: ['admin', 'submissions'] });
    },
  });

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;

  const setStatus = (id, status) => statusMutation.mutate({ id, status });

  const isLoading = statsQuery.isLoading || submissionsQuery.isLoading;
  const isError = statsQuery.isError || submissionsQuery.isError;

  if (isLoading) {
    return (
      <main className="relative pt-28 pb-20 min-h-screen overflow-hidden">
        <AuroraBackground />
        <div className="relative max-w-7xl mx-auto px-6">
          <LoadingBlock label="Loading admin console…" />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="relative pt-28 pb-20 min-h-screen overflow-hidden">
        <AuroraBackground />
        <div className="relative max-w-7xl mx-auto px-6">
          <ErrorBlock
            message={getApiErrorMessage(statsQuery.error || submissionsQuery.error, 'Failed to load admin data.')}
            onRetry={() => {
              statsQuery.refetch();
              submissionsQuery.refetch();
            }}
          />
        </div>
      </main>
    );
  }

  const stats = statsQuery.data || [];
  const tracks = tracksQuery.data || [];
  const leaders = leadersQuery.data || [];
  const subs = localSubs;

  return (
    <main className="relative pt-28 pb-20 min-h-screen overflow-hidden">
      <AuroraBackground />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80 font-mono">Admin Console</div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">Mission control</h1>
          </div>
          <button type="button" className="zv-btn-primary !py-2.5 !px-4 text-sm inline-flex items-center gap-2"><Plus size={14} /> New Program</button>
        </div>

        {actionError && (
          <p className="mt-4 text-xs text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-lg px-3 py-2">{actionError}</p>
        )}

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="zv-card p-5">
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
              <div className="text-xs text-white/55">{subs.filter((s) => s.status === 'Pending' || s.status === 'In Review').length} need review</div>
            </div>
            <div className="mt-4 overflow-x-auto">
              {subs.length === 0 ? (
                <p className="text-sm text-white/45 py-6 text-center">No submissions yet.</p>
              ) : (
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
                    {subs.map((s) => (
                      <tr key={s.id} className="border-t border-white/5">
                        <td className="py-3">{s.student}</td>
                        <td className="py-3 text-white/70">{s.project}</td>
                        <td className="py-3 text-white/55">{s.track}</td>
                        <td className="py-3">
                          <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${getSubmissionStatusStyle(s.status)}`}>{s.status}</span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button type="button" title="View" className="w-8 h-8 grid place-items-center rounded-lg bg-white/[0.04] border border-white/10 hover:border-cyan-400/40"><Eye size={13} className="text-cyan-300" /></button>
                            <button type="button" onClick={() => setStatus(s.id, 'Approved')} disabled={statusMutation.isPending} title="Approve" className="w-8 h-8 grid place-items-center rounded-lg bg-emerald-400/10 border border-emerald-400/20 hover:border-emerald-400/60 disabled:opacity-50"><CheckCircle2 size={13} className="text-emerald-300" /></button>
                            <button type="button" onClick={() => setStatus(s.id, 'Rejected')} disabled={statusMutation.isPending} title="Reject" className="w-8 h-8 grid place-items-center rounded-lg bg-rose-400/10 border border-rose-400/20 hover:border-rose-400/60 disabled:opacity-50"><XCircle size={13} className="text-rose-300" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
                {tracks.slice(0, 5).map((t, i) => {
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
                {leaders.slice(0, 4).map((l) => (
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
  <button type="button" className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-400/[0.04] transition text-left group">
    <Icon size={16} className="text-cyan-300" />
    <div className="mt-2 text-xs">{label}</div>
  </button>
);

export default Admin;
