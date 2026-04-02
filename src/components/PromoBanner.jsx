import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&display=swap');
  @keyframes pb-fadeLeft { from { opacity: 0; transform: translateX(-28px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes pb-fadeRight { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes pb-fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pb-glow { 0%, 100% { opacity: 0.16; transform: scale(1); } 50% { opacity: 0.28; transform: scale(1.05); } }
  @keyframes pb-float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
  @keyframes pb-shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  @keyframes pb-flip { 0% { transform: translateY(-5px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }

  .pb-label   { animation: pb-fadeLeft 550ms cubic-bezier(0.4,0,0.2,1) both; animation-delay: 60ms; }
  .pb-heading { animation: pb-fadeLeft 550ms cubic-bezier(0.4,0,0.2,1) both; animation-delay: 150ms; font-family: 'Cormorant Garamond', Georgia, serif; }
  .pb-timer   { animation: pb-fadeUp  550ms cubic-bezier(0.4,0,0.2,1) both; animation-delay: 260ms; }
  .pb-cta     { animation: pb-fadeUp  550ms cubic-bezier(0.4,0,0.2,1) both; animation-delay: 360ms; }
  .pb-image-wrap { animation: pb-fadeRight 600ms cubic-bezier(0.4,0,0.2,1) both; animation-delay: 180ms; }
  .pb-img-float  { animation: pb-float 5s ease-in-out infinite; }
  .pb-glow-orb   { animation: pb-glow  4s ease-in-out infinite; }

  .pb-shimmer-line {
    background: linear-gradient(90deg, transparent 0%, rgba(219,68,68,0.7) 40%, rgba(255,255,255,0.85) 50%, rgba(219,68,68,0.7) 60%, transparent 100%);
    background-size: 200% auto; animation: pb-shimmer 3s linear infinite;
  }
  .pb-digit-flip { animation: pb-flip 180ms cubic-bezier(0.4,0,0.2,1); }
  .pb-btn {
    transition: background 200ms ease, transform 200ms cubic-bezier(0.4,0,0.2,1), box-shadow 200ms ease, letter-spacing 200ms ease;
    position: relative; overflow: hidden;
  }
  .pb-btn::after {
    content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
    opacity: 0; transition: opacity 200ms ease;
  }
  .pb-btn:hover::after { opacity: 1; }
  .pb-btn:hover { background: #c03838 !important; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(219,68,68,0.42); letter-spacing: 0.06em; }
  .pb-btn:active { transform: translateY(0); box-shadow: none; }
  .pb-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"); opacity: 0.03; mix-blend-mode: overlay; }
`;

function TimerBlock({ value, label }) {
  const [prevVal, setPrevVal] = useState(value);
  const [flip, setFlip]       = useState(false);
  const pad = String(value).padStart(2, '0');

  useEffect(() => {
    if (value !== prevVal) {
      setFlip(true); setPrevVal(value);
      const t = setTimeout(() => setFlip(false), 180);
      return () => clearTimeout(t);
    }
  }, [value, prevVal]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ width: 52, height: 52, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.11)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)', pointerEvents: 'none' }} />
        <span className={flip ? 'pb-digit-flip' : ''} style={{ fontSize: 20, fontWeight: 700, color: '#fff', lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>{pad}</span>
      </div>
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

// NHẬN BIẾN `banner` TỪ THẺ CHA
export default function PromoBanner({ banner }) {
  const injected = useRef(false);
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 23, minutes: 59, seconds: 35 });

  useEffect(() => {
    if (!injected.current) {
      const tag = document.createElement('style');
      tag.textContent = STYLES;
      document.head.appendChild(tag);
      injected.current = true;
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else { minutes = 59; if (hours > 0) hours--; else { hours = 23; if (days > 0) days--; } }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Nếu không có dữ liệu truyền vào thì ẩn
  if (!banner) return null;

  return (
    <section className="mt-10 lg:mt-20 mb-10 lg:mb-20">
      <div style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0d0d0d 100%)', borderRadius: 4, overflow: 'hidden', position: 'relative', minHeight: 280, display: 'flex', alignItems: 'stretch' }}>
        <div className="pb-noise" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: 90, height: 90, borderTop: '1px solid rgba(219,68,68,0.3)', borderLeft: '1px solid rgba(219,68,68,0.3)', borderTopLeftRadius: 4 }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 90, height: 90, borderBottom: '1px solid rgba(219,68,68,0.18)', borderRight: '1px solid rgba(219,68,68,0.18)', borderBottomRightRadius: 4 }} />
          <div className="pb-shimmer-line" style={{ position: 'absolute', bottom: 40, left: 0, right: 0, height: 1, opacity: 0.25 }} />
          <svg style={{ position: 'absolute', right: 0, top: 0, opacity: 0.05 }} width="220" height="220" viewBox="0 0 220 220">
            {Array.from({ length: 6 }).map((_, r) => Array.from({ length: 6 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={c * 36 + 18} cy={r * 36 + 18} r="1.5" fill="white" />
            )))}
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', padding: 'clamp(24px, 4vw, 48px)', gap: 24 }}>
          {/* ══ LEFT ══ */}
          <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column' }}>
            <div className="pb-label" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 20, height: 2, background: '#DB4444', borderRadius: 2 }} />
              <span style={{ color: '#DB4444', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {banner.tag}
              </span>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h2 className="pb-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: 0, letterSpacing: '-0.01em' }}>
                {banner.title1} <span style={{ color: '#DB4444' }}>{banner.highlight}</span>
              </h2>
              <h2 className="pb-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: 0, letterSpacing: '-0.01em' }}>
                {banner.title2}
              </h2>
            </div>

            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, rgba(219,68,68,0.8), transparent)', marginBottom: 16 }} />
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.5, marginBottom: 24, maxWidth: 300 }}>
              {banner.description}
            </p>

            <div className="pb-timer" style={{ display: 'flex', gap: 10, marginBottom: 28, alignItems: 'flex-start' }}>
              <TimerBlock value={timeLeft.days}    label="Ngày" />
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 18, paddingTop: 11, fontWeight: 300 }}>:</span>
              <TimerBlock value={timeLeft.hours}   label="Giờ" />
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 18, paddingTop: 11, fontWeight: 300 }}>:</span>
              <TimerBlock value={timeLeft.minutes} label="Phút" />
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 18, paddingTop: 11, fontWeight: 300 }}>:</span>
              <TimerBlock value={timeLeft.seconds} label="Giây" />
            </div>

            <div className="pb-cta" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <Link to={banner.linkTarget} className="pb-btn" style={{ background: '#DB4444', color: '#fff', border: 'none',padding: '11px 28px', borderRadius: 3,fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase',display: 'inline-block',textDecoration: 'none' }}>
                Mua Ngay
              </Link>
              <Link to={banner.linkTarget} style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.18)', paddingBottom: 2, transition: 'color 200ms ease' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}>
                Xem chi tiết →
              </Link>
            </div>
          </div>

          {/* ══ RIGHT — Image ══ */}
          <div className="pb-image-wrap" style={{ flex: '1 1 220px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 200 }}>
            <div className="pb-glow-orb" style={{ position: 'absolute', width: '70%', height: '70%', background: 'radial-gradient(ellipse, rgba(219,68,68,0.2) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(28px)', pointerEvents: 'none' }} />
            <img className="pb-img-float" src={banner.image} alt="Sản phẩm khuyến mãi" style={{ width: '100%', maxWidth: 340, height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.55))', position: 'relative', zIndex: 2 }} />
          </div>
        </div>
      </div>
    </section>
  );
}