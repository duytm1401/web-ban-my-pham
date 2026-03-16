import React, { useState, useEffect, useRef, useCallback } from 'react';

import hinh1 from '../assets/anh_banner/anh-1.jpg';
import hinh2 from '../assets/anh_banner/anh-2.jpg';
import hinh3 from '../assets/anh_banner/anh-3.jpg';
import hinh4 from '../assets/anh_banner/anh-4.jpg';
import hinh5 from '../assets/anh_banner/anh-5.jpg';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const bannerData = [
  {
    id: 0,
    tag: "NEW COLLECTION",
    title: "24 Hours Moist",
    subtitle: "Skincare Chuyên Sâu",
    image: hinh1,
    bg: "#122A25",
    accent: "#4CAF88",
  },
  {
    id: 1,
    tag: "NEW FASHION WEEK",
    title: "Premium Makeup",
    subtitle: "Thương Hiệu Mới",
    image: hinh2,
    bg: "#261814",
    accent: "#E8926A",
  },
  {
    id: 2,
    tag: "NEW BRANDS OFFER",
    title: "Flowers Skincare",
    subtitle: "Thành phần tự nhiên",
    image: hinh3,
    bg: "#2D2F3A",
    accent: "#A78BFA",
  },
  {
    id: 3,
    tag: "NEW COLLECTION",
    title: "Nước Hoa Cao Cấp",
    subtitle: "Hương thơm quyến rũ",
    image: hinh4,
    bg: "#2E3C4A",
    accent: "#60A5FA",
  },
  {
    id: 4,
    tag: "PERFUME",
    title: "Shalimar",
    subtitle: "Souffle de Parfum",
    image: hinh5,
    bg: "#003B73",
    accent: "#FCD34D",
  },
];

