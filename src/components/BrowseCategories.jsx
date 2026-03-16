import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Droplet, Sparkles, Wind, Feather, Scissors, Brush,
  ChevronLeft, ChevronRight, Sun, Heart, Leaf, Gift
} from 'lucide-react';

// CSS animation keyframes inject một lần duy nhất
const STYLE = `
  @keyframes catPop {
    0%   { transform: scale(1); }
    40%  { transform: scale(0.96); }
    100% { transform: scale(1); }
  }
  .cat-card {
    transition:
      background-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
      border-color     300ms cubic-bezier(0.4, 0, 0.2, 1),
      color            300ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow       300ms cubic-bezier(0.4, 0, 0.2, 1);
    will-change: background-color, box-shadow;
  }
  .cat-card:hover:not(.active) {
    box-shadow: 0 4px 16px rgba(219, 68, 68, 0.12);
  }
  .cat-card.active {
    box-shadow: 0 6px 24px rgba(219, 68, 68, 0.30);
    animation: catPop 220ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  .cat-icon {
    transition:
      opacity      300ms cubic-bezier(0.4, 0, 0.2, 1),
      transform    300ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .cat-card:hover:not(.active) .cat-icon {
    transform: translateY(-3px);
  }
  .cat-label {
    transition: opacity 250ms ease;
  }
  .nav-btn {
    transition:
      background-color 200ms ease,
      border-color     200ms ease,
      color            200ms ease,
      opacity          200ms ease;
  }
`;

export default function BrowseCategories() {
  const scrollRef      = useRef(null);
  const styleInjected  = useRef(false);
  const [activeId, setActiveId]             = useState(2);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Inject style một lần
  useEffect(() => {
    if (styleInjected.current) return;
    const tag = document.createElement('style');
    tag.textContent = STYLE;
    document.head.appendChild(tag);
    styleInjected.current = true;
  }, []);

  const categories = [
    { id: 1,  name: 'Chăm sóc da',      icon: Droplet,   count: 48 },
    { id: 2,  name: 'Trang điểm',       icon: Sparkles,  count: 72 },
    { id: 3,  name: 'Nước hoa',         icon: Wind,      count: 35 },
    { id: 4,  name: 'Chăm sóc cơ thể', icon: Feather,   count: 29 },
    { id: 5,  name: 'Chăm sóc tóc',    icon: Scissors,  count: 56 },
    { id: 6,  name: 'Dụng cụ làm đẹp', icon: Brush,     count: 41 },
    { id: 7,  name: 'Chống nắng',       icon: Sun,       count: 23 },
    { id: 8,  name: 'Môi & Mắt',        icon: Heart,     count: 38 },
    { id: 9,  name: 'Mặt nạ',           icon: Leaf,      count: 19 },
    { id: 10, name: 'Set quà tặng',     icon: Gift,      count: 14 },
  ];

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const t = setTimeout(updateScrollState, 80);
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      clearTimeout(t);
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const item = el.querySelector('[data-category]');
    if (!item) return;
    const gap   = parseInt(getComputedStyle(el).gap) || 16;
    const delta = (item.offsetWidth + gap) * 2 * (direction === 'left' ? -1 : 1);
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <section
      className="mt-10 lg:mt-20 mb-10 lg:mb-20 border-b border-gray-100 pb-16"
      aria-label="Danh mục sản phẩm"
    >
      {/* Label nhỏ */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-[5px] h-8 bg-[#DB4444] rounded-sm" />
        <span className="text-[#DB4444] font-semibold text-sm">Danh mục</span>
      </div>

      {/* Tiêu đề + Nút */}
      <div className="flex items-center justify-between mb-8 lg:mb-10">
        <h2 className="text-2xl lg:text-4xl font-bold text-black leading-tight">
          Khám Phá Danh Mục
        </h2>

        <div className="flex gap-2 flex-shrink-0">
          {['left', 'right'].map((dir) => {
            const active = dir === 'left' ? canScrollLeft : canScrollRight;
            return (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                disabled={!active}
                aria-label={dir === 'left' ? 'Cuộn trái' : 'Cuộn phải'}
                className="nav-btn w-10 h-10 rounded-full border flex items-center justify-center focus:outline-none"
                style={{
                  borderColor:     active ? '#d1d5db' : '#f3f4f6',
                  backgroundColor: active ? '#fff'    : '#f9fafb',
                  color:           active ? '#374151' : '#d1d5db',
                  cursor:          active ? 'pointer' : 'not-allowed',
                  opacity:         active ? 1        : 0.6,
                }}
              >
                {dir === 'left'
                  ? <ChevronLeft  size={18} strokeWidth={2} />
                  : <ChevronRight size={18} strokeWidth={2} />
                }
              </button>
            );
          })}
        </div>
      </div>

      {/* Danh sách */}
      <div
        ref={scrollRef}
        role="listbox"
        aria-label="Danh sách danh mục"
        className="flex gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          paddingTop: '6px',
          paddingBottom: '6px',
        }}
      >
        {categories.map((cat) => {
          const Icon     = cat.icon;
          const isActive = activeId === cat.id;

          return (
            <div
              key={cat.id}
              data-category
              role="option"
              aria-selected={isActive}
              tabIndex={0}
              onClick={() => setActiveId(cat.id)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveId(cat.id)}
              className={`cat-card flex-shrink-0 snap-center cursor-pointer select-none rounded-sm border
                flex flex-col items-center justify-center gap-4
                w-[150px] lg:w-[170px] h-[145px] lg:h-[155px]
                focus:outline-none focus:ring-2 focus:ring-[#DB4444] focus:ring-offset-2
                ${isActive ? 'active' : ''}`}
              style={{
                backgroundColor: isActive ? '#DB4444' : '#fff',
                borderColor:     isActive ? '#DB4444' : '#e5e7eb',
                color:           isActive ? '#fff'    : '#374151',
              }}
            >
              {/* Icon wrapper — translateY chỉ khi hover, được handle bởi CSS */}
              <span className="cat-icon" style={{ display: 'flex' }}>
                <Icon
                  size={40}
                  strokeWidth={isActive ? 1.8 : 1.3}
                  style={{
                    // Fade strokeWidth qua opacity cross-fade trick
                    transition: 'opacity 300ms cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              </span>

              <div className="cat-label flex flex-col items-center gap-[3px]">
                <span className="text-sm font-medium text-center leading-tight px-2">
                  {cat.name}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    color: isActive ? 'rgba(255,255,255,0.75)' : '#9ca3af',
                    transition: 'color 300ms cubic-bezier(0.4,0,0.2,1)',
                  }}
                >
                  {cat.count} sản phẩm
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators — mobile only */}
      <div className="flex lg:hidden justify-center gap-2 mt-5">
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveId(cat.id);
              const el = scrollRef.current;
              if (!el) return;
              const items = el.querySelectorAll('[data-category]');
              items[i]?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
            }}
            aria-label={`Chọn ${cat.name}`}
            style={{
              borderRadius: '9999px',
              height: '8px',
              width: activeId === cat.id ? '20px' : '8px',
              backgroundColor: activeId === cat.id ? '#DB4444' : '#d1d5db',
              transition: 'width 250ms ease, background-color 250ms ease',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </section>
  );
}