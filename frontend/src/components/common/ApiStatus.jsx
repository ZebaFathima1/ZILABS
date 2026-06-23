import React from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';

export const LoadingBlock = ({ label = 'Loading…' }) => (
  <div className="flex flex-col items-center justify-center py-16 text-white/55">
    <Loader2 size={28} className="animate-spin text-cyan-300 mb-3" />
    <p className="text-sm">{label}</p>
  </div>
);

export const ErrorBlock = ({ message, onRetry }) => (
  <div className="zv-card p-8 text-center border-rose-500/20">
    <AlertCircle size={28} className="mx-auto text-rose-400 mb-3" />
    <p className="text-rose-300 text-sm">{message || 'Failed to load data. Please try again.'}</p>
    {onRetry && (
      <button type="button" onClick={onRetry} className="zv-btn-ghost mt-4 text-sm">
        Retry
      </button>
    )}
  </div>
);
