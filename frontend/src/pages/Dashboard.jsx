import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Trophy, Flame, Calendar, Target, BookOpen, BadgeCheck, TrendingUp, Award, ChevronRight, Sparkles, Zap, Clock, GitBranch, Linkedin, Share2 } from 'lucide-react';
import AuroraBackground from '../components/effects/AuroraBackground';
import { LoadingBlock, ErrorBlock } from '../components/common/ApiStatus';
import { useAuth } from '../context/AuthContext';
import { getStudentMe, getProjects, getBadges, getTracks, getApiErrorMessage } from '../services/api';

const STATUS_STYLES = {
  Approved: 'bg-emerald-400/10 text-emerald-300',
  Submitted: 'bg-emerald-400/10 text-emerald-300',
  'In Review': 'bg-amber-300/10 text-amber-200',
  'In Progress': 'bg-cyan-400/10 text-cyan-200',
};
const getStatusStyle = (status) => STATUS_STYLES[status] || 'bg-cyan-400/10 text-cyan-200';

const Dashboard = () => {
  const { user } = useAuth();

  const studentQuery = useQuery({
    queryKey: ['student', 'me'],
    queryFn: () => getStudentMe().then((r) => r.data),
    retry: 1,
    enabled: !!user && user.role !== 'admin',
  });
  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects().then((r) => r.data),
    retry: 1,
    enabled: !!user && user.role !== 'admin',
  });
  const badgesQuery = useQuery({
    queryKey: ['badges'],
    queryFn: () => getBadges().then((r) => r.data),
    retry: 1,
    enabled: !!user && user.role !== 'admin',
  });
  const tracksQuery = useQuery({
    queryKey: ['tracks'],
    queryFn: () => getTracks().then((r) => r.data),
    retry: 1,
    enabled: !!user && user.role !== 'admin',
  });

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <Navigate to="/admin" replace />;

  const isLoading = studentQuery.isLoading || projectsQuery.isLoading || badgesQuery.isLoading;
  const isError = studentQuery.isError;
  const refetchAll = () => {
    studentQuery.refetch();
    projectsQuery.refetch();
    badgesQuery.refetch();
    tracksQuery.refetch();
  };

  if (isLoading) {
    return (
      <main className="relative pt-28 pb-20 min-h-screen overflow-hidden">
        <AuroraBackground />
        <div className="relative max-w-7xl mx-auto px-6">
          <LoadingBlock label="Loading your dashboard…" />
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
            message={getApiErrorMessage(studentQuery.error, 'Failed to load dashboard data.')}
            onRetry={refetchAll}
          />
        </div>
      </main>
    );
  }

  const student = studentQuery.data;
  const allProjects = projectsQuery.data || [];
  const allBadges = badgesQuery.data || [];
  const allTracks = tracksQuery.data || [];

  const xpPct = Math.round(((student.xp || 0) / (student.xpNext || 2000)) * 100);
  const earnedBadges = allBadges.filter((b) => (student.badges || []).includes(b.id));

  return (
    <main className="relative pt-28 pb-20 min-h-screen overflow-hidden">
      <AuroraBackground />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={student.avatar || `https://i.pravatar.cc/120?u=${student.id}`} alt="" className="w-16 h-16 rounded-2xl ring-2 ring-cyan-400/50" />
              <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-gradient-to-r from-cyan-400 to-purple-500 text-[10px] font-bold text-white">LV {student.level || 1}</div>
            </div>
            <div>
              <div className="text-xs text-white/55 font-mono">Welcome back</div>
              <h1 className="font-display text-2xl md:text-3xl font-bold">{student.name}</h1>
              <div className="text-xs text-white/55">{student.track || 'AI & ML'} · ID {student.id}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/marketplace" className="zv-btn-ghost text-sm inline-flex items-center gap-2"><Target size={14} /> Browse projects</Link>
            <Link to="/verify" className="zv-btn-primary !py-2.5 !px-4 text-sm inline-flex items-center gap-2"><BadgeCheck size={14} /> My credentials</Link>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Zap} label="Total XP" value={(student.xp || 0).toLocaleString()} sub={`Level ${student.level || 1}`} color="#00E5FF" />
          <StatCard icon={Flame} label="Streak" value={`${student.streakDays || 0} days`} sub="Don't break it" color="#F472B6" />
          <StatCard icon={Calendar} label="Attendance" value={`${student.attendance || 100}%`} sub="Last 30 days" color="#00FFA3" />
          <StatCard icon={Trophy} label="Rank" value="#1" sub={`${student.track || 'AI & ML'} track`} color="#FFD700" />
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="zv-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/55 font-mono uppercase tracking-widest">Progress to next tier</div>
                  <div className="mt-1 font-display text-xl font-semibold">{(student.xp || 0).toLocaleString()} / {(student.xpNext || 2000).toLocaleString()} XP</div>
                </div>
                <TrendingUp className="text-emerald-400" />
              </div>
              <div className="mt-4 h-2.5 rounded-full bg-white/[0.05] overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${xpPct}%` }} transition={{ duration: 1.1, ease: 'easeOut' }}
                  className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #00E5FF, #7C3AED, #00FFA3)' }} />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-white/55">
                <span>{xpPct}% complete</span><span>Next: Industry Ready — Platinum</span>
              </div>
            </div>

            <div className="zv-card p-6">
              <div className="flex items-center justify-between">
                <div className="font-display text-lg font-semibold">Assigned projects</div>
                <Link to="/marketplace" className="text-xs text-cyan-300 hover:underline inline-flex items-center gap-1">View all <ChevronRight size={12} /></Link>
              </div>
              <div className="mt-4 space-y-3">
                {(student.assignedProjects || []).length === 0 ? (
                  <div className="text-sm text-white/45 py-4 text-center">No projects assigned yet. <Link to="/marketplace" className="text-cyan-300 hover:underline">Browse marketplace</Link></div>
                ) : (student.assignedProjects || []).map((ap) => {
                  const p = allProjects.find((x) => x.id === ap.id);
                  if (!p) return null;
                  return (
                    <div key={ap.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-400/30 transition">
                      <img src={p.image} alt="" className="w-14 h-14 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-medium truncate">{p.title}</div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${getStatusStyle(ap.status)}`}>{ap.status}</span>
                        </div>
                        <div className="mt-2 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <div className="h-full" style={{ width: `${ap.progress}%`, background: 'linear-gradient(90deg, #00E5FF, #7C3AED)' }} />
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-[11px] text-white/45">
                          <span className="inline-flex items-center gap-1"><Clock size={11} /> Due {ap.due}</span>
                          <span className="inline-flex items-center gap-1"><GitBranch size={11} /> {(p.skills || []).length} skills</span>
                        </div>
                      </div>
                      <button type="button" className="text-cyan-300 hover:text-cyan-200 text-sm">Open</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="zv-card p-6">
              <div className="font-display text-lg font-semibold">Your credentials</div>
              {earnedBadges.length === 0 ? (
                <p className="text-sm text-white/45 mt-4">Complete projects to earn badges.</p>
              ) : (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {earnedBadges.map((b) => (
                    <div key={b.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                      <div className="relative w-12 h-12 mx-auto rounded-full grid place-items-center" style={{ background: `conic-gradient(from 0deg, ${b.color}, #1a1f33, ${b.color})` }}>
                        <div className="w-[42px] h-[42px] rounded-full bg-[#0a0d14] grid place-items-center"><Award size={16} style={{ color: b.color }} /></div>
                      </div>
                      <div className="mt-2 text-xs font-medium">{b.name}</div>
                      <div className="text-[10px] uppercase tracking-widest text-white/45">{b.tier}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center gap-2">
                <button type="button" className="flex-1 zv-btn-ghost !py-2 text-xs inline-flex items-center justify-center gap-1.5"><Linkedin size={12} /> Share</button>
                <button type="button" className="flex-1 zv-btn-ghost !py-2 text-xs inline-flex items-center justify-center gap-1.5"><Share2 size={12} /> Copy link</button>
              </div>
            </div>

            <div className="zv-card p-6">
              <div className="font-display text-lg font-semibold">Achievements</div>
              <div className="mt-4 space-y-3">
                {(student.achievements || []).length === 0 ? (
                  <p className="text-sm text-white/45">No achievements yet. Keep building!</p>
                ) : (student.achievements || []).map((a) => (
                  <div key={a.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg grid place-items-center" style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.18), rgba(124,58,237,0.22))' }}>
                      <Sparkles size={14} className="text-cyan-300" />
                    </div>
                    <div>
                      <div className="text-sm">{a.title}</div>
                      <div className="text-[11px] text-white/45 font-mono">{a.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="zv-card p-6">
              <div className="font-display text-lg font-semibold">Recommended next</div>
              <div className="mt-3 space-y-2">
                {allProjects.slice(3, 6).map((p) => {
                  const t = allTracks.find((x) => x.id === p.track);
                  return (
                    <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition">
                      <BookOpen size={14} style={{ color: t?.color }} />
                      <div className="flex-1 text-sm truncate">{p.title}</div>
                      <span className="text-[10px] text-white/45">{p.duration}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="zv-card p-5 relative overflow-hidden">
    <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }} />
    <div className="relative flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: `${color}22` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-white/45 font-mono">{label}</div>
        <div className="font-display text-xl font-bold">{value}</div>
        <div className="text-[11px] text-white/45">{sub}</div>
      </div>
    </div>
  </motion.div>
);

export default Dashboard;
