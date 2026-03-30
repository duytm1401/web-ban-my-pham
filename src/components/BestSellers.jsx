import React, { useState, useRef, useEffect } from 'react';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

import best1 from '../assets/BestSellers/anh1.png';
import best2 from '../assets/BestSellers/anh2.jpg';
import best3 from '../assets/BestSellers/anh3.webp';
import best4 from '../assets/BestSellers/anh4.webp';

// ─────────────────────────────────────────────────────────────────────
//  CSS ANIMATIONS
// ─────────────────────────────────────────────────────────────────────
const STYLES = `
  @keyframes bs-fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes bs-heartPop {
    0%   { transform: scale(1); }
    30%  { transform: scale(1.45); }
    65%  { transform: scale(0.85); }
    100% { transform: scale(1); }
  }
  @keyframes bs-cartFlash {
    0%   { opacity: 1; transform: translateY(0); }
    35%  { opacity: 0; transform: translateY(-5px); }
    36%  { opacity: 0; transform: translateY(5px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  /* Card entrance */
  .bs-card { animation: bs-fadeUp 420ms cubic-bezier(0.4,0,0.2,1) both; }

  /* Ảnh zoom khi hover card */
  .bs-img {
    transition: transform 550ms cubic-bezier(0.4,0,0.2,1);
    will-change: transform;
  }
  .bs-card:hover .bs-img { transform: scale(1.08); }

  /* Action icons trượt từ phải vào */
  .bs-actions {
    transition: opacity 220ms ease, transform 220ms cubic-bezier(0.4,0,0.2,1);
    opacity: 0; transform: translateX(10px);
  }
  .bs-card:hover .bs-actions { opacity: 1; transform: translateX(0); }

  /* Thanh giỏ hàng trượt lên từ dưới */
  .bs-cart-bar {
    transition: opacity 240ms ease, transform 240ms cubic-bezier(0.4,0,0.2,1);
    opacity: 0; transform: translateY(100%);
  }
  .bs-card:hover .bs-cart-bar { opacity: 1; transform: translateY(0); }
  .bs-cart-bar:hover { background: #1a1a1a; letter-spacing: 0.04em; }
  .bs-cart-bar:active { background: #000; }
  .bs-cart-bar.flashing { animation: bs-cartFlash 300ms ease forwards; }

  /* Icon button */
  .bs-icon-btn {
    transition: background 180ms ease, color 180ms ease,
                transform 180ms ease, box-shadow 180ms ease;
  }
  .bs-icon-btn:hover  { transform: scale(1.14); box-shadow: 0 4px 14px rgba(0,0,0,0.15); }
  .bs-icon-btn:active { transform: scale(0.92); }

  /* Heart pop khi liked */
  .bs-heart.pop { animation: bs-heartPop 360ms cubic-bezier(0.4,0,0.2,1) forwards; }

  /* View All button */
  .bs-view-all {
    transition: background 200ms ease, transform 200ms ease, box-shadow 200ms ease;
  }
  .bs-view-all:hover {
    background: #c03838;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(219,68,68,0.38);
  }
  .bs-view-all:active { transform: translateY(0); box-shadow: none; }

  /* Giá gốc gạch ngang */
  .bs-old-price {
    position: relative; color: #9ca3af;
    text-decoration: none;
  }
  .bs-old-price::after {
    content: '';
    position: absolute; left: 0; top: 50%;
    width: 100%; height: 1px; background: #9ca3af;
  }
`;

// ─────────────────────────────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: 'Nước Thần SK-II Facial Treatment',
    price: '3.200.000đ',
    oldPrice: '3.800.000đ',
    rating: 4.5,
    reviews: 65,
    image: best1,
  },
  {
    id: 2,
    name: 'Son MAC Matte Lipstick – Ruby Woo',
    price: '650.000đ',
    oldPrice: '850.000đ',
    rating: 4.5,
    reviews: 120,
    image: best2,
  },
  {
    id: 3,
    name: 'Phấn Nước YSL Le Cushion',
    price: '1.850.000đ',
    oldPrice: '2.100.000đ',
    rating: 4,
    reviews: 88,
    image: best3,
  },
  {
    id: 4,
    name: 'Kem Dưỡng La Mer Crème',
    price: '5.500.000đ',
    oldPrice: null,
    rating: 5,
    reviews: 45,
    image: best4,
  },
];

