import React, { useState, useEffect } from 'react';

import FlashSales1 from '../assets/FlashSales/fsh1.webp';
import FlashSales2 from '../assets/FlashSales/fsh2.jpg';
import FlashSales3 from '../assets/FlashSales/fsh3.jpg';
import FlashSales4 from '../assets/FlashSales/fsh4.jpg';
import FlashSales5 from '../assets/FlashSales/fsh5.jpg';
import FlashSales6 from '../assets/FlashSales/fsh6.jpg';

/* ─── Product Data ─────────────────────────────────────────────── */
const productsData = [
  { id: 1, name: "Son Kem Lì Romand Zero",        price: "120.000đ", oldPrice: "200.000đ", discount: "-40%", stars: 4.5, reviews: 88,  image: FlashSales1 },
  { id: 2, name: "Kem Chống Nắng La Roche-Posay", price: "370.000đ", oldPrice: "570.000đ", discount: "-35%", stars: 4.2, reviews: 75,  image: FlashSales2 },
  { id: 3, name: "Serum Estee Lauder Phục Hồi",   price: "1.500.000đ",oldPrice:"2.100.000đ",discount:"-30%", stars: 5.0, reviews: 99,  image: FlashSales3 },
  { id: 4, name: "Nước Hoa Dior Miss Dior",        price: "3.200.000đ",oldPrice:"4.000.000đ",discount:"-25%", stars: 4.0, reviews: 65,  image: FlashSales4 },
  { id: 5, name: "Tẩy Trang Bioderma",             price: "350.000đ", oldPrice: "450.000đ", discount: "-20%", stars: 4.8, reviews: 120, image: FlashSales5 },
  { id: 6, name: "Kem Dưỡng Ẩm Clinique",          price: "850.000đ", oldPrice:"1.200.000đ", discount: "-15%", stars: 3.8, reviews: 50,  image: FlashSales6 },
];

/* ─── Star Rating ───────────────────────────────────────────────── */
function StarRating({ stars, reviews }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const fill = Math.min(Math.max(stars - (star - 1), 0), 1); // 0 | 0..1 | 1
          return (
            <span key={star} className="relative inline-block text-base leading-none"
                  style={{ color: '#e5e7eb' }}>
              ★
              {/* filled overlay */}
              <span
                className="absolute inset-0 overflow-hidden text-[#FFAD33]"
                style={{ width: `${fill * 100}%` }}
              >★</span>
            </span>
          );
        })}
      </div>
      <span className="text-gray-400 text-xs font-medium">({reviews})</span>
    </div>
  );
}

/* ─── Flip Digit ────────────────────────────────────────────────── */
function FlipDigit({ value }) {
  const [display, setDisplay] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value === display) return;
    setFlipping(true);
    const t = setTimeout(() => { setDisplay(value); setFlipping(false); }, 280);
    return () => clearTimeout(t);
  }, [value]); // eslint-disable-line

  return (
    <span
      className="inline-block tabular-nums"
      style={{
        transition: 'transform 0.28s ease, opacity 0.28s ease',
        transform: flipping ? 'translateY(-6px) scaleY(0.7)' : 'translateY(0) scaleY(1)',
        opacity: flipping ? 0 : 1,
        display: 'inline-block',
      }}
    >
      {display}
    </span>
  );
}

