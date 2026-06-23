import React from 'react';

const AuroraBackground = ({ withGrid = true, className = '' }) => {
  return (
    <div className={`zv-aurora ${className}`} aria-hidden="true">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      {withGrid && <div className="absolute inset-0 zv-grid-bg" />}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top, rgba(0,229,255,0.05), transparent 60%)' }} />
    </div>
  );
};

export default AuroraBackground;