// ─────────────────────────────────────────────────────────────────────
//  Star Rating
// ─────────────────────────────────────────────────────────────────────
function StarRating({ value }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.min(1, Math.max(0, value - (i - 1)));
        const pct  = Math.round(fill * 100);
        return (
          <svg key={i} width="14" height="14" viewBox="0 0 14 14">
            <defs>
              <linearGradient id={`str-${i}`}>
                <stop offset={`${pct}%`} stopColor="#FBBF24" />
                <stop offset={`${pct}%`} stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path
              d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z"
              fill={`url(#str-${i})`}
            />
          </svg>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
//  Image Placeholder
// ─────────────────────────────────────────────────────────────────────
function ImgPlaceholder({ id }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 8, color: '#D1D5DB',
    }}>
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <rect x="4" y="4" width="44" height="44" rx="8" stroke="#E5E7EB" strokeWidth="2"/>
        <circle cx="18" cy="20" r="5" stroke="#E5E7EB" strokeWidth="2"/>
        <path d="M4 38l12-11 8 8 7-7 17 15" stroke="#E5E7EB" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
      <span style={{ fontSize: 11, color: '#D1D5DB', fontWeight: 500 }}>Ảnh {id}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
//  Product Card
// ─────────────────────────────────────────────────────────────────────
function ProductCard({ product, index }) {
  const [liked,  setLiked]  = useState(false);
  const [added,  setAdded]  = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const cartRef  = useRef(null);
  const heartRef = useRef(null);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked((v) => !v);
    // trigger pop animation
    heartRef.current?.classList.remove('pop');
    void heartRef.current?.offsetWidth; // reflow
    heartRef.current?.classList.add('pop');
  };

  const handleCart = () => {
    if (added) return;
    setAdded(true);
    cartRef.current?.classList.add('flashing');
    setTimeout(() => cartRef.current?.classList.remove('flashing'), 300);
    setTimeout(() => setAdded(false), 1800);
  };

  const showPlaceholder = !product.image || imgErr;

  return (
    <div
      className="bs-card group cursor-pointer"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      {/* ── Image box ── */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#F5F5F5',
          borderRadius: 4,
          overflow: 'hidden',
          marginBottom: 14,
          aspectRatio: '1 / 1',
          border: '1px solid #F3F4F6',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          transition: 'box-shadow 280ms ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'}
      >
        {showPlaceholder ? (
          <ImgPlaceholder id={product.id} />
        ) : (
          <img
            className="bs-img"
            src={product.image}
            alt={product.name}
            onError={() => setImgErr(true)}
            style={{
              width: '100%', height: '100%',
              objectFit: 'contain',
              padding: 20,
            }}
            draggable={false}
          />
        )}

        {/* Action icons */}
        <div className="bs-actions" style={{
          position: 'absolute', top: 10, right: 10,
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          <button
            ref={heartRef}
            onClick={handleLike}
            aria-label="Yêu thích"
            className="bs-icon-btn bs-heart"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: '#fff',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Heart
              size={16} strokeWidth={2}
              fill={liked ? '#DB4444' : 'none'}
              stroke={liked ? '#DB4444' : '#374151'}
            />
          </button>

          <button
            aria-label="Xem nhanh"
            className="bs-icon-btn"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: '#fff',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              color: '#374151',
            }}
          >
            <Eye size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Add to cart bar */}
        <button
          ref={cartRef}
          onClick={handleCart}
          className="bs-cart-bar"
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 42,
            background: '#000',
            color: '#fff',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8,
            fontSize: 13, fontWeight: 500,
            transition: 'background 180ms ease, letter-spacing 180ms ease, opacity 240ms ease, transform 240ms cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <ShoppingCart size={15} strokeWidth={2} />
          {added ? 'Đã thêm ✓' : 'Thêm vào giỏ'}
        </button>
      </div>

      {/* ── Info ── */}
      <h3 style={{
        fontSize: 14, fontWeight: 500, color: '#111827',
        margin: '0 0 6px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        lineHeight: 1.4,
      }}>
        {product.name}
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <span style={{ color: '#DB4444', fontWeight: 600, fontSize: 15 }}>
          {product.price}
        </span>
        {product.oldPrice && (
          <span className="bs-old-price" style={{ fontSize: 13 }}>
            {product.oldPrice}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <StarRating value={product.rating} />
        <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>
          ({product.reviews})
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
//  MAIN
// ─────────────────────────────────────────────────────────────────────
export default function BestSellers() {
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    const tag = document.createElement('style');
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    injected.current = true;
  }, []);

  return (
    <section className="mt-10 lg:mt-20 mb-10 lg:mb-20 border-b border-gray-100 pb-16">

      {/* Label nhỏ */}
      <div className="flex items-center gap-3 mb-4">
        <div style={{ width: 5, height: 32, background: '#DB4444', borderRadius: 2 }} />
        <span style={{ color: '#DB4444', fontWeight: 700, fontSize: 14 }}>Tháng này</span>
      </div>

      {/* Tiêu đề + View All */}
      <div className="flex items-center justify-between mb-8 lg:mb-12">
        <h2 className="text-2xl lg:text-4xl font-bold text-black">
          Sản Phẩm Bán Chạy
        </h2>
        <Link 
          to="/danh-muc"
          className="bs-view-all px-8 py-3 rounded-sm text-white text-sm font-medium inline-block"
          style={{ background: '#DB4444', border: 'none', cursor: 'pointer' }}
        >
          Xem Tất Cả
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}