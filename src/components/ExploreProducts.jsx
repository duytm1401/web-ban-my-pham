import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, Eye, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

import exp1 from '../assets/ExploreProducts/exp1.jpg';
import exp2 from '../assets/ExploreProducts/exp2.jpg';
import exp3 from '../assets/ExploreProducts/exp3.jpg';
import exp4 from '../assets/ExploreProducts/exp4.jpg';
import exp5 from '../assets/ExploreProducts/exp5.webp';
import exp6 from '../assets/ExploreProducts/exp6.jpg';
import exp7 from '../assets/ExploreProducts/exp7.jpg';
import exp8 from '../assets/ExploreProducts/exp8.jpg';

const STYLES = `
  @keyframes ep-fadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes ep-heartPop {
    0%   { transform:scale(1); }
    30%  { transform:scale(1.45); }
    65%  { transform:scale(0.86); }
    100% { transform:scale(1); }
  }
  @keyframes ep-cartFlash {
    0%,100% { opacity:1; transform:translateY(0); }
    35%     { opacity:0; transform:translateY(-5px); }
    36%     { opacity:0; transform:translateY(5px); }
  }
  @keyframes ep-badgePop {
    from { transform:scale(0.6); opacity:0; }
    to   { transform:scale(1);   opacity:1; }
  }

  .ep-card { animation:ep-fadeUp 420ms cubic-bezier(0.4,0,0.2,1) both; }

  .ep-img { transition:transform 520ms cubic-bezier(0.4,0,0.2,1); will-change:transform; }
  .ep-card:hover .ep-img { transform:scale(1.07); }

  .ep-img-box { transition:box-shadow 260ms ease; box-shadow:0 1px 4px rgba(0,0,0,0.05); }
  .ep-card:hover .ep-img-box { box-shadow:0 8px 24px rgba(0,0,0,0.1); }

  .ep-actions {
    transition:opacity 200ms ease, transform 200ms cubic-bezier(0.4,0,0.2,1);
    opacity:0; transform:translateX(10px);
  }
  .ep-card:hover .ep-actions { opacity:1; transform:translateX(0); }

  .ep-cart-bar {
    transition:opacity 230ms ease, transform 230ms cubic-bezier(0.4,0,0.2,1);
    opacity:0; transform:translateY(100%);
  }
  .ep-card:hover .ep-cart-bar { opacity:1; transform:translateY(0); }
  .ep-cart-bar:hover  { background:#1a1a1a !important; }
  .ep-cart-bar:active { background:#000    !important; }
  .ep-cart-bar.flash  { animation:ep-cartFlash 300ms ease forwards; }

  .ep-icon-btn {
    transition:background 160ms ease, transform 160ms ease, box-shadow 160ms ease;
  }
  .ep-icon-btn:hover  { transform:scale(1.14); box-shadow:0 4px 14px rgba(0,0,0,0.14); }
  .ep-icon-btn:active { transform:scale(0.9); }
  .ep-heart.pop { animation:ep-heartPop 340ms cubic-bezier(0.4,0,0.2,1) forwards; }

  .ep-badge { animation:ep-badgePop 300ms cubic-bezier(0.4,0,0.2,1) both; }

  .ep-dot { transition:transform 160ms ease, box-shadow 160ms ease; cursor:pointer; }
  .ep-dot:hover  { transform:scale(1.25); }
  .ep-dot.active { box-shadow:0 0 0 2px #fff, 0 0 0 3.5px #DB4444; }

  .ep-nav { transition:background 180ms ease, border-color 180ms ease, color 180ms ease, opacity 180ms ease; }

  .ep-view-all {
    transition:background 200ms ease, transform 200ms cubic-bezier(0.4,0,0.2,1), box-shadow 200ms ease;
  }
  .ep-view-all:hover {
    background:#c03838 !important;
    transform:translateY(-2px);
    box-shadow:0 10px 28px rgba(219,68,68,0.38);
  }
  .ep-view-all:active { transform:translateY(0); box-shadow:none; }

  .ep-old { position:relative; color:#9ca3af; }
  .ep-old::after { content:''; position:absolute; left:0; top:50%; width:100%; height:1px; background:#9ca3af; }
`;

