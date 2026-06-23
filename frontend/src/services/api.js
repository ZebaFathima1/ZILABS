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

// ─── Projects & Tracks ──────────────────────────────
export const getProjects = () => api.get('/projects');
export const getTracks = () => api.get('/tracks');
export const getBadges = () => api.get('/badges');

// ─── Leaderboard ────────────────────────────────────
export const getLeaderboard = () => api.get('/leaderboard');

// ─── Contact ────────────────────────────────────────
export const getContactInfo = () => api.get('/contact/info');
export const submitContact = (data) => api.post('/contact', data);

export default api;
