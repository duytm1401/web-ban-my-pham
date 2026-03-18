import React from 'react';
import { Truck, Headphones, ShieldCheck } from 'lucide-react';

import mainImg from '../assets/FeaturedArrivals/featured-main.jpg';
import topImg from '../assets/FeaturedArrivals/featured-top.jpg';
import bottomImg from '../assets/FeaturedArrivals/featured-bottom.jpg';

function ComingSoonBadge() {
  return (
    <div style={{
      position: 'absolute', top: 16, left: 16, zIndex: 30,
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '5px 12px', background: 'rgba(6,6,8,0.8)', borderRadius: 50,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#DB4444', animation: 'pulse 1.4s ease infinite' }} />
      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: '#DB4444', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
        Sắp Ra Mắt
      </span>
    </div>
  );
}

export default function FeaturedArrivals() {
  const card = { position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#111' };

  return (
    <section style={{ marginTop: 80, marginBottom: 80, fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,600&display=swap');
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .fa-card { animation: fadeUp .6s ease both; }
        .fa-card:nth-child(1){ animation-delay:.05s }
        .fa-card:nth-child(2){ animation-delay:.18s }
        .fa-card img { transition: transform .9s cubic-bezier(.25,.46,.45,.94); }
        .fa-card:hover img { transform: scale(1.06); }
      `}</style>

      {/* Section label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <div style={{ width: 5, height: 32, background: '#DB4444', borderRadius: 2 }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: '#DB4444', fontFamily: 'sans-serif' }}>Sắp Ra Mắt</span>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: 12, marginBottom: 52 }}>

        {/* Left hero — spans 2 rows */}
        <div className="fa-card" style={{ ...card, gridColumn: 1, gridRow: '1 / 3', minHeight: 540, display: 'flex', alignItems: 'flex-end' }}>
          <ComingSoonBadge />
          <img src={mainImg || 'https://placehold.co/520x700/1a0a0a/888?text=Bo+Suu+Tap'} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(0,0,0,.93) 0%,rgba(0,0,0,.28) 55%,transparent 100%)', zIndex: 10 }} />
          <div style={{ position: 'relative', zIndex: 20, padding: '24px 24px 28px', width: '100%' }}>
            <p style={{ fontSize: 10, color: 'rgba(219,68,68,.75)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'sans-serif' }}>Skincare · Collection 2025</p>
            <h3 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.55rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Bộ Sưu Tập Trang Điểm Mùa Xuân</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.52)', marginTop: 8, lineHeight: 1.65, fontFamily: 'sans-serif' }}>Hương thơm quyến rũ, lưu hương suốt 24h — tỏa sáng mọi góc nhìn.</p>
          </div>
        </div>

        {/* Top right */}
        <div className="fa-card" style={{ ...card, gridColumn: 2, gridRow: 1, minHeight: 258, display: 'flex', alignItems: 'flex-end' }}>
          <ComingSoonBadge />
          <img src={topImg || 'https://placehold.co/520x300/0e0a14/888?text=Serum+B5'} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.72 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(0,0,0,.9) 0%,rgba(0,0,0,.2) 60%,transparent 100%)', zIndex: 10 }} />
          <div style={{ position: 'relative', zIndex: 20, padding: '16px 20px 22px', width: '100%' }}>
            <p style={{ fontSize: 9, color: 'rgba(219,68,68,.75)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 5, fontFamily: 'sans-serif' }}>Serum · Phục hồi</p>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', margin: 0 }}>Serum Phục Hồi Da B5</h3>
          </div>
        </div>

        {/* Bottom right */}
        <div className="fa-card" style={{ ...card, gridColumn: 2, gridRow: 2, minHeight: 258, display: 'flex', alignItems: 'flex-end' }}>
          <ComingSoonBadge />
          <img src={bottomImg || 'https://placehold.co/520x300/0a0e14/888?text=Son+Kem+Li'} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.72 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(0,0,0,.9) 0%,rgba(0,0,0,.2) 60%,transparent 100%)', zIndex: 10 }} />
          <div style={{ position: 'relative', zIndex: 20, padding: '16px 20px 22px', width: '100%' }}>
            <p style={{ fontSize: 9, color: 'rgba(219,68,68,.75)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 5, fontFamily: 'sans-serif' }}>Môi · Màu sắc mới</p>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', margin: 0 }}>Son Kem Lì Mới Nhất</h3>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 38 }}>
        <div style={{ flex: 1, height: 1, background: '#e5e5e5' }} />
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#DB4444' }} />
        <div style={{ flex: 1, height: 1, background: '#e5e5e5' }} />
      </div>

      {/* Service Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 24, textAlign: 'center', fontFamily: 'sans-serif' }}>
        {[
          { Icon: Truck, title: 'Miễn Phí Vận Chuyển', sub: 'Áp dụng cho đơn hàng từ 499k' },
          { Icon: Headphones, title: 'Hỗ Trợ 24/7', sub: 'Luôn sẵn sàng giải đáp thắc mắc' },
          { Icon: ShieldCheck, title: 'Cam Kết Chính Hãng', sub: 'Đền bù 200% nếu phát hiện hàng giả' },
        ].map(({ Icon, title, sub }) => (
          <div key={title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div
              style={{ width: 60, height: 60, borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .25s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#DB4444'; e.currentTarget.querySelector('svg').style.stroke = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f5f5f5'; e.currentTarget.querySelector('svg').style.stroke = '#111'; }}
            >
              <Icon size={26} strokeWidth={1.4} style={{ transition: 'stroke .25s', stroke: '#111' }} />
            </div>
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', margin: '0 0 3px', color: '#111' }}>{title}</h4>
              <p style={{ fontSize: 12, color: '#888', margin: 0, lineHeight: 1.5 }}>{sub}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}