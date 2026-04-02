import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, Heart, Truck, RotateCcw, ShoppingCart, ChevronRight, Eye, ThumbsUp, Camera, ChevronDown, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext'; 
import { useWishlist } from '../../context/WishlistContext';

const PRODUCT_DETAILS = {
  htmlDescription: `
    <p><strong>Tinh chất phục hồi da Estee Lauder Advanced Night Repair</strong> là serum số 1 châu Á, được mệnh danh là "nước thần" giúp phục hồi da tổn thương, chống lão hóa và cấp ẩm sâu.</p>
    <br/>
    <p><strong>Công dụng nổi bật:</strong></p>
    <ul>
      <li>Công nghệ ChronoluxCB™ độc quyền giúp tối ưu hóa quá trình tái tạo tự nhiên của da vào ban đêm.</li>
      <li>Cấp ẩm chuyên sâu với Hyaluronic Acid đa tầng, giữ ẩm 72 giờ liên tục.</li>
      <li>Làm đều màu da, mờ thâm và tăng cường hàng rào bảo vệ da.</li>
    </ul>
    <br/>
    <img src="/images/anh-chi-tiet-sp/sp1.1.webp" alt="Estee Lauder" style="width: 100%; border-radius: 8px; margin-bottom: 16px;" />
    <br/>
    <p><strong>Hướng dẫn sử dụng:</strong></p>
    <p>1. Làm sạch da với sữa rửa mặt phù hợp, sau đó dùng toner cân bằng da.</p>
    <p>2. Lấy 3–4 giọt serum ra lòng bàn tay, xoa nhẹ hai tay vào nhau để làm ấm.</p>
    <p>3. Áp nhẹ lên toàn mặt và cổ, massage theo chuyển động hướng lên và ra ngoài.</p>
    <p>4. Chờ 1–2 phút để serum thấm hoàn toàn trước khi dùng kem dưỡng ẩm.</p>
  `
};

const MOCK_REVIEWS = [
  { id: 1, name: "Linh Nguyễn", avatar: "L", avatarBg: "#fde8e8", avatarColor: "#DB4444", rating: 5, date: "15 tháng 3, 2025", variant: "50ml · Tone #FADCAD", title: "Serum tốt nhất tôi từng dùng!", content: "Sau 3 tuần sử dụng, da tôi thực sự cải thiện rõ rệt. Vết thâm mờ đi đáng kể, da ẩm mượt hơn và tone da đều hơn hẳn. Serum thấm nhanh, không nhờn dính. Sẽ mua lại lần 3 rồi và sẽ còn tiếp tục!", helpful: 42, hasPhoto: true, verified: true },
  { id: 2, name: "Phương Trâm", avatar: "P", avatarBg: "#e8f5e9", avatarColor: "#2e7d32", rating: 5, date: "28 tháng 2, 2025", variant: "30ml · Tone #E8C396", title: "Đáng đồng tiền bát gạo", content: "Ban đầu ngần ngại vì giá cao, nhưng chỉ cần một tuần là tôi thấy ngay sự khác biệt. Da sáng hơn, mềm hơn và căng bóng hơn vào buổi sáng. Mùi hương nhẹ nhàng dễ chịu, không kích ứng.", helpful: 28, hasPhoto: false, verified: true },
  { id: 3, name: "Minh Anh", avatar: "M", avatarBg: "#e3f2fd", avatarColor: "#1565c0", rating: 4, date: "10 tháng 2, 2025", variant: "75ml · Tone #FADCAD", title: "Tốt nhưng cần kiên nhẫn", content: "Hiệu quả đến sau khoảng 2–3 tuần nên cần kiên nhẫn. Da tôi hết bị khô và căng sau khi rửa mặt. Chưa thấy nhiều cải thiện về nếp nhăn nhưng độ ẩm thì tuyệt. Trừ 1 sao vì giá hơi cao so với lượng sản phẩm.", helpful: 15, hasPhoto: false, verified: true },
];

