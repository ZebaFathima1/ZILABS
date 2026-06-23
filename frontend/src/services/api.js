import axios from 'axios';
import API_BASE_URL from '../config';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

export const getApiErrorMessage = (err, fallback = 'Something went wrong. Please try again.') => {
  const detail = err?.response?.data?.detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    const messages = detail.map((d) => d.msg || d.message).filter(Boolean);
    if (messages.length) return messages.join(', ');
  }
  return err?.message || fallback;
};

// Attach JWT token from localStorage to every request
api.interceptors.request.use((config) => {
  try {
    const saved = localStorage.getItem('zv_user');
    if (saved) {
      const user = JSON.parse(saved);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
  } catch {
    // ignore invalid localStorage
  }
  return config;
});

// ─── Auth ───────────────────────────────────────────
export const authLogin = (data) => api.post('/auth/login', data);
export const authRegister = (data) => api.post('/auth/register', data);
export const authMe = () => api.get('/auth/me');

// ─── Projects & Tracks ──────────────────────────────
export const getProjects = () => api.get('/projects');
export const getTracks = () => api.get('/tracks');
export const getBadges = () => api.get('/badges');

// ─── Leaderboard ────────────────────────────────────
export const getLeaderboard = () => api.get('/leaderboard');

// ─── Student ────────────────────────────────────────
export const getStudentMe = () => api.get('/student/me');

// ─── Contact ────────────────────────────────────────
export const submitContact = (data) => api.post('/contact', data);

// ─── Admin ──────────────────────────────────────────
export const getAdminStats = () => api.get('/admin/stats');
export const getAdminSubmissions = () => api.get('/admin/submissions');
export const updateSubmissionStatus = (id, status) =>
  api.patch(`/admin/submissions/${id}`, { status });

export default api;