const DURATION = 4500; // ms mỗi slide

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function BannerSlider() {
  const [current, setCurrent]   = useState(0);
  const [prev,    setPrev]      = useState(null);
  const [dir,     setDir]       = useState(1);   // 1 = next, -1 = prev
  const [animKey, setAnimKey]   = useState(0);   // force re-trigger text anim
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const autoRef     = useRef(null);

  /* ── helpers ── */
  const goTo = useCallback((next, direction) => {
    setPrev(current);
    setDir(direction);
    setCurrent(next);
    setAnimKey(k => k + 1);
    setProgress(0);
  }, [current]);

  const goNext = useCallback(() =>
    goTo((current + 1) % bannerData.length, 1), [current, goTo]);

  const goPrev = useCallback(() =>
    goTo((current - 1 + bannerData.length) % bannerData.length, -1), [current, goTo]);

  /* ── auto-play + progress bar ── */
  useEffect(() => {
    setProgress(0);
    const start = performance.now();
    const tick = (now) => {
      const pct = Math.min(((now - start) / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) progressRef.current = requestAnimationFrame(tick);
    };
    progressRef.current = requestAnimationFrame(tick);
    autoRef.current = setTimeout(goNext, DURATION);
    return () => {
      cancelAnimationFrame(progressRef.current);
      clearTimeout(autoRef.current);
    };
  }, [current, goNext]);

  /* ── keyboard ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft')  goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── Slide enter/exit ── */
        @keyframes slideInRight  { from { transform: translateX(60px);  opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideInLeft   { from { transform: translateX(-60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(-60px); opacity: 0; } }
        @keyframes slideOutLeft  { from { transform: translateX(0); opacity: 1; } to { transform: translateX(60px);  opacity: 0; } }

        /* ── Text stagger ── */
        @keyframes fadeUp   { from { transform: translateY(22px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeDown { from { transform: translateY(-14px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .slide-tag    { animation: fadeDown .45s ease both; }
        .slide-title  { animation: fadeUp  .5s  ease both .1s; }
        .slide-sub    { animation: fadeUp  .5s  ease both .2s; }
        .slide-cta    { animation: fadeUp  .5s  ease both .32s; }

        /* ── Image zoom pulse ── */
        @keyframes imgReveal { from { transform: scale(1.12); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .slide-img-enter { animation: imgReveal .75s cubic-bezier(.22,.68,0,1.2) both; }

        /* ── Decorative ring spin ── */
        @keyframes spinSlow { to { transform: rotate(360deg); } }
        .ring-spin { animation: spinSlow 18s linear infinite; }

        /* ── Progress bar ── */
        .progress-fill { transition: width 50ms linear; }

        /* ── Dot bounce ── */
        @keyframes dotPop { 0%,100% { transform: scale(1); } 50% { transform: scale(1.3); } }
        .dot-active { animation: dotPop .3s ease; }

        /* ── CTA button ── */
        .cta-btn {
          position: relative;
          overflow: hidden;
        }
        .cta-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,.15);
          transform: translateX(-100%);
          transition: transform .3s ease;
        }
        .cta-btn:hover::after { transform: translateX(0); }
      `}</style>

      <div
        className="flex-1 lg:ml-10 relative h-[260px] sm:h-[350px] lg:h-[450px] rounded-xl overflow-hidden z-30 select-none"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >

        {/* ── SLIDES ── */}
        {bannerData.map((banner, index) => {
          const isActive = index === current;
          const isPrev   = index === prev;

          const enterAnim = dir === 1  ? 'slideInRight'  : 'slideInLeft';
          const exitAnim  = dir === 1  ? 'slideOutLeft'  : 'slideOutRight';

          if (!isActive && !isPrev) return null;

          return (
            <div
              key={banner.id}
              className="absolute inset-0 flex items-center justify-between px-6 sm:px-10 lg:px-16 text-white"
              style={{
                background: `linear-gradient(135deg, ${banner.bg} 0%, ${banner.bg}ee 60%, ${banner.bg}99 100%)`,
                animation: isActive
                  ? `${enterAnim} .6s cubic-bezier(.22,.68,0,1.05) both`
                  : `${exitAnim} .55s ease forwards`,
                zIndex: isActive ? 10 : 5,
              }}
            >

              {/* ── Decorative circles ── */}
              <div
                className="absolute right-8 top-6 w-32 h-32 sm:w-52 sm:h-52 lg:w-80 lg:h-80 rounded-full border pointer-events-none ring-spin"
                style={{ borderColor: `${banner.accent}30` }}
              />
              <div
                className="absolute right-12 top-10 w-20 h-20 sm:w-36 sm:h-36 lg:w-60 lg:h-60 rounded-full border pointer-events-none"
                style={{
                  borderColor: `${banner.accent}20`,
                  animation: 'spinSlow 12s linear infinite reverse',
                }}
              />
              {/* Glow blob */}
              <div
                className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none blur-3xl opacity-20"
                style={{ background: banner.accent }}
              />

              {/* ── TEXT ── */}
              <div className="w-1/2 relative z-10" key={`text-${animKey}`}>
                {/* Tag */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 slide-tag">
                  <span
                    className="w-5 h-[2px] rounded-full"
                    style={{ background: banner.accent }}
                  />
                  <span
                    className="text-[9px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase"
                    style={{ color: banner.accent }}
                  >
                    {banner.tag}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="text-xl sm:text-3xl lg:text-[2.6rem] font-semibold leading-[1.15] mb-2 sm:mb-3 slide-title"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '0.01em' }}
                >
                  {banner.title}
                </h2>

                {/* Subtitle */}
                <p className="text-[11px] sm:text-sm lg:text-base font-light text-white/70 mb-4 sm:mb-7 slide-sub">
                  {banner.subtitle}
                </p>

                {/* CTA */}
                <a
                  href="#"
                  className="cta-btn inline-flex items-center gap-2 text-[11px] sm:text-sm font-medium
                             px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-white/30
                             hover:border-white transition-colors slide-cta"
                  style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(6px)' }}
                >
                  Mua Ngay
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>

              {/* ── IMAGE ── */}
              <div
                key={`img-${animKey}`}
                className="relative flex-shrink-0 w-28 h-28 sm:w-44 sm:h-44 lg:w-[280px] lg:h-[280px]"
              >
                {/* Glow ring behind image */}
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-40"
                  style={{ background: banner.accent }}
                />
                <div
                  className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 slide-img-enter"
                  style={{ boxShadow: `0 0 40px ${banner.accent}40` }}
                >
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  {/* Subtle shine overlay */}
                  <div className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)' }}
                  />
                </div>
              </div>

            </div>
          );
        })}

        {/* ── SLIDE NUMBER ── */}
        <div className="absolute top-4 right-5 z-20 text-white/40 text-xs font-medium tabular-nums hidden sm:block">
          {String(current + 1).padStart(2, '0')} / {String(bannerData.length).padStart(2, '0')}
        </div>

        {/* ── PREV / NEXT ARROWS ── */}
        {[
          { dir: -1, pos: 'left-3 sm:left-5', label: 'Trước', icon: 'M19 12H5M12 5l-7 7 7 7' },
          { dir:  1, pos: 'right-3 sm:right-5', label: 'Tiếp',  icon: 'M5 12h14M12 5l7 7-7 7' },
        ].map(({ dir: d, pos, label, icon }) => (
          <button
            key={label}
            aria-label={label}
            onClick={() => d === 1 ? goNext() : goPrev()}
            className={`absolute ${pos} top-1/2 -translate-y-1/2 z-20
                        w-8 h-8 sm:w-10 sm:h-10 rounded-full
                        flex items-center justify-center
                        bg-white/10 hover:bg-white/25 backdrop-blur-sm
                        border border-white/15 hover:border-white/30
                        text-white transition-all duration-200 hover:scale-110`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d={icon} />
            </svg>
          </button>
        ))}

        {/* ── DOTS + PROGRESS ── */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          {/* Dots */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {bannerData.map((banner, index) => (
              <button
                key={index}
                aria-label={`Slide ${index + 1}`}
                onClick={() => goTo(index, index > current ? 1 : -1)}
                className="relative transition-all duration-300 rounded-full overflow-hidden"
                style={{
                  width:  current === index ? '28px' : '8px',
                  height: '8px',
                  background: current === index ? banner.accent : 'rgba(255,255,255,0.35)',
                }}
              >
                {/* Progress fill on active dot */}
                {current === index && (
                  <span
                    className="absolute inset-y-0 left-0 rounded-full progress-fill"
                    style={{
                      width: `${progress}%`,
                      background: 'rgba(255,255,255,0.5)',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}