const RATING_DISTRIBUTION = [
  { stars: 5, count: 118, pct: 79 },
  { stars: 4, count: 22,  pct: 15 },
  { stars: 3, count: 6,   pct: 4  },
  { stars: 2, count: 3,   pct: 2  },
  { stars: 1, count: 1,   pct: 1  },
];

// SUB-COMPONENTS

const SectionTab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`pb-3 text-sm font-semibold tracking-wide border-b-2 transition-colors whitespace-nowrap ${
      active ? 'border-[#DB4444] text-[#DB4444]' : 'border-transparent text-gray-400 hover:text-gray-700'
    }`}
  >
    {label}
  </button>
);

const ReviewCard = ({ review }) => {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl p-5 sm:p-6 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ backgroundColor: review.avatarBg, color: review.avatarColor }}>
          {review.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-semibold text-gray-900 text-sm">{review.name}</span>
            {review.verified && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <Check size={9} /> Đã mua hàng
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex text-[#FFAD33]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} fill={i < review.rating ? 'currentColor' : 'none'} strokeWidth={i < review.rating ? 0 : 1.5} />
              ))}
            </div>
            <span className="text-[11px] text-gray-400">{review.date}</span>
          </div>
        </div>
      </div>
      {review.variant && (
        <p className="text-[11px] text-gray-400 bg-gray-50 inline-block px-2 py-0.5 rounded-full mb-3">Phân loại: {review.variant}</p>
      )}
      <h4 className="font-semibold text-gray-900 text-sm mb-2">{review.title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{review.content}</p>
      {review.hasPhoto && (
        <div className="flex gap-2 mb-4">
          {[1, 2].map(n => (
            <div key={n} className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 cursor-pointer hover:bg-gray-200 transition-colors">
              <Camera size={16} />
            </div>
          ))}
        </div>
      )}
      <button onClick={() => { if (!voted) { setHelpful(h => h + 1); setVoted(true); } }} className={`flex items-center gap-1.5 text-xs transition-colors ${voted ? 'text-[#DB4444]' : 'text-gray-400 hover:text-gray-600'}`}>
        <ThumbsUp size={13} fill={voted ? 'currentColor' : 'none'} /> Hữu ích ({helpful})
      </button>
    </div>
  );
};

