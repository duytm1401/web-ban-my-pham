import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, Star, ShoppingCart, Heart, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clientService } from '../../services/clientService';
import { useCart } from '../../context/CartContext'; 
import { useWishlist } from '../../context/WishlistContext';

const BRANDS = ["Aurelia", "La Roche-Posay", "L'Oréal", "Innisfree", "Vichy", "Kiehl's"];
const CATEGORIES = ["Sữa rửa mặt", "Toner", "Serum", "Kem dưỡng ẩm", "Kem chống nắng"];

const formatPrice = (val) => val ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "0";
const parsePrice = (str) => {
  const val = parseInt(str.toString().replace(/\./g, '').replace(/\D/g, ''), 10);
  return isNaN(val) ? 0 : val;
};

// ── COMPONENT THANH TRƯỢT ──
const PriceFilter = ({ min, max, gap, step, currentRange, onApply }) => {
  const [localRange, setLocalRange] = useState(currentRange);

  useEffect(() => {
    setLocalRange(currentRange);
  }, [currentRange]);

  const minPercent = (localRange[0] / max) * 100;
  const maxPercent = (localRange[1] / max) * 100;

  const handleMinChange = (e) => {
    const val = Math.min(Number(e.target.value), localRange[1] - gap);
    setLocalRange([val, localRange[1]]);
  };

  const handleMaxChange = (e) => {
    const val = Math.max(Number(e.target.value), localRange[0] + gap);
    setLocalRange([localRange[0], val]);
  };

  const commitChange = () => {
    onApply(localRange);
  };

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-4 tracking-wide">KHOẢNG GIÁ</h3>
      
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            inputMode="numeric"
            value={formatPrice(localRange[0])}
            onChange={(e) => {
              let val = parsePrice(e.target.value);
              setLocalRange([val, localRange[1]]);
            }}
            onBlur={() => {
              let val = Math.max(min, Math.min(localRange[0], localRange[1] - gap));
              setLocalRange([val, localRange[1]]);
              onApply([val, localRange[1]]);
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }}
            className="w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md text-sm text-center text-gray-700 font-medium focus:outline-none focus:border-[#DB4444] transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">đ</span>
        </div>
        
        <span className="text-gray-400 font-medium">~</span>
        
        <div className="relative flex-1">
          <input
            type="text"
            inputMode="numeric"
            value={formatPrice(localRange[1])}
            onChange={(e) => {
              let val = parsePrice(e.target.value);
              setLocalRange([localRange[0], val]);
            }}
            onBlur={() => {
              let val = Math.max(localRange[0] + gap, Math.min(max, localRange[1]));
              setLocalRange([localRange[0], val]);
              onApply([localRange[0], val]);
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }}
            className="w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md text-sm text-center text-gray-700 font-medium focus:outline-none focus:border-[#DB4444] transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">đ</span>
        </div>
      </div>

      <div className="relative w-full h-1.5 bg-gray-200 rounded-full mt-2 mb-4">
        <div 
          className="absolute top-0 bottom-0 bg-slate-700 rounded-full z-10 will-change-[left,right]" 
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        ></div>

        <input 
          type="range" min={min} max={max} step={step} 
          value={localRange[0]} onChange={handleMinChange}
          onMouseUp={commitChange} onTouchEnd={commitChange}
          className="range-input" style={{ zIndex: localRange[0] > max - gap * 2 ? 30 : 20 }}
        />
        
        <input 
          type="range" min={min} max={max} step={step} 
          value={localRange[1]} onChange={handleMaxChange}
          onMouseUp={commitChange} onTouchEnd={commitChange}
          className="range-input" style={{ zIndex: 25 }}
        />
      </div>
    </div>
  );
};

