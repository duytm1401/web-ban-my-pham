import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, LogIn, ArrowLeft, ChevronRight, HeartOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function WishlistPage() {
  const { isLoggedIn } = useAuth();

  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Tinh chất phục hồi da Estee Lauder Advanced Night Repair",
      brand: "Estée Lauder",
      price: 2500000,
      oldPrice: 3000000,
      image: "/images/anh1.jpg" ,
      inStock: true,
    },
    {
      id: 3,
      name: "Nước Tẩy Trang Bioderma Sensibio H2O",
      brand: "Bioderma",
      price: 495000,
      oldPrice: 530000,      
      image: "/images/anh3.jpg" ,
      inStock: true,
    },
    {
      id: 6,
      name: "Sữa Chống Nắng Anessa Perfect UV Sunscreen",
      brand: "Anessa",
      price: 550000,
      oldPrice: 620000,
      image: "/images/anh6.png" ,
      inStock: false,
    },
  ]);

  const removeItem = (id) =>
    setWishlistItems((items) => items.filter((item) => item.id !== id));

  const moveAllToCart = () => {
    // Placeholder: chỉ chuyển sản phẩm còn hàng
    alert(`Đã thêm ${wishlistItems.filter(i => i.inStock).length} sản phẩm vào giỏ hàng!`);
  };

  // ── LUỒNG 1: CHƯA ĐĂNG NHẬP ───────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="bg-white min-h-[70vh] flex flex-col items-center justify-center font-body px-4">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <Heart size={40} strokeWidth={1.5} className="text-[#DB4444]" />
        </div>
        <h2 className="text-2xl lg:text-3xl font-display font-semibold text-gray-900 mb-3 text-center">
          Lưu giữ sản phẩm yêu thích
        </h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Vui lòng đăng nhập để tạo và xem bộ sưu tập các sản phẩm làm đẹp mà bạn yêu thích nhé!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#DB4444] text-white font-medium rounded-sm hover:bg-red-600 transition-colors shadow-sm"
          >
            <LogIn size={18} /> Đăng nhập ngay
          </Link>
          <Link
            to="/danh-muc"
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-sm hover:border-[#DB4444] hover:text-[#DB4444] transition-colors"
          >
            <ArrowLeft size={18} /> Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  // ── LUỒNG 2: ĐÃ ĐĂNG NHẬP ────────────────────────────────────────────────
  return (
    <div className="bg-white min-h-screen pb-20 font-body">

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
          <Link to="/" className="hover:text-[#DB4444] transition-colors whitespace-nowrap">
            Trang chủ
          </Link>
          <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
          <span className="text-gray-900 font-medium">Sản phẩm yêu thích</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {wishlistItems.length === 0 ? (
          /* ── WISHLIST TRỐNG ── */
          <div className="text-center py-20">
            {/* FIX 2: HeartOff thay HeartCrack để chắc chắn có trong mọi version lucide */}
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <HeartOff size={48} strokeWidth={1} />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2 font-display">
              Danh sách yêu thích trống
            </h3>
            <p className="text-gray-500 mb-8">
              Bạn chưa lưu sản phẩm nào vào danh sách yêu thích.
            </p>
            <Link
              to="/danh-muc"
              className="inline-block px-8 py-3 bg-[#DB4444] text-white font-medium rounded-sm hover:bg-red-600 transition-colors"
            >
              Khám phá ngay
            </Link>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
              <h2 className="text-xl font-medium text-gray-900 font-display">
                Danh sách của bạn ({wishlistItems.length})
              </h2>
              <button
                onClick={moveAllToCart}
                className="px-6 py-3 border border-gray-300 text-gray-900 font-medium rounded-sm hover:bg-gray-50 transition-colors text-sm w-full sm:w-auto"
              >
                Chuyển tất cả vào Giỏ hàng
              </button>
            </div>

            {/* Grid sản phẩm */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-5 lg:gap-x-6">
              {wishlistItems.map((prod) => (
                <div key={prod.id} className="group relative flex flex-col h-full min-w-0">

                  {/* Badge giảm giá */}
                  {prod.oldPrice && prod.inStock && (
                    <div className="absolute top-2 left-2 z-10 bg-[#DB4444] text-white text-[10px] font-bold px-2 py-1 rounded-sm tracking-wider">
                      -{Math.round((1 - prod.price / prod.oldPrice) * 100)}%
                    </div>
                  )}

                  {/* Vùng ảnh */}
                  <div className="relative bg-gray-50 aspect-[4/5] rounded-sm overflow-hidden mb-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className={`w-full h-full object-cover mix-blend-multiply transition-transform duration-500 ${
                        prod.inStock ? "group-hover:scale-105" : "opacity-60"
                      }`}
                    />

                    {!prod.inStock && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <span className="bg-gray-700 text-white text-xs font-semibold px-3 py-1.5 rounded-sm">
                          Hết hàng
                        </span>
                      </div>
                    )}

                    {/* Nút xóa — luôn hiện trên mobile, hover trên desktop */}
                    <button
                      onClick={() => removeItem(prod.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-[#DB4444] shadow-sm transition-colors z-10 lg:opacity-0 lg:group-hover:opacity-100"
                      title="Xóa khỏi yêu thích"
                    >
                      <Trash2 size={15} />
                    </button>

                    {prod.inStock && (
                      <button className="hidden lg:flex absolute bottom-0 left-0 right-0 bg-black text-white font-medium py-2.5 text-xs items-center justify-center gap-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#DB4444]">
                        <ShoppingCart size={14} /> Thêm vào giỏ
                      </button>
                    )}
                  </div>

                  {/* Thông tin sản phẩm */}
                  <div className="flex flex-col flex-1 min-w-0">
                    {/* FIX 5: Thêm brand label nhất quán với CategoryPage */}
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                      {prod.brand}
                    </span>

                    <Link
                      to={`/san-pham/${prod.id}`}
                      className="text-sm font-medium text-gray-900 leading-snug mb-1 hover:text-[#DB4444] transition-colors line-clamp-2"
                    >
                      {prod.name}
                    </Link>

                    <div className="flex items-center gap-2 flex-wrap mt-auto pt-1">
                      <span className={`font-semibold text-sm ${prod.inStock ? "text-[#DB4444]" : "text-gray-400"}`}>
                        {prod.price.toLocaleString("vi-VN")}đ
                      </span>
                      {prod.oldPrice && (
                        <span className="text-gray-400 text-xs line-through">
                          {prod.oldPrice.toLocaleString("vi-VN")}đ
                        </span>
                      )}
                    </div>

                    <button
                      disabled={!prod.inStock}
                      className={`lg:hidden mt-3 w-full py-2.5 text-xs font-medium rounded-sm flex items-center justify-center gap-2 transition-colors ${
                        prod.inStock
                          ? "bg-black text-white hover:bg-[#DB4444]"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart size={13} />
                      {prod.inStock ? "Thêm vào giỏ" : "Hết hàng"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}