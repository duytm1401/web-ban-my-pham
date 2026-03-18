import React, { useState } from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import qrCodeImg from '../assets/Footer/qr-code.png';
import bctImg from '../assets/Footer/bo-cong-thuong.png';

/* ── Micro-components ─────────────────────────────────────── */
function NavLink({ children }) {
  const [h, setH] = useState(false);
  return (
    <span
      style={{
        fontSize: 13, color: h ? '#fff' : '#6b7280',
        display: 'block', padding: h ? '5px 0 5px 14px' : '5px 0',
        cursor: 'pointer', transition: 'all .2s', fontWeight: 400,
        position: 'relative',
      }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    >
      {h && <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 4, height: 4, borderRadius: '50%', background: '#DB4444' }} />}
      {children}
    </span>
  );
}

function SocBtn({ children, title }) {
  const [h, setH] = useState(false);
  return (
    <div
      title={title}
      style={{
        width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
        border: `1px solid ${h ? '#DB4444' : 'rgba(255,255,255,.12)'}`,
        background: h ? '#DB4444' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: h ? '#fff' : '#6b7280', cursor: 'pointer',
        transform: h ? 'translateY(-2px)' : 'none',
        transition: 'all .25s',
      }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    >
      {children}
    </div>
  );
}

function PayTag({ children }) {
  const [h, setH] = useState(false);
  return (
    <span
      style={{
        fontSize: 10, fontWeight: 600, letterSpacing: '.8px',
        padding: '5px 11px',
        border: `1px solid ${h ? '#DB4444' : 'rgba(255,255,255,.12)'}`,
        borderRadius: 4, color: h ? '#DB4444' : '#6b7280',
        cursor: 'pointer', transition: 'all .22s',
      }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    >
      {children}
    </span>
  );
}

function ColTitle({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap' }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.07)' }} />
    </div>
  );
}

