import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, LogIn, ArrowLeft } from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext'; // 1. KÉO ỐNG NƯỚC GIỎ HÀNG VÀO

export default function CartPage() {
  const { isLoggedIn } = useAuth(); 
  const navigate = useNavigate();

  // 2. LẤY DỮ LIỆU THẬT TỪ KHO CHUNG (THAY VÌ DÙNG useState DATA GIẢ)
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // 3. ĐIỀU CHỈNH CÁC HÀM NÀY ĐỂ BẮN LỆNH VÀO KHO
  const increaseQty = (id) => {
    const item = cartItems.find(i => i.id === id);
    if (item) updateQuantity(id, item.quantity + 1);
  };

  const decreaseQty = (id) => {
    const item = cartItems.find(i => i.id === id);
    if (item && item.quantity > 1) updateQuantity(id, item.quantity - 1);
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  // TÍNH TOÁN TIỀN BẠC (Dựa trên hàng thật trong kho)
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0; // Miễn phí giao hàng
  const total = subtotal + shipping;

  // LUỒNG 1: CHƯA ĐĂNG NHẬP -> HIỆN THÔNG BÁO
  if (!isLoggedIn) {
    return (
      <div className="bg-white min-h-[70vh] flex flex-col items-center justify-center font-body px-4 mt-[72px]">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} strokeWidth={1} className="text-gray-400" />
        </div>
        <h2 className="text-2xl lg:text-3xl font-display font-semibold text-gray-900 mb-3 text-center">
          Giỏ hàng của bạn đang chờ
        </h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Vui lòng đăng nhập để xem các sản phẩm đã thêm vào giỏ hàng và tiến hành đặt hàng nhé!
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

  // LUỒNG 2: ĐÃ ĐĂNG NHẬP -> HIỆN GIỎ HÀNG
  return (
    <div className="bg-white min-h-screen pb-20 font-body overflow-x-hidden max-w-full mt-[72px]">
      
      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm text-gray-500">
        <Link to="/" className="hover:text-[#DB4444] transition-colors">Trang chủ</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Giỏ hàng</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {cartItems.length === 0 ? (
          /* TRẠNG THÁI GIỎ HÀNG TRỐNG */
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <ShoppingBag size={48} strokeWidth={1} />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2 font-display">Giỏ hàng của bạn đang trống</h3>
            <p className="text-gray-500 mb-8">Hãy tìm thêm những sản phẩm làm đẹp tuyệt vời nhé!</p>
            <Link to="/danh-muc" className="inline-block px-8 py-3 bg-[#DB4444] text-white font-medium rounded-sm hover:bg-red-600 transition-colors">
              Quay lại cửa hàng
            </Link>
          </div>
        ) : (
          /* BẢNG GIỎ HÀNG */
          <div className="flex flex-col gap-8">
            
            {/* TIÊU ĐỀ CỘT (Chỉ hiện trên Desktop) */}
            <div className="hidden md:grid grid-cols-12 gap-4 py-4 px-6 bg-white border border-gray-100 shadow-sm rounded-sm font-medium text-gray-900">
              <div className="col-span-5">Sản phẩm</div>
              <div className="col-span-2 text-center">Giá</div>
              <div className="col-span-3 text-center">Số lượng</div>
              <div className="col-span-2 text-right">Tạm tính</div>
            </div>

            {/* DANH SÁCH SẢN PHẨM */}
            <div className="flex flex-col gap-6 md:gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="relative grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 px-4 md:px-6 bg-white border border-gray-100 shadow-sm rounded-sm group">
                  
                  {/* Nút xóa sản phẩm (Góc trái trên Desktop) */}
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute -top-2 -left-2 w-6 h-6 bg-[#DB4444] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hidden md:flex hover:scale-110"
                  >
                    <XIcon />
                  </button>

                  {/* Cột 1: Thông tin sản phẩm */}
                  <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 md:w-14 md:h-14 object-cover rounded-sm mix-blend-multiply bg-gray-50" />
                    <div className="flex flex-col">
                      <span className="text-sm md:text-base text-gray-900 font-medium line-clamp-2 pr-4">{item.name}</span>
                      {/* Hiển thị phân loại màu/size nếu có */}
                      <span className="text-xs text-gray-500 mt-1">
                        {item.color && `Màu: ${item.color} `}
                        {item.size && `| Size: ${item.size}`}
                      </span>
                    </div>
                  </div>

                  {/* Cột 2: Giá (Responsive) */}
                  <div className="col-span-1 md:col-span-2 md:text-center text-[#DB4444] font-medium hidden md:block">
                    {item.price.toLocaleString('vi-VN')}đ
                  </div>

                  {/* Cột 3: Số lượng + Giá mobile + Nút Xóa Mobile */}
                  <div className="col-span-1 md:col-span-3 flex items-center justify-between md:justify-center">
                    
                    {/* Hiện giá trên mobile */}
                    <div className="md:hidden text-[#DB4444] font-medium text-sm">
                      {item.price.toLocaleString('vi-VN')}đ
                    </div>

                    <div className="flex items-center border border-gray-200 rounded-sm">
                      <button onClick={() => decreaseQty(item.id)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                        <Minus size={14} strokeWidth={2} />
                      </button>
                      <input 
                        type="text" 
                        readOnly 
                        value={item.quantity} 
                        className="w-10 h-8 text-center text-sm font-medium border-x border-gray-200 outline-none bg-transparent"
                      />
                      <button onClick={() => increaseQty(item.id)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                        <Plus size={14} strokeWidth={2} />
                      </button>
                    </div>

                    {/* Nút xóa trên Mobile */}
                    <button onClick={() => removeItem(item.id)} className="md:hidden text-gray-400 hover:text-[#DB4444] p-2">
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Cột 4: Tổng phụ */}
                  <div className="col-span-1 md:col-span-2 md:text-right font-semibold text-gray-900 hidden md:block">
                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                  </div>

                </div>
              ))}
            </div>

            {/* NÚT ĐIỀU HƯỚNG */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-2">
              <Link to="/danh-muc" className="px-8 py-3.5 border border-gray-300 rounded-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center shadow-sm">
                Quay Lại Cửa Hàng
              </Link>
              <button className="px-8 py-3.5 border border-gray-300 rounded-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center shadow-sm">
                Cập Nhật Giỏ Hàng
              </button>
            </div>

            {/* PHẦN DƯỚI: MÃ GIẢM GIÁ & TỔNG TIỀN */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mt-10">
              
              {/* Box Mã Giảm Giá */}
              <div className="w-full lg:w-[45%] flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  placeholder="Nhập mã giảm giá..." 
                  className="flex-1 px-5 py-3.5 border border-gray-900 rounded-sm text-sm outline-none placeholder:text-gray-400"
                />
                <button className="px-8 py-3.5 bg-[#DB4444] text-white rounded-sm text-sm font-medium hover:bg-red-600 transition-colors whitespace-nowrap shadow-sm">
                  Áp Dụng
                </button>
              </div>

              {/* Box Tổng Tiền */}
              <div className="w-full lg:w-[40%] border border-gray-900 rounded-sm p-6 lg:p-8">
                <h3 className="text-xl font-medium text-gray-900 mb-6 font-display">Tổng Giỏ Hàng</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between pb-4 border-b border-gray-200">
                    <span className="text-gray-600 text-sm">Tạm tính:</span>
                    <span className="font-medium text-gray-900">{subtotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-gray-200">
                    <span className="text-gray-600 text-sm">Giao hàng:</span>
                    <span className="font-medium text-green-600">Miễn phí</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-900 font-medium">Tổng cộng:</span>
                    <span className="font-bold text-lg text-[#DB4444]">{total.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>

                <Link 
                    to="/thanh-toan"
                    className="w-full py-4 bg-[#DB4444] text-white rounded-sm text-sm font-medium hover:bg-red-600 transition-colors shadow-sm tracking-wide flex justify-center items-center"
                >
                    Tiến Hành Thanh Toán
                </Link>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);