const PRODUCTS = [
  { id:1, name:'Son Kem Lì Black Rouge Air Fit',      price:'150.000đ', oldPrice:null,          rating:4,   reviews:35,  image:exp1, isNew:false, colors:[] },
  { id:2, name:'Kem Nền Kiềm Dầu Fit Me Maybelline',  price:'180.000đ', oldPrice:'230.000đ',    rating:5,   reviews:95,  image:exp2, isNew:false, colors:[] },
  { id:3, name:'Sữa Rửa Mặt Cerave Cho Da Mụn',      price:'320.000đ', oldPrice:'380.000đ',    rating:5,   reviews:325, image:exp3, isNew:false, colors:[] },
  { id:4, name:'Bộ Skincare Phục Hồi Obagi',          price:'1.250.000đ',oldPrice:null,         rating:4,   reviews:145, image:exp4, isNew:false, colors:[] },
  { id:5, name:'Son Tint Lì Romand Juicy Lasting',    price:'165.000đ', oldPrice:'210.000đ',    rating:5,   reviews:65,  image:exp5, isNew:true,  colors:['#E53E3E','#F6A4B0'] },
  { id:6, name:'Phấn Má Hồng Dior Backstage',         price:'850.000đ', oldPrice:'950.000đ',    rating:5,   reviews:35,  image:exp6, isNew:false, colors:['#F9C8D4','#E05C6A'] },
  { id:7, name:'Phấn Nước Cushion YSL',               price:'1.650.000đ',oldPrice:'1.900.000đ', rating:4,   reviews:55,  image:exp7, isNew:true,  colors:['#E8D5C0','#D4956A'] },
  { id:8, name:"Serum Kích Trắng Mờ Nám Kiehl's",    price:'1.150.000đ',oldPrice:null,         rating:4.5, reviews:55,  image:exp8, isNew:false, colors:['#2D6A4F','#E53E3E'] },
];

function StarRating({ value }) {
  return (
    <div style={{ display:'flex', gap:2 }}>
      {[1,2,3,4,5].map(i => {
        const pct = Math.round(Math.min(1, Math.max(0, value-(i-1)))*100);
        return (
          <svg key={i} width="13" height="13" viewBox="0 0 14 14">
            <defs>
              <linearGradient id={`ep-s${i}`}>
                <stop offset={`${pct}%`} stopColor="#FBBF24"/>
                <stop offset={`${pct}%`} stopColor="#D1D5DB"/>
              </linearGradient>
            </defs>
            <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z"
              fill={`url(#ep-s${i})`}/>
          </svg>
        );
      })}
    </div>
  );
}

function ImgPlaceholder({ id }) {
  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', gap:8 }}>
      <svg width="48" height="48" viewBox="0 0 52 52" fill="none">
        <rect x="4" y="4" width="44" height="44" rx="8" stroke="#E5E7EB" strokeWidth="2"/>
        <circle cx="18" cy="20" r="5" stroke="#E5E7EB" strokeWidth="2"/>
        <path d="M4 38l12-11 8 8 7-7 17 15" stroke="#E5E7EB" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
      <span style={{ fontSize:11, color:'#D1D5DB', fontWeight:500 }}>Ảnh {id}</span>
    </div>
  );
}