/* ─── Product Card ──────────────────────────────────────────────── */
function ProductCard({ item }) {
  const [wished, setWished] = useState(false);
  const [added,  setAdded]  = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group cursor-pointer">

      {/* Image container */}
      <div className="relative bg-[#F8F8F8] rounded-lg overflow-hidden
                      h-[200px] sm:h-[220px] lg:h-[250px]
                      mb-3 sm:mb-4
                      shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                      group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]
                      transition-shadow duration-300">

        {/* Image with zoom */}
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover
                     scale-100 group-hover:scale-105
                     transition-transform duration-500 ease-out"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Discount badge */}
        <div className="absolute top-3 left-3 bg-[#DB4444] text-white text-[11px]
                        font-semibold px-2.5 py-1 rounded-md z-10
                        shadow-sm">
          {item.discount}
        </div>

        {/* Action buttons — slide in từ phải với stagger */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {/* Wishlist */}
          <button
            onClick={() => setWished(w => !w)}
            aria-label="Yêu thích"
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center
                       shadow-md transition-all duration-200
                       hover:scale-110 active:scale-95
                       translate-x-10 opacity-0
                       group-hover:translate-x-0 group-hover:opacity-100"
            style={{ transitionDelay: '0ms', transitionProperty: 'transform, opacity, color, background-color' }}
          >
            <svg className="w-[17px] h-[17px] transition-colors duration-200"
                 fill={wished ? '#DB4444' : 'none'}
                 stroke={wished ? '#DB4444' : 'currentColor'}
                 viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>

          {/* Quick view */}
          <button
            aria-label="Xem nhanh"
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center
                       shadow-md transition-all duration-200
                       hover:bg-[#DB4444] hover:text-white hover:scale-110 active:scale-95
                       translate-x-10 opacity-0
                       group-hover:translate-x-0 group-hover:opacity-100"
            style={{ transitionDelay: '60ms', transitionProperty: 'transform, opacity, color, background-color' }}
          >
            <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </button>
        </div>

        {/* Add to Cart — slide up from bottom */}
        <button
          onClick={handleAddToCart}
          aria-label={`Thêm ${item.name} vào giỏ`}
          className={`absolute bottom-0 left-0 right-0 py-3 text-sm font-semibold z-10
                      transition-all duration-300
                      translate-y-full group-hover:translate-y-0
                      ${added
                        ? 'bg-[#22c55e] text-white'
                        : 'bg-black/90 hover:bg-[#DB4444] text-white'
                      }`}
        >
          {added ? '✓ Đã thêm vào giỏ' : 'Thêm Vào Giỏ'}
        </button>
      </div>

      {/* Product info */}
      <div className="px-0.5">
        <h3 className="text-gray-900 font-medium mb-2 truncate text-sm sm:text-[15px]
                       group-hover:text-[#DB4444] transition-colors duration-200">
          {item.name}
        </h3>
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <span className="text-[#DB4444] font-semibold text-sm sm:text-base">{item.price}</span>
          <span className="text-gray-400 line-through text-xs sm:text-sm">{item.oldPrice}</span>
        </div>
        <StarRating stars={item.stars} reviews={item.reviews} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FLASH SALES SECTION
═══════════════════════════════════════════════════════════════════ */
const FlashSales = () => {

  /* ── Countdown ── */
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 23, minutes: 19, seconds: 56 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else { seconds = 59;
          if (minutes > 0) minutes--;
          else { minutes = 59;
            if (hours > 0) hours--;
            else { hours = 23; if (days > 0) days--; }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const fmt = (n) => String(n).padStart(2, '0');

  /* ── Carousel ── */
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640)  return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  };
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView);
  useEffect(() => {
    const onResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const maxIndex  = productsData.length - itemsPerView;
  const [startIndex, setStartIndex] = useState(0);
  useEffect(() => { setStartIndex(0); }, [itemsPerView]);
  useEffect(() => {
    const t = setInterval(() => setStartIndex(p => p >= maxIndex ? 0 : p + 1), 6000);
    return () => clearInterval(t);
  }, [maxIndex]);

  const nextSlide = () => setStartIndex(p => p >= maxIndex ? 0 : p + 1);
  const prevSlide = () => setStartIndex(p => p <= 0 ? maxIndex : p - 1);
  const slidePercent = 100 / itemsPerView;

  /* ── Countdown block ── */
  const TimeBlock = ({ label, value }) => (
    <div className="flex flex-col items-center">
      <span className="text-[9px] sm:text-[11px] font-medium text-gray-500 uppercase
                       tracking-widest mb-1">
        {label}
      </span>
      <div className="bg-white rounded-lg w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16
                      flex items-center justify-center
                      shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                      border border-gray-100">
        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tabular-nums">
          <FlipDigit value={fmt(value)} />
        </span>
      </div>
    </div>
  );

  return (
    <section className="mt-16 sm:mt-24 lg:mt-32 mb-12 sm:mb-20">

      {/* ── Section label ── */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-8 bg-[#DB4444] rounded-full" />
        <span className="text-[#DB4444] text-sm font-semibold uppercase tracking-widest">
          Hôm nay
        </span>
      </div>

      {/* ── Header row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                      mb-8 sm:mb-10 gap-5 sm:gap-0">

        {/* Left: Title + Timer */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
            Flash Sales
          </h2>

          {/* Countdown */}
          <div className="flex items-end gap-2 sm:gap-3">
            <TimeBlock label="Ngày"  value={timeLeft.days} />
            <span className="text-[#DB4444] text-2xl font-bold mb-3 sm:mb-4">:</span>
            <TimeBlock label="Giờ"   value={timeLeft.hours} />
            <span className="text-[#DB4444] text-2xl font-bold mb-3 sm:mb-4">:</span>
            <TimeBlock label="Phút"  value={timeLeft.minutes} />
            <span className="text-[#DB4444] text-2xl font-bold mb-3 sm:mb-4">:</span>
            <TimeBlock label="Giây"  value={timeLeft.seconds} />
          </div>
        </div>

        {/* Right: Arrows */}
        <div className="flex gap-2 self-start sm:self-auto">
          {[
            { fn: prevSlide, icon: 'M10 19l-7-7m0 0l7-7m-7 7h18', label: 'Trước' },
            { fn: nextSlide, icon: 'M14 5l7 7m0 0l-7 7m7-7H3',    label: 'Tiếp'  },
          ].map(({ fn, icon, label }) => (
            <button key={label} onClick={fn} aria-label={label}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gray-100
                         flex items-center justify-center
                         hover:bg-[#DB4444] hover:text-white
                         transition-all duration-200 hover:scale-105 active:scale-95">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon}/>
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-gradient-to-r from-[#DB4444] via-gray-200 to-transparent mb-8" />

      {/* ── Carousel ── */}
      <div className="overflow-hidden -mx-4 py-2 pb-6">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${startIndex * slidePercent}%)` }}
        >
          {productsData.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 px-3 sm:px-4"
              style={{ width: `${slidePercent}%` }}
            >
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Dots (mobile) ── */}
      <div className="flex justify-center gap-2 mt-2 sm:hidden">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setStartIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              startIndex === i ? 'w-6 bg-[#DB4444]' : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* ── View All button ── */}
      <div className="mt-10 sm:mt-14 flex justify-center">
        <button className="group relative overflow-hidden bg-[#DB4444] text-white
                           px-10 sm:px-14 py-3 sm:py-4 rounded-md
                           font-semibold text-sm sm:text-base
                           transition-all duration-300 hover:shadow-[0_4px_20px_rgba(219,68,68,0.4)]
                           hover:-translate-y-0.5 active:translate-y-0">
          <span className="relative z-10">Xem Tất Cả Sản Phẩm</span>
          <div className="absolute inset-0 bg-[#c03838] translate-y-full
                          group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>

    </section>
  );
};

export default FlashSales;