// TRANG CHÍNH
export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { addToCart } = useCart(); 
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const product = {
    id: id || "1",
    name: "Tinh chất phục hồi da Estee Lauder Advanced Night Repair",
    brand: "Estée Lauder",
    price: 2500000,
    oldPrice: 3000000,
    rating: 4.8,
    reviews: 150,
    inStock: true,
    images: [
      "/images/anh-chi-tiet-sp/sp1.4.jpg",
      "/images/anh-chi-tiet-sp/sp1.3.webp",
      "/images/anh-chi-tiet-sp/sp1.2.webp",
      "/images/anh-chi-tiet-sp/sp1.1.webp",
    ],
    colors: ["#FADCAD", "#E8C396"],
    sizes: ["30ml", "50ml", "75ml"],
  };

  const relatedProducts = [
    { id: 2, name: "Sữa Rửa Mặt La Roche-Posay Purifying Foaming", brand: "La Roche-Posay", price: 420000, oldPrice: 485000, rating: 5, reviews: 156, image: "/images/anh-sp/anh2.jpg" },
    { id: 3, name: "Nước Tẩy Trang Bioderma Sensibio H2O (Nắp hồng)", brand: "Bioderma", price: 495000, oldPrice: 530000, rating: 5, reviews: 412, image: "/images/anh-sp/anh3.jpg" },
    { id: 5, name: "Kem Dưỡng Ẩm Kiehl's Ultra Facial Cream", brand: "Kiehl's", price: 850000, oldPrice: 950000, rating: 5, reviews: 198, image: "/images/anh-sp/anh5.webp" },
    { id: 6, name: "Sữa Chống Nắng Anessa Perfect UV Sunscreen", brand: "Anessa", price: 550000, oldPrice: 620000, rating: 5, reviews: 510, image: "/images/anh-sp/anh6.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [activeTab, setActiveTab] = useState('description'); 
  const [sortReview, setSortReview] = useState('Mới nhất');
  const [filterStar, setFilterStar] = useState(null);
  
  const isMainProductWished = isInWishlist(product.id);
  const [isAdded, setIsAdded] = useState(false); 

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentIndex(0);
    setQuantity(1);
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }, 3500); 
    return () => clearInterval(timer);
  }, [product.images.length]);

  const decreaseQty = () => setQuantity((p) => (Number(p) > 1 ? Number(p) - 1 : 1));
  const increaseQty = () => setQuantity((p) => Number(p) + 1);

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedColor}-${selectedSize}`, 
      name: product.name, price: product.price,
      image: product.images[0], color: selectedColor, size: selectedSize
    }, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({
      id: `${product.id}-${selectedColor}-${selectedSize}`, 
      name: product.name, price: product.price,
      image: product.images[0], color: selectedColor, size: selectedSize
    }, quantity);
    navigate('/thanh-toan');
  };

  const handleToggleMainWishlist = () => {
    if (isMainProductWished) removeFromWishlist(product.id);
    else addToWishlist({ id: product.id, name: product.name, price: product.price, oldPrice: product.oldPrice, image: product.images[0], brand: product.brand, inStock: product.inStock });
  };

  const filteredReviews = filterStar
    ? MOCK_REVIEWS.filter(r => r.rating === filterStar)
    : MOCK_REVIEWS;

  const avgRating = (RATING_DISTRIBUTION.reduce((s, r) => s + r.stars * r.count, 0) / RATING_DISTRIBUTION.reduce((s, r) => s + r.count, 0)).toFixed(1);

  return (
    <div className="bg-white min-h-screen pb-20 font-body mt-[72px]">
      <style>{`
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        
        /* Định dạng lại thẻ HTML do thư viện nhả ra */
        .prose p { margin-bottom: 1em; line-height: 1.6; color: #4b5563; }
        .prose strong { font-weight: 600; color: #111827; }
        .prose ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1em; color: #4b5563; }
        .prose li { margin-bottom: 0.5em; }
      `}</style>

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
          <Link to="/" className="hover:text-[#DB4444] transition-colors whitespace-nowrap">Trang chủ</Link>
          <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
          <Link to="/danh-muc" className="hover:text-[#DB4444] transition-colors whitespace-nowrap">Chăm sóc da</Link>
          <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
          <span className="text-gray-900 font-medium min-w-0 truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── CHI TIẾT SẢN PHẨM ─────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 mb-20">
          
          {/* CỘT TRÁI: ẢNH */}
          <div className="lg:w-[52%] flex-shrink-0">
            <div className="relative bg-gray-50 rounded-sm overflow-hidden aspect-square w-full mb-4">
              {product.images.map((img, idx) => (
                <img key={idx} src={img} alt={`${product.name} - Ảnh ${idx + 1}`}
                  className={`absolute top-0 left-0 w-full h-full object-cover mix-blend-multiply transition-opacity duration-700 ease-in-out ${currentIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                />
              ))}
            </div>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
              {product.images.map((img, idx) => (
                <button key={idx} type="button" onClick={() => setCurrentIndex(idx)}
                  className={`flex-shrink-0 w-[72px] h-[72px] sm:w-20 sm:h-20 bg-gray-50 rounded-sm overflow-hidden border-2 transition-all ${currentIndex === idx ? "border-[#DB4444]" : "border-transparent hover:border-gray-300"}`}
                >
                  <img src={img} alt={`Ảnh ${idx + 1}`} className="w-full h-full object-cover mix-blend-multiply" />
                </button>
              ))}
            </div>
          </div>

          {/* CỘT PHẢI: THÔNG TIN CHÍNH */}
          <div className="flex-1 flex flex-col min-w-0">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">{product.brand}</p>
            <h1 className="text-xl sm:text-2xl font-medium text-gray-900 font-display leading-snug mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div className="flex text-[#FFAD33]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(product.rating) ? 0 : 1} />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews} đánh giá)</span>
              <span className="text-gray-200">|</span>
              <span className={`text-sm font-medium ${product.inStock ? "text-green-500" : "text-red-400"}`}>
                {product.inStock ? "Còn hàng" : "Hết hàng"}
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-2xl font-semibold text-[#DB4444] font-display">{product.price.toLocaleString("vi-VN")}đ</span>
              {product.oldPrice && <span className="text-base text-gray-400 line-through">{product.oldPrice.toLocaleString("vi-VN")}đ</span>}
              {product.oldPrice && (
                <span className="text-xs font-bold bg-[#DB4444] text-white px-2 py-0.5 rounded-sm">
                  -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-6 pb-6 border-b border-gray-100">
               Serum số 1 châu Á giúp phục hồi da tổn thương, chống lão hóa và cấp ẩm sâu. Công nghệ ChronoluxCB™ độc quyền.
            </p>

            {/* Tone màu */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-sm font-semibold text-gray-700 w-20 flex-shrink-0">Tone màu:</span>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button key={color} type="button" onClick={() => setSelectedColor(color)} title={color}
                    className={`w-6 h-6 rounded-full transition-all ${selectedColor === color ? "ring-2 ring-gray-900 ring-offset-2 scale-110" : "hover:scale-110 ring-1 ring-gray-200"}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Dung tích */}
            <div className="flex items-center gap-4 mb-7">
              <span className="text-sm font-semibold text-gray-700 w-20 flex-shrink-0">Dung tích:</span>
              <div className="flex items-center gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button key={size} type="button" onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 border rounded-sm text-sm font-medium transition-colors ${selectedSize === size ? "bg-[#DB4444] border-[#DB4444] text-white" : "border-gray-300 text-gray-700 hover:border-[#DB4444] hover:text-[#DB4444]"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div className="flex items-center border border-gray-300 rounded-sm h-11 w-[120px] flex-shrink-0 select-none">
                <button type="button" onClick={decreaseQty} className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-[#DB4444] hover:text-white transition-colors rounded-l-sm"><Minus size={15} /></button>
                <span className="flex-1 h-full flex items-center justify-center text-sm font-semibold border-x border-gray-300 pointer-events-none">{quantity}</span>
                <button type="button" onClick={increaseQty} className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-[#DB4444] hover:text-white transition-colors rounded-r-sm"><Plus size={15} /></button>
              </div>

              <button type="button" onClick={handleAddToCart}
                className={`h-11 flex-1 min-w-[120px] text-white text-sm font-medium rounded-sm transition-colors shadow-sm flex items-center justify-center gap-2 ${isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-[#DB4444] hover:bg-red-600'}`}
              >
                {isAdded ? <>Đã thêm vào giỏ ✓</> : <><ShoppingCart size={16} /> Thêm vào giỏ</>}
              </button>

              <button type="button" onClick={handleToggleMainWishlist}
                className={`h-11 w-11 flex-shrink-0 border rounded-sm flex items-center justify-center transition-colors ${isMainProductWished ? "border-[#DB4444] text-[#DB4444] bg-red-50" : "border-gray-300 text-gray-500 hover:border-[#DB4444] hover:text-[#DB4444]"}`}
              >
                <Heart size={18} fill={isMainProductWished ? "currentColor" : "none"} />
              </button>
            </div>

            <button type="button" onClick={handleBuyNow}
              className="h-11 w-full border-2 border-[#DB4444] text-[#DB4444] text-sm font-semibold rounded-sm hover:bg-[#DB4444] hover:text-white transition-colors mb-8"
            >
              Mua Ngay
            </button>

            {/* Giao hàng & đổi trả */}
            <div className="border border-gray-200 rounded-sm divide-y divide-gray-100">
              <div className="flex items-center gap-4 px-4 py-4">
                <Truck size={28} strokeWidth={1.5} className="text-gray-700 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Miễn phí giao hàng</h4>
                  <p className="text-xs text-gray-500 mt-0.5 underline cursor-pointer">Nhập mã bưu điện để xem thời gian giao hàng</p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 py-4">
                <RotateCcw size={28} strokeWidth={1.5} className="text-gray-700 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Hoàn trả dễ dàng</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Hoàn trả miễn phí trong vòng 30 ngày. <span className="underline cursor-pointer">Chi tiết</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABS: MÔ TẢ & ĐÁNH GIÁ */}
        <div className="border-b border-gray-200 mb-10">
          <div className="flex gap-8 overflow-x-auto hide-scrollbar">
            <SectionTab label="Mô tả sản phẩm" active={activeTab === 'description'} onClick={() => setActiveTab('description')} />
            <SectionTab
              label={`Đánh giá (${MOCK_REVIEWS.length})`}
              active={activeTab === 'reviews'}
              onClick={() => setActiveTab('reviews')}
            />
          </div>
        </div>

        {/* ── TAB: MÔ TẢ (Đã tối ưu kiểu HTML chuẩn VN) ────────────────── */}
        {activeTab === 'description' && (
          <div className="mb-20 max-w-4xl mx-auto">
            {/* Sử dụng dangerouslySetInnerHTML để nhúng HTML trực tiếp */}
            <div 
              className="prose text-sm md:text-base text-gray-600"
              dangerouslySetInnerHTML={{ __html: PRODUCT_DETAILS.htmlDescription }}
            />
          </div>
        )}

        {/* ── TAB: ĐÁNH GIÁ ───────────────────────────────────────────── */}
        {activeTab === 'reviews' && (
          <div className="mb-20">

            {/* Tổng quan rating */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 mb-10 p-6 border border-gray-100 rounded-2xl bg-gray-50/50">
              
              <div className="flex flex-col items-center justify-center sm:border-r sm:border-gray-200 sm:pr-12 text-center">
                <p className="text-6xl font-bold text-gray-900 font-display leading-none mb-2">{avgRating}</p>
                <div className="flex text-[#FFAD33] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.round(Number(avgRating)) ? 'currentColor' : 'none'} strokeWidth={i < Math.round(Number(avgRating)) ? 0 : 1.5} />
                  ))}
                </div>
                <p className="text-xs text-gray-400">{RATING_DISTRIBUTION.reduce((s, r) => s + r.count, 0)} đánh giá</p>
              </div>

              <div className="flex-1 space-y-2">
                {RATING_DISTRIBUTION.map(({ stars, count, pct }) => (
                  <button
                    key={stars}
                    onClick={() => setFilterStar(filterStar === stars ? null : stars)}
                    className={`w-full flex items-center gap-3 group transition-opacity ${filterStar && filterStar !== stars ? 'opacity-40' : ''}`}
                  >
                    <span className="text-xs text-gray-500 w-8 text-right flex-shrink-0">{stars} ★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FFAD33] rounded-full transition-all duration-500 group-hover:bg-[#DB4444]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-6 flex-shrink-0">{count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bộ lọc & sắp xếp */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                {filterStar && (
                  <button
                    onClick={() => setFilterStar(null)}
                    className="flex items-center gap-1.5 text-xs bg-[#DB4444] text-white px-3 py-1.5 rounded-full font-medium"
                  >
                    {filterStar} sao <span className="ml-0.5">×</span>
                  </button>
                )}
                <p className="text-sm text-gray-500">
                  {filterStar ? `${filteredReviews.length} đánh giá` : `Tất cả ${MOCK_REVIEWS.length} đánh giá`}
                </p>
              </div>

              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-sm text-sm font-medium text-gray-700 hover:border-[#DB4444] transition-colors bg-white">
                  {sortReview} <ChevronDown size={14} className="text-gray-400" />
                </button>
                <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 rounded-sm">
                  {["Mới nhất", "Cũ nhất", "Đánh giá cao nhất", "Hữu ích nhất"].map(opt => (
                    <div key={opt} onClick={() => setSortReview(opt)}
                      className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 hover:text-[#DB4444] transition-colors ${sortReview === opt ? 'text-[#DB4444] font-medium' : 'text-gray-600'}`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Danh sách đánh giá */}
            <div className="space-y-4 mb-8">
              {filteredReviews.length > 0 ? (
                filteredReviews.map(review => <ReviewCard key={review.id} review={review} />)
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Star size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Không có đánh giá nào cho {filterStar} sao.</p>
                </div>
              )}
            </div>

            <div className="text-center border-t border-gray-100 pt-8">
              <p className="text-sm text-gray-500 mb-4">Bạn đã mua sản phẩm này? Hãy chia sẻ cảm nhận của bạn!</p>
              <button className="px-8 py-3 border-2 border-[#DB4444] text-[#DB4444] font-semibold text-sm rounded-sm hover:bg-[#DB4444] hover:text-white transition-colors">
                Viết đánh giá của bạn
              </button>
            </div>
          </div>
        )}

        {/* SẢN PHẨM TƯƠNG TỰ (LUÔN HIỆN — dưới cùng)*/}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-5 h-10 bg-[#DB4444] rounded-sm flex-shrink-0" />
          <h2 className="text-[#DB4444] font-bold tracking-wide text-lg font-display">Sản Phẩm Tương Tự</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-0 pt-2 pb-8 mb-6">
          {relatedProducts.map((prod) => {
            const isFav = isInWishlist(prod.id);
            return (
              <Link
                key={prod.id}
                to={`/san-pham/${prod.id}`}
                className="group block relative font-body transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] bg-white rounded-xl p-2.5 h-full flex flex-col min-w-0"
              >
                <div className="absolute top-4 left-4 z-10 bg-[#DB4444] text-white text-[10px] font-bold px-2 py-1 rounded-sm tracking-wider pointer-events-none">
                  -{Math.round((1 - prod.price / prod.oldPrice) * 100)}%
                </div>

                <div className="relative bg-gray-50 aspect-[4/5] rounded-lg overflow-hidden mb-3">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (isFav) removeFromWishlist(prod.id); else addToWishlist(prod); }}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm transition-all z-20 hover:scale-110"
                  >
                    <Heart size={14} fill={isFav ? "#DB4444" : "none"} className={isFav ? "text-[#DB4444]" : "text-gray-400"} />
                  </button>

                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    className="absolute top-12 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm transition-all z-20 hover:scale-110 opacity-0 group-hover:opacity-100"
                  >
                    <Eye size={14} className="text-gray-400" />
                  </button>

                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart({ id: prod.id, name: prod.name, price: prod.price, image: prod.image, brand: prod.brand }, 1); }}
                    className="absolute bottom-0 left-0 right-0 bg-black text-white font-medium py-3 text-xs flex items-center justify-center gap-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#DB4444] z-20"
                  >
                    <ShoppingCart size={14} /> Thêm vào giỏ
                  </button>
                </div>

                <div className="flex flex-col flex-1 px-1 min-w-0 pointer-events-none">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">{prod.brand}</span>
                  <h3 className="text-sm font-medium text-gray-900 leading-snug mb-1 group-hover:text-[#DB4444] transition-colors line-clamp-2">{prod.name}</h3>
                  <div className="flex items-center gap-1 mb-2 mt-auto">
                    <div className="flex text-[#FFAD33]">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" strokeWidth={0} />)}
                    </div>
                    <span className="text-[11px] text-gray-400">({prod.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[#DB4444] font-semibold text-sm">{prod.price.toLocaleString("vi-VN")}đ</span>
                    <span className="text-gray-400 text-xs line-through">{prod.oldPrice.toLocaleString("vi-VN")}đ</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}