// ── TRANG DANH MỤC CHÍNH ──
export default function CategoryPage() {
  const { addToCart } = useCart(); 
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Phổ biến nhất");

  const MIN_PRICE = 0;
  const MAX_PRICE = 20000000;
  const MIN_GAP = 100000;
  const PRICE_STEP = 10000;
  
  const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]); 

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await clientService.getCategoryProducts();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (isMobileFilterOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileFilterOpen]);

  const filteredProducts = products.filter(product => 
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const handleAddToCart = (product, e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    }, 1);
  };

  const handleWishlistToggle = (product, e) => {
    e.preventDefault();
    e.stopPropagation(); 
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const renderFilters = () => (
    <div className="space-y-8 font-body">
      <PriceFilter 
        min={MIN_PRICE} max={MAX_PRICE} gap={MIN_GAP} step={PRICE_STEP} 
        currentRange={priceRange} onApply={setPriceRange} 
      />

      <div className="border-t border-gray-100 pt-6">
        <h3 className="font-semibold text-gray-900 mb-4 tracking-wide">DANH MỤC</h3>
        <div className="space-y-3">
          {CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 text-[#DB4444] border-gray-300 rounded focus:ring-[#DB4444] cursor-pointer" />
              <span className="text-gray-600 group-hover:text-[#DB4444] transition-colors text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h3 className="font-semibold text-gray-900 mb-4 tracking-wide">THƯƠNG HIỆU</h3>
        <div className="space-y-3">
          {BRANDS.map(brand => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 text-[#DB4444] border-gray-300 rounded focus:ring-[#DB4444] cursor-pointer" />
              <span className="text-gray-600 group-hover:text-[#DB4444] transition-colors text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-20 mt-[72px]">
      
      <style>{`
        .range-input { position: absolute; top: -6px; left: 0; width: 100%; height: 18px; appearance: none; -webkit-appearance: none; background: transparent; pointer-events: none; }
        .range-input::-webkit-slider-thumb { appearance: none; -webkit-appearance: none; pointer-events: auto; width: 18px; height: 18px; background-color: white; border: 3.5px solid #334155; border-radius: 50%; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: transform 0.1s ease; }
        .range-input::-webkit-slider-thumb:active { transform: scale(1.15); }
        .range-input::-moz-range-thumb { appearance: none; pointer-events: auto; width: 18px; height: 18px; background-color: white; border: 3.5px solid #334155; border-radius: 50%; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: transform 0.1s ease; }
        .range-input::-moz-range-thumb:active { transform: scale(1.15); }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 lg:pb-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        <aside className="hidden lg:block w-[260px] flex-shrink-0">
          {renderFilters()}
        </aside>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">Chăm sóc da</h1>
              <p className="font-body text-sm text-gray-500">Hiển thị {filteredProducts.length} sản phẩm</p>
            </div>

            <div className="flex items-center gap-3 font-body">
              <button onClick={() => setIsMobileFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-sm text-sm font-medium text-gray-700 hover:border-[#DB4444] hover:text-[#DB4444] transition-colors">
                <Filter size={16} /> Lọc
              </button>

              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-sm text-sm font-medium text-gray-700 hover:border-[#DB4444] transition-colors bg-white">
                  {sortBy} <ChevronDown size={16} className="text-gray-400" />
                </button>
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  {["Phổ biến nhất", "Hàng mới về", "Giá: Thấp đến Cao", "Giá: Cao đến Thấp"].map(option => (
                    <div key={option} onClick={() => setSortBy(option)} className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 hover:text-[#DB4444] transition-colors ${sortBy === option ? 'text-[#DB4444] font-medium' : 'text-gray-600'}`}>
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="animate-spin text-[#DB4444] mb-4" size={40} />
              <p className="text-gray-500 font-body">Đang tải sản phẩm...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-0 pt-2 pb-8">
              {filteredProducts.map((product) => {
                const isFav = isInWishlist(product.id);
                
                return (
                  <Link 
                    key={product.id} 
                    to={`/san-pham/${product.id}`}
                    className="group block relative font-body transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] bg-white rounded-xl p-2.5 h-full flex flex-col"
                  >
                    {product.oldPrice && (
                      <div className="absolute top-4 left-4 z-10 bg-[#DB4444] text-white text-[10px] font-bold px-2 py-1 rounded-sm tracking-wider pointer-events-none">SALE</div>
                    )}

                    <div className="relative bg-gray-50 aspect-[4/5] rounded-lg overflow-hidden mb-3">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                      
                      <button 
                        onClick={(e) => handleWishlistToggle(product, e)}
                        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm transition-all z-20 hover:scale-110"
                      >
                        <Heart 
                          size={14} 
                          fill={isFav ? "#DB4444" : "none"} 
                          className={isFav ? "text-[#DB4444]" : "text-gray-400"} 
                        />
                      </button>

                      <button 
                        onClick={(e) => handleAddToCart(product, e)}
                        className="absolute bottom-0 left-0 right-0 bg-black text-white font-medium py-3 text-xs flex items-center justify-center gap-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#DB4444] z-20"
                      >
                        <ShoppingCart size={14} /> Thêm vào giỏ
                      </button>
                    </div>

                    <div className="flex flex-col flex-1 px-1 pointer-events-none">
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">{product.brand}</span>
                      <h3 className="text-sm font-medium text-gray-900 leading-snug mb-1 group-hover:text-[#DB4444] transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2 mt-auto">
                        <div className="flex text-[#FFAD33]">
                          {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" strokeWidth={0} />)}
                        </div>
                        <span className="text-[11px] text-gray-400">({product.reviews || 0})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#DB4444] font-semibold text-sm">{product.price.toLocaleString('vi-VN')}đ</span>
                        {product.oldPrice && (
                          <span className="text-gray-400 text-xs line-through">{product.oldPrice.toLocaleString('vi-VN')}đ</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Filter size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 font-display">Không tìm thấy sản phẩm nào</h3>
              <p className="text-gray-500 font-body text-sm">Hãy thử điều chỉnh lại mức giá hoặc bộ lọc để tìm thấy sản phẩm bạn mong muốn nhé.</p>
            </div>
          )}

          {!isLoading && filteredProducts.length > 0 && (
            <div className="mt-12 text-center">
              <button className="px-8 py-3 bg-white border border-gray-200 font-body text-sm font-medium text-gray-700 hover:border-[#DB4444] hover:text-[#DB4444] transition-all rounded-sm shadow-sm">
                Xem thêm sản phẩm
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={`fixed inset-0 bg-black/50 z-[200] lg:hidden touch-none transition-opacity duration-300 ${isMobileFilterOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`} onClick={() => setIsMobileFilterOpen(false)} />
      <div className={`fixed inset-y-0 left-0 w-[280px] bg-white z-[210] lg:hidden transform transition-transform duration-300 ease-in-out flex flex-col ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-display font-semibold text-xl text-gray-900">Lọc sản phẩm</span>
          <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-gray-400 hover:text-[#DB4444]"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{renderFilters()}</div>
        <div className="p-4 border-t border-gray-100 flex gap-3">
          <button onClick={() => { setPriceRange([MIN_PRICE, MAX_PRICE]); setIsMobileFilterOpen(false); }} className="flex-1 py-3 border border-gray-200 text-gray-700 font-medium text-sm rounded-sm hover:bg-gray-50 transition-colors">Thiết lập lại</button>
          <button onClick={() => setIsMobileFilterOpen(false)} className="flex-1 py-3 bg-[#DB4444] text-white font-medium text-sm rounded-sm hover:bg-red-600 transition-colors">Áp dụng</button>
        </div>
      </div>
    </div>
  );
}