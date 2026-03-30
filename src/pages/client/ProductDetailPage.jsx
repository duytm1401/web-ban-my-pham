import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, Heart, Truck, RotateCcw, ShoppingCart, ChevronRight } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();

  const product = {
    id: id || "1",
    name: "Tinh chất phục hồi da Estee Lauder Advanced Night Repair",
    brand: "Estée Lauder",
    price: 2500000,
    oldPrice: 3000000,
    rating: 4.8,
    reviews: 150,
    inStock: true,
    description:
      "Serum số 1 châu Á giúp phục hồi da tổn thương, chống lão hóa và cấp ẩm sâu. Công nghệ ChronoluxCB™ độc quyền giúp tối ưu hóa quá trình tái tạo tự nhiên của da vào ban đêm, mang lại làn da rạng rỡ, mịn màng và trẻ trung hơn.",
    images: [
      "/images/sp1.4.jpg",
      "/images/sp1.3.webp",
      "/images/sp1.2.webp",
      "/images/sp1.1.webp",
    ],
    colors: ["#FADCAD", "#E8C396"],
    sizes: ["30ml", "50ml", "75ml"],
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Sữa Rửa Mặt La Roche-Posay Purifying Foaming",
      brand: "La Roche-Posay",
      price: 420000,
      oldPrice: 485000,
      rating: 5,
      reviews: 156,
      image: "/images/anh2.jpg" 
    },
    {
      id: 3,
      name: "Nước Tẩy Trang Bioderma Sensibio H2O (Nắp hồng)",
      brand: "Bioderma",
      price: 495000,
      oldPrice: 530000,
      rating: 5,
      reviews: 412,
      image: "/images/anh3.jpg" 
    },
    {
      id: 5,
      name: "Kem Dưỡng Ẩm Kiehl's Ultra Facial Cream",
      brand: "Kiehl's",
      price: 850000,
      oldPrice: 950000,
      rating: 5,
      reviews: 198,
      image: "/images/anh5.webp" 
    },
    {
      id: 6,
      name: "Sữa Chống Nắng Anessa Perfect UV Sunscreen",
      brand: "Anessa",
      price: 550000,
      oldPrice: 620000,
      rating: 5,
      reviews: 510,
      image: "/images/anh6.png" 
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentIndex(0);
    setQuantity(1);
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }, 3500); // 3500ms = 3.5 giây

    // Dọn dẹp timer khi component bị hủy để tránh rò rỉ bộ nhớ
    return () => clearInterval(timer);
  }, [product.images.length]);

  const decreaseQty = () => setQuantity((p) => (Number(p) > 1 ? Number(p) - 1 : 1));
  const increaseQty = () => setQuantity((p) => Number(p) + 1);

  return (
    <div className="bg-white min-h-screen pb-20 font-body">

      <style>{`
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* 1. BREADCRUMB */}
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

        {/* ── 2. CHI TIẾT SẢN PHẨM ─────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 mb-20">
          <div className="lg:w-[52%] flex-shrink-0">

            <div className="relative bg-gray-50 rounded-sm overflow-hidden aspect-square w-full mb-4">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} - Ảnh ${idx + 1}`}
                  className={`absolute top-0 left-0 w-full h-full object-cover mix-blend-multiply transition-opacity duration-700 ease-in-out ${
                    currentIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                />
              ))}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)} 
                  className={`flex-shrink-0 w-[72px] h-[72px] sm:w-20 sm:h-20 bg-gray-50 rounded-sm overflow-hidden border-2 transition-all ${
                    currentIndex === idx 
                      ? "border-[#DB4444]"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Ảnh ${idx + 1}`}
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── CỘT PHẢI: THÔNG TIN ─────────────────────────────────────── */}
          <div className="flex-1 flex flex-col min-w-0">

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
              {product.brand}
            </p>

            <h1 className="text-xl sm:text-2xl font-medium text-gray-900 font-display leading-snug mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div className="flex text-[#FFAD33]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    strokeWidth={i < Math.floor(product.rating) ? 0 : 1}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews} đánh giá)</span>
              <span className="text-gray-200">|</span>
              <span className={`text-sm font-medium ${product.inStock ? "text-green-500" : "text-red-400"}`}>
                {product.inStock ? "Còn hàng" : "Hết hàng"}
              </span>
            </div>

            {/* Giá */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-2xl font-semibold text-[#DB4444] font-display">
                {product.price.toLocaleString("vi-VN")}đ
              </span>
              {product.oldPrice && (
                <span className="text-base text-gray-400 line-through">
                  {product.oldPrice.toLocaleString("vi-VN")}đ
                </span>
              )}
              {product.oldPrice && (
                <span className="text-xs font-bold bg-[#DB4444] text-white px-2 py-0.5 rounded-sm">
                  -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-6 pb-6 border-b border-gray-100">
              {product.description}
            </p>

            {/* Tone màu */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-sm font-semibold text-gray-700 w-20 flex-shrink-0">Tone màu:</span>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    className={`w-6 h-6 rounded-full transition-all ${
                      selectedColor === color
                        ? "ring-2 ring-gray-900 ring-offset-2 scale-110"
                        : "hover:scale-110 ring-1 ring-gray-200"
                    }`}
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
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 border rounded-sm text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "bg-[#DB4444] border-[#DB4444] text-white"
                        : "border-gray-300 text-gray-700 hover:border-[#DB4444] hover:text-[#DB4444]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-8 flex-wrap">
              {/* Số lượng */}
              <div className="flex items-center border border-gray-300 rounded-sm h-11 w-[120px] flex-shrink-0 select-none">
                <button
                  type="button"
                  onClick={decreaseQty}
                  className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-[#DB4444] hover:text-white transition-colors rounded-l-sm"
                >
                  <Minus size={15} />
                </button>
                <span className="flex-1 h-full flex items-center justify-center text-sm font-semibold border-x border-gray-300 pointer-events-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={increaseQty}
                  className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-[#DB4444] hover:text-white transition-colors rounded-r-sm"
                >
                  <Plus size={15} />
                </button>
              </div>

              {/* Thêm vào giỏ */}
              <button type="button" className="h-11 flex-1 min-w-[120px] bg-[#DB4444] text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-colors shadow-sm flex items-center justify-center gap-2">
                <ShoppingCart size={16} /> Thêm vào giỏ
              </button>

              {/* Yêu thích */}
              <button
                type="button"
                onClick={() => setWishlisted(!wishlisted)}
                className={`h-11 w-11 flex-shrink-0 border rounded-sm flex items-center justify-center transition-colors ${
                  wishlisted
                    ? "border-[#DB4444] text-[#DB4444] bg-red-50"
                    : "border-gray-300 text-gray-500 hover:border-[#DB4444] hover:text-[#DB4444]"
                }`}
              >
                <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Mua ngay  */}
            <button type="button" className="h-11 w-full border-2 border-[#DB4444] text-[#DB4444] text-sm font-semibold rounded-sm hover:bg-[#DB4444] hover:text-white transition-colors mb-8">
              Mua Ngay
            </button>

            {/* Giao hàng & đổi trả */}
            <div className="border border-gray-200 rounded-sm divide-y divide-gray-100">
              <div className="flex items-center gap-4 px-4 py-4">
                <Truck size={28} strokeWidth={1.5} className="text-gray-700 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Miễn phí giao hàng</h4>
                  <p className="text-xs text-gray-500 mt-0.5 underline cursor-pointer">
                    Nhập mã bưu điện để xem thời gian giao hàng
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 py-4">
                <RotateCcw size={28} strokeWidth={1.5} className="text-gray-700 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Hoàn trả dễ dàng</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Hoàn trả miễn phí trong vòng 30 ngày.{" "}
                    <span className="underline cursor-pointer">Chi tiết</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── 3. SẢN PHẨM LIÊN QUAN ────────────────────────────────────── */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-5 h-10 bg-[#DB4444] rounded-sm flex-shrink-0" />
          <h2 className="text-[#DB4444] font-bold tracking-wide text-sm">Sản Phẩm Tương Tự</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-5 lg:gap-x-6 mb-6">
          {relatedProducts.map((prod) => (
            <div key={prod.id} className="group relative font-body flex flex-col h-full min-w-0">
              <div className="absolute top-2 left-2 z-10 bg-[#DB4444] text-white text-[10px] font-bold px-2 py-1 rounded-sm tracking-wider">
                -{Math.round((1 - prod.price / prod.oldPrice) * 100)}%
              </div>

              <div className="relative bg-gray-50 aspect-[4/5] rounded-sm overflow-hidden mb-3">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
                <button type="button" className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-[#DB4444] shadow-sm transition-colors">
                  <Heart size={14} />
                </button>
                <button type="button" className="absolute bottom-0 left-0 right-0 bg-black text-white font-medium py-2.5 text-xs flex items-center justify-center gap-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#DB4444]">
                  <ShoppingCart size={14} /> Thêm vào giỏ
                </button>
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                  {prod.brand}
                </span>
                <Link
                  to={`/san-pham/${prod.id}`}
                  className="text-sm font-medium text-gray-900 leading-snug mb-1 hover:text-[#DB4444] transition-colors line-clamp-2"
                >
                  {prod.name}
                </Link>
                <div className="flex items-center gap-1 mb-2 mt-auto">
                  <div className="flex text-[#FFAD33]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400">({prod.reviews})</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[#DB4444] font-semibold text-sm">
                    {prod.price.toLocaleString("vi-VN")}đ
                  </span>
                  <span className="text-gray-400 text-xs line-through">
                    {prod.oldPrice.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}