import React, { useEffect, useRef } from 'react';

// ---- Pure helpers (no React, easy to test, reduce hook complexity) ----
function hexA(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function createParticles(count, w, h, dpr) {
  return Array.from({ length: count }).map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35 * dpr,
    vy: (Math.random() - 0.5) * 0.35 * dpr,
    r: (Math.random() * 1.6 + 0.6) * dpr,
  }));
}

function applyMouseRepulsion(p, mouse, dpr) {
  if (!mouse.active) return;
  const dx = p.x - mouse.x;
  const dy = p.y - mouse.y;
  const d2 = dx * dx + dy * dy;
  const radius = 140 * dpr;
  if (d2 >= radius * radius) return;
  const dist = Math.sqrt(d2);
  const force = (radius - dist) / radius;
  p.x += (dx / dist) * force * 1.5;
  p.y += (dy / dist) * force * 1.5;
}

function updateParticle(p, w, h) {
  p.x += p.vx;
  p.y += p.vy;
  if (p.x < 0 || p.x > w) p.vx *= -1;
  if (p.y < 0 || p.y > h) p.vy *= -1;
}

function drawParticle(ctx, p, color, dpr) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 8 * dpr;
  ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

function drawLink(ctx, a, b, dist, link, color, accent, dpr) {
  const alpha = 1 - dist / link;
  const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
  grad.addColorStop(0, hexA(color, alpha * 0.6));
  grad.addColorStop(1, hexA(accent, alpha * 0.45));
  ctx.strokeStyle = grad;
  ctx.lineWidth = 0.6 * dpr;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function drawLinks(ctx, particles, link, color, accent, dpr) {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < link) drawLink(ctx, a, b, dist, link, color, accent, dpr);
    }
  }
}

// ---- Component ----
const ParticleField = ({
  density = 70,
  color = '#00E5FF',
  accent = '#7C3AED',
  linkDistance = 130,
  mouseInteract = true,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    let w = (canvas.width = canvas.offsetWidth * dpr);
    let h = (canvas.height = canvas.offsetHeight * dpr);
    const particles = createParticles(density, w, h, dpr);

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = canvas.offsetHeight * dpr;
    };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) * dpr;
      mouseRef.current.y = (e.clientY - rect.top) * dpr;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener('resize', onResize);
    if (mouseInteract) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseleave', onLeave);
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const link = linkDistance * dpr;
      for (const p of particles) {
        updateParticle(p, w, h);
        applyMouseRepulsion(p, mouseRef.current, dpr);
        drawParticle(ctx, p, color, dpr);
      }
      drawLinks(ctx, particles, link, color, accent, dpr);
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      if (mouseInteract) {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseleave', onLeave);
      }
    };
  }, [density, color, accent, linkDistance, mouseInteract]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ParticleField;