function ProductCard({ product, index }) {
  const [liked,       setLiked]       = useState(false);
  const [added,       setAdded]       = useState(false);
  const [imgErr,      setImgErr]      = useState(false);
  const [activeColor, setActiveColor] = useState(0);
  const cartRef  = useRef(null);
  const heartRef = useRef(null);

  const handleLike = e => {
    e.stopPropagation();
    setLiked(v => !v);
    heartRef.current?.classList.remove('pop');
    void heartRef.current?.offsetWidth;
    heartRef.current?.classList.add('pop');
  };

  const handleCart = () => {
    if (added) return;
    setAdded(true);
    cartRef.current?.classList.add('flash');
    setTimeout(() => cartRef.current?.classList.remove('flash'), 300);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="ep-card" style={{ animationDelay:`${index*70}ms`, cursor:'pointer' }}>
      {/* Image box */}
      <div className="ep-img-box" style={{
        position:'relative', background:'#F5F5F5',
        borderRadius:4, overflow:'hidden',
        marginBottom:12, aspectRatio:'1/1',
        border:'1px solid #F3F4F6',
      }}>
        {product.isNew && (
          <div className="ep-badge" style={{
            position:'absolute', top:10, left:10, zIndex:10,
            background:'#00C851', color:'#fff',
            fontSize:10, fontWeight:700, padding:'3px 8px',
            borderRadius:3, letterSpacing:'0.08em',
          }}>NEW</div>
        )}

        {!product.image || imgErr
          ? <ImgPlaceholder id={product.id}/>
          : <img className="ep-img" src={product.image} alt={product.name}
              onError={() => setImgErr(true)}
              style={{ width:'100%', height:'100%', objectFit:'contain', padding:16 }}
              draggable={false}/>
        }

        <div className="ep-actions" style={{
          position:'absolute', top:10, right:10,
          display:'flex', flexDirection:'column', gap:8, zIndex:10,
        }}>
          <button ref={heartRef} onClick={handleLike} aria-label="Yêu thích"
            className="ep-icon-btn ep-heart"
            style={{ width:34, height:34, borderRadius:'50%', background:'#fff',
              border:'none', cursor:'pointer', display:'flex',
              alignItems:'center', justifyContent:'center',
              boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }}>
            <Heart size={15} strokeWidth={2}
              fill={liked?'#DB4444':'none'} stroke={liked?'#DB4444':'#374151'}/>
          </button>
          <button aria-label="Xem nhanh" className="ep-icon-btn"
            style={{ width:34, height:34, borderRadius:'50%', background:'#fff',
              border:'none', cursor:'pointer', display:'flex',
              alignItems:'center', justifyContent:'center',
              boxShadow:'0 2px 8px rgba(0,0,0,0.1)', color:'#374151' }}>
            <Eye size={15} strokeWidth={2}/>
          </button>
        </div>

        <button ref={cartRef} onClick={handleCart} className="ep-cart-bar"
          style={{ position:'absolute', bottom:0, left:0, right:0, height:40,
            background:'#000', color:'#fff', border:'none', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            gap:7, fontSize:12, fontWeight:500, zIndex:10 }}>
          <ShoppingCart size={14} strokeWidth={2}/>
          {added ? 'Đã thêm ✓' : 'Thêm vào giỏ'}
        </button>
      </div>

      {/* Info */}
      <h3 style={{ fontSize:13, fontWeight:500, color:'#111827', margin:'0 0 5px',
        display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical',
        overflow:'hidden', lineHeight:1.4 }}>
        {product.name}
      </h3>

      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
        <span style={{ color:'#DB4444', fontWeight:600, fontSize:14 }}>{product.price}</span>
        {product.oldPrice && (
          <span className="ep-old" style={{ fontSize:12 }}>{product.oldPrice}</span>
        )}
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:6,
        marginBottom: product.colors.length ? 8 : 0 }}>
        <StarRating value={product.rating}/>
        <span style={{ fontSize:11, color:'#9ca3af', fontWeight:500 }}>({product.reviews})</span>
      </div>

      {product.colors.length > 0 && (
        <div style={{ display:'flex', gap:6 }}>
          {product.colors.map((hex, i) => (
            <div key={i} className={`ep-dot ${activeColor===i?'active':''}`}
              onClick={() => setActiveColor(i)}
              style={{ width:14, height:14, borderRadius:'50%',
                background:hex, border:'1.5px solid rgba(0,0,0,0.1)' }}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExploreProducts() {
  const injected  = useRef(false);
  const scrollRef = useRef(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  useEffect(() => {
    if (!injected.current) {
      const tag = document.createElement('style');
      tag.textContent = STYLES;
      document.head.appendChild(tag);
      injected.current = true;
    }
  }, []);

  const updateScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const t = setTimeout(updateScroll, 80);
    el.addEventListener('scroll', updateScroll, { passive:true });
    window.addEventListener('resize', updateScroll);
    return () => { clearTimeout(t); el.removeEventListener('scroll', updateScroll); window.removeEventListener('resize', updateScroll); };
  }, [updateScroll]);

  const scroll = dir => {
    const el = scrollRef.current;
    if (!el) return;
    const item = el.querySelector('[data-ep]');
    if (!item) return;
    const gap = parseInt(getComputedStyle(el).gap) || 16;
    el.scrollBy({ left:(item.offsetWidth+gap)*2*(dir==='left'?-1:1), behavior:'smooth' });
  };

  return (
    <section className="mt-10 lg:mt-20 mb-10 lg:mb-20 border-b border-gray-100 pb-16"
      aria-label="Khám phá sản phẩm">

      {/* Label */}
      <div className="flex items-center gap-3 mb-4">
        <div style={{ width:5, height:32, background:'#DB4444', borderRadius:2 }}/>
        <span style={{ color:'#DB4444', fontWeight:700, fontSize:14 }}>Tất Cả Sản Phẩm</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 lg:mb-10">
        <h2 className="text-2xl lg:text-4xl font-bold text-black leading-tight">
          Khám Phá Sản Phẩm
        </h2>
        {/* Nav arrows — mobile only */}
        <div className="flex gap-2 flex-shrink-0 lg:hidden">
          {['left','right'].map(dir => {
            const active = dir==='left' ? canLeft : canRight;
            return (
              <button key={dir} onClick={() => scroll(dir)} disabled={!active}
                className="ep-nav w-10 h-10 rounded-full border flex items-center justify-center focus:outline-none"
                style={{ borderColor:active?'#d1d5db':'#f3f4f6', background:active?'#fff':'#f9fafb',
                  color:active?'#374151':'#d1d5db', cursor:active?'pointer':'not-allowed', opacity:active?1:0.55 }}>
                {dir==='left'?<ChevronLeft size={18} strokeWidth={2}/>:<ChevronRight size={18} strokeWidth={2}/>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile: scroll ngang */}
      <div ref={scrollRef}
        className="flex lg:hidden gap-4 overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth:'none', msOverflowStyle:'none',
          WebkitOverflowScrolling:'touch', paddingTop:4, paddingBottom:8 }}>
        {PRODUCTS.map((p,i) => (
          <div key={p.id} data-ep style={{ flexShrink:0, width:158, scrollSnapAlign:'center' }}>
            <ProductCard product={p} index={i}/>
          </div>
        ))}
      </div>

      {/* Desktop: grid 2 hàng × 4 cột */}
      <div className="hidden lg:grid grid-cols-4 gap-6 mb-10">
        {PRODUCTS.map((p,i) => (
          <ProductCard key={p.id} product={p} index={i}/>
        ))}
      </div>

      {/* View All */}
      <div className="flex justify-center mt-8">
        <button className="ep-view-all" style={{
          background:'#DB4444', color:'#fff', border:'none', cursor:'pointer',
          padding:'13px 44px', borderRadius:3, fontSize:14, fontWeight:600,
          letterSpacing:'0.03em',
        }}>
          Xem Tất Cả Sản Phẩm
        </button>
      </div>
    </section>
  );
}