/* ── Main Footer ──────────────────────────────────────────── */
export default function Footer() {
  const [emailFocus, setEmailFocus] = useState(false);
  const [sendHover, setSendHover] = useState(false);

  return (
    <footer style={{ width: '100%', background: '#0c0c0e', color: '#fff', fontFamily: '"DM Sans", sans-serif', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>

      {/* ── Hero Top Band ── */}
      <div style={{ width: '100%', borderBottom: '1px solid rgba(255,255,255,.06)', padding: '56px 64px 48px', position: 'relative', overflow: 'hidden' }}>
        {/* Huge ghost text */}
        <div style={{
          position: 'absolute', bottom: -20, left: 40, pointerEvents: 'none', userSelect: 'none',
          fontFamily: '"Playfair Display", serif', fontSize: 160, fontWeight: 900,
          color: 'rgba(255,255,255,.025)', lineHeight: 1, whiteSpace: 'nowrap',
        }}>AURELIA</div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, position: 'relative', zIndex: 2 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 2, background: '#DB4444' }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 3, color: '#DB4444', textTransform: 'uppercase' }}>Beauty Store</span>
            </div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.4rem,5vw,4rem)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: -1, margin: 0 }}>
              Aurelia<em style={{ fontStyle: 'italic', color: '#DB4444' }}>.</em>
            </h2>
            <p style={{ fontSize: 14, color: '#6b7280', marginTop: 12, maxWidth: 300, lineHeight: 1.7, fontWeight: 300 }}>
              Nơi vẻ đẹp đích thực hội tụ — mỹ phẩm chính hãng từ những thương hiệu uy tín toàn cầu.
            </p>
          </div>

          {/* Email subscribe */}
          <div style={{ flexShrink: 0, maxWidth: 320, width: '100%' }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: '#9ca3af', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>
              Nhận ưu đãi độc quyền
            </p>
            <p style={{ fontSize: 13, color: '#4b5563', marginBottom: 16, lineHeight: 1.6 }}>
              Đăng ký để nhận ngay <span style={{ color: '#DB4444', fontWeight: 500 }}>ưu đãi 10%</span> cho đơn hàng đầu tiên.
            </p>
            <div style={{ display: 'flex', height: 44 }}>
              <input
                type="email"
                placeholder="your@email.com"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                style={{
                  flex: 1, background: 'rgba(255,255,255,.05)',
                  border: `1px solid ${emailFocus ? '#DB4444' : 'rgba(255,255,255,.1)'}`,
                  borderRight: 'none', borderRadius: '6px 0 0 6px',
                  padding: '0 16px', fontSize: 13, color: '#fff',
                  fontFamily: '"DM Sans", sans-serif', outline: 'none', transition: 'border-color .2s',
                }}
              />
              <button
                onMouseEnter={() => setSendHover(true)}
                onMouseLeave={() => setSendHover(false)}
                style={{
                  padding: '0 22px', background: sendHover ? '#bf3535' : '#DB4444',
                  border: 'none', borderRadius: '0 6px 6px 0',
                  color: '#fff', fontSize: 12, fontWeight: 600, letterSpacing: '.5px',
                  cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
                  whiteSpace: 'nowrap', transition: 'background .2s',
                }}
              >
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Links Grid ── */}
      <div style={{ width: '100%', padding: '48px 64px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48 }}>

          {/* Liên hệ */}
          <div>
            <ColTitle>Liên Hệ</ColTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <svg style={{ flexShrink: 0, marginTop: 2 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DB4444" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, fontWeight: 300 }}>Phường 1, Gò Vấp,<br />Hồ Chí Minh</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <svg style={{ flexShrink: 0 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DB4444" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                <NavLink>support@aureliastore.vn</NavLink>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <svg style={{ flexShrink: 0 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DB4444" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.58a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" /></svg>
                <NavLink>0936-1836-18</NavLink>
              </div>
            </div>
          </div>

          {/* Tài khoản */}
          <div>
            <ColTitle>Tài Khoản</ColTitle>
            <NavLink>Tài khoản của tôi</NavLink>
            <NavLink>Đăng nhập / Đăng ký</NavLink>
            <NavLink>Giỏ hàng</NavLink>
            <NavLink>Danh sách yêu thích</NavLink>
            <NavLink>Theo dõi đơn hàng</NavLink>
          </div>

          {/* Chính sách */}
          <div>
            <ColTitle>Chính Sách</ColTitle>
            <NavLink>Chính sách bảo mật</NavLink>
            <NavLink>Điều khoản sử dụng</NavLink>
            <NavLink>Câu hỏi thường gặp</NavLink>
            <NavLink>Chính sách đổi trả</NavLink>
            <NavLink>Tuyển dụng</NavLink>
          </div>

          {/* Kết nối */}
          <div>
            <ColTitle>Kết Nối</ColTitle>
            <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
              <SocBtn title="Facebook"><Facebook size={15} /></SocBtn>
              <SocBtn title="Instagram"><Instagram size={15} /></SocBtn>
              <SocBtn title="TikTok"><span style={{ fontSize: 10, fontWeight: 700 }}>TT</span></SocBtn>
              <SocBtn title="YouTube"><Youtube size={15} /></SocBtn>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div>
                <p style={{ fontSize: 10, color: '#4b5563', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Zalo OA</p>
                <div style={{ width: 72, height: 72, background: '#fff', borderRadius: 8, padding: 5 }}>
                  <img src={qrCodeImg || 'https://placehold.co/62x62/f5f5f5/bbb?text=QR'} alt="QR" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 4 }} />
                </div>
              </div>
              <div>
                <p style={{ fontSize: 10, color: '#4b5563', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Đã xác nhận</p>
                <img
                  src={bctImg || 'https://placehold.co/100x36/181820/666?text=Bộ+Công+Thương'}
                  alt="Bộ Công Thương"
                  style={{ height: 30, opacity: 0.65, cursor: 'pointer', transition: 'opacity .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = 1; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = 0.65; }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div style={{ width: '100%', padding: '18px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <p style={{ fontSize: 12, color: '#374151' }}>
          © {new Date().getFullYear()} <span style={{ color: '#6b7280' }}>Aurelia Store</span> — Được hoàn thành bởi các thanh viên nhóm 8.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {['VISA', 'MASTERCARD', 'MOMO', 'VNPAY', 'ZALOPAY', 'COD'].map(m => <PayTag key={m}>{m}</PayTag>)}
        </div>
      </div>
    </footer>
  );
}