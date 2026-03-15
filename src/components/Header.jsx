import React, { useState } from "react";
import { Menu, Search, Heart, ShoppingCart, User, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      
      {/* Top Bar Đen */}
      <div className="bg-black text-white text-[10px] sm:text-xs py-2.5 text-center flex justify-center items-center gap-2 px-2">
        <span className="truncate">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
        <a href="#" className="font-bold underline whitespace-nowrap">ShopNow</a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* CỤM TRÁI: MOBILE MENU BUTTON + LOGO */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-black hover:text-[#DB4444] transition-colors"
              onClick={() => setOpen(true)}
            >
              <Menu size={28} />
            </button>

            <h1 className="text-2xl font-bold tracking-wider cursor-pointer">
              Aurelia Store
            </h1>
          </div>

          {/* CỤM GIỮA: DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-10 text-base font-medium">
            <a className="border-b-2 border-black pb-1 cursor-pointer">Trang chủ</a>
            <a className="hover:text-[#DB4444] hover:border-b-2 hover:border-[#DB4444] pb-1 border-b-2 border-transparent transition-all cursor-pointer">Sản phẩm</a>
            <a className="hover:text-[#DB4444] hover:border-b-2 hover:border-[#DB4444] pb-1 border-b-2 border-transparent transition-all cursor-pointer">Tin tức</a>
            <a className="hover:text-[#DB4444] hover:border-b-2 hover:border-[#DB4444] pb-1 border-b-2 border-transparent transition-all cursor-pointer">Liên hệ</a>
          </nav>

          {/* CỤM PHẢI: SEARCH + ICONS */}
          <div className="flex items-center gap-5 sm:gap-6">
            
            {/* Thanh tìm kiếm (Desktop & Tablet) */}
            <div className="hidden md:flex items-center bg-[#F5F5F5] px-4 py-2.5 rounded-sm w-56 lg:w-64 relative">
              <input
                className="bg-transparent outline-none flex-1 text-sm text-gray-700"
                placeholder="Bạn tìm gì..."
              />
              <Search size={18} className="text-gray-500 cursor-pointer absolute right-4 hover:text-[#DB4444]" />
            </div>

            {/* Nút tìm kiếm lẻ (Mobile) */}
            <Search size={24} className="md:hidden cursor-pointer hover:text-[#DB4444] transition-colors" />

            {/* Icons */}
            <div className="flex items-center gap-4 sm:gap-5">
              <Heart size={24} className="hidden sm:block cursor-pointer hover:text-[#DB4444] transition-colors" />
              <ShoppingCart size={24} className="cursor-pointer hover:text-[#DB4444] transition-colors" />
              
              {/* Login cho Desktop */}
              <div className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-[#DB4444] transition-colors group">
                <User size={24} />
                <span className="text-sm font-medium">Đăng nhập</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      {/* Lớp màng đen mờ (Overlay) - Bấm vào đây cũng đóng Menu */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity duration-300"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Khối Menu Trượt */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header của Sidebar */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <span className="font-bold text-xl tracking-wide">Aurelia Store</span>
          <button 
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nội dung Menu */}
        <nav className="flex flex-col p-4">
          <a className="py-4 border-b border-gray-50 font-medium hover:text-[#DB4444] flex justify-between items-center">
            Trang chủ <span className="text-gray-400">›</span>
          </a>
          <a className="py-4 border-b border-gray-50 font-medium hover:text-[#DB4444] flex justify-between items-center">
            Sản phẩm <span className="text-gray-400">›</span>
          </a>
          <a className="py-4 border-b border-gray-50 font-medium hover:text-[#DB4444] flex justify-between items-center">
            Tin tức <span className="text-gray-400">›</span>
          </a>
          <a className="py-4 border-b border-gray-50 font-medium hover:text-[#DB4444] flex justify-between items-center">
            Liên hệ <span className="text-gray-400">›</span>
          </a>
        </nav>

        {/* Cụm tiện ích Mobile ở cuối Menu */}
        <div className="mt-auto p-5 border-t border-gray-100 flex flex-col gap-4">
          <a className="flex items-center gap-3 font-medium text-gray-700 hover:text-[#DB4444]">
            <Heart size={20} /> Danh sách yêu thích
          </a>
          <a className="flex items-center gap-3 font-medium text-gray-700 hover:text-[#DB4444]">
            <User size={20} /> Đăng nhập / Đăng ký
          </a>
        </div>

      </div>

    </header>
  );
}