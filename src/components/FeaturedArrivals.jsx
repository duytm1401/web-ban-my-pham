import React from 'react';
import { ArrowLeft, ArrowRight, Truck, Headphones, ShieldCheck } from 'lucide-react';

import mainImg from '../assets/FeaturedArrivals/featured-main.jpg';
import topImg from '../assets/FeaturedArrivals/featured-top.jpg';
import bottomImg from '../assets/FeaturedArrivals/featured-bottom.jpg';


export default function FeaturedArrivals() {
  return (
    <section className="mt-10 lg:mt-20 mb-10 lg:mb-20">
      
      {/* 1. Tiêu đề nhỏ */}
      <div className="flex items-center gap-4 mb-4 lg:mb-6">
        <div className="w-5 h-8 lg:h-10 bg-[#DB4444] rounded-sm"></div>
        <span className="text-[#DB4444] font-bold text-sm lg:text-base">Nổi bật</span>
      </div>

      {/* 2. Tiêu đề lớn + Mũi tên */}
      <div className="flex items-end justify-between mb-8 lg:mb-12">
        <h2 className="text-2xl lg:text-4xl font-bold tracking-wider text-black">
          Sản Phẩm Mới Ra Mắt
        </h2>
        <div className="flex gap-2">
          <button className="w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#DB4444] hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          <button className="w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#DB4444] hover:text-white transition-colors">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* 3. Bố cục lưới 2 cột - CHỮ NỔI TRÊN ẢNH */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mb-20">
        
        {/* Khối Trái  */}
        <div className="relative bg-[#122A25] border border-gray-200 rounded-sm overflow-hidden min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-end group z-40">
          
          <img 
            src={mainImg || "https://placehold.co/600x800/122A25/dddddd?text=Bo+Suu+Tap+Mua+Xuan"} 
            alt="New Collection Main" 
            className="absolute inset-0 w-full h-full object-cover rounded-sm mix-blend-normal group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Lớp Overlay Gradient đen mờ từ dưới lên để nổi chữ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 rounded-sm pointer-events-none"></div>

          {/* Nội dung chữ (Đã bỏ nền trắng, đổi sang chữ trắng) */}
          <div className="relative z-20 flex flex-col items-start gap-3 w-full p-6 lg:p-10 mb-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide">Bộ Sưu Tập Trang Điểm Mùa Xuân</h3>
            <p className="text-sm sm:text-base text-gray-200 max-w-md leading-relaxed">Hương thơm quyến rũ, lưu hương suốt 24h. Tỏa sáng mọi góc nhìn.</p>
            <a href="#" className="font-medium underline text-white hover:text-[#DB4444] transition-colors mt-2">Mua Ngay</a>
          </div>
        </div>

        {/* Khối Phải (Chứa 2 khối nhỏ) */}
        <div className="flex flex-col gap-4 lg:gap-8">
            
            {/* Khối Nhỏ Trên */}
            <div className="relative bg-[#2D2F3A] border border-gray-200 rounded-sm overflow-hidden min-h-[192px] sm:min-h-[240px] lg:min-h-[284px] flex items-end group z-40">
                
                <img 
                    src={topImg || "https://placehold.co/600x300/2D2F3A/dddddd?text=Serum+Phuc+Hoi"} 
                    alt="Serum Top" 
                    className="absolute inset-0 w-full h-full object-cover rounded-sm mix-blend-normal group-hover:scale-105 transition-transform duration-700" 
                />

                {/* Overlay Gradient từ dưới lên */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 rounded-sm pointer-events-none"></div>
                
                {/* Nội dung chữ nổi */}
                <div className="relative z-20 flex flex-col items-start gap-2 p-6 w-full">
                    <h3 className="text-xl lg:text-2xl font-bold text-white tracking-wide">Serum Phục Hồi Da B5</h3>
                    <a href="#" className="font-medium underline text-gray-200 hover:text-[#DB4444] transition-colors text-sm">Khám Phá</a>
                </div>
            </div>

            {/* Khối Nhỏ Dưới */}
            <div className="relative bg-[#2E3C4A] border border-gray-200 rounded-sm overflow-hidden min-h-[192px] sm:min-h-[240px] lg:min-h-[284px] flex items-end group z-40">
                
                <img 
                    src={bottomImg || "https://placehold.co/600x300/2E3C4A/dddddd?text=Son+Kem+Li+Moi"} 
                    alt="Son Kem Bottom" 
                    className="absolute inset-0 w-full h-full object-cover rounded-sm mix-blend-normal group-hover:scale-105 transition-transform duration-700" 
                />

                {/* Overlay Gradient từ dưới lên */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 rounded-sm pointer-events-none"></div>

                {/* Nội dung chữ nổi */}
                <div className="relative z-20 flex flex-col items-start gap-2 p-6 w-full">
                    <h3 className="text-xl lg:text-2xl font-bold text-white tracking-wide">Son Kem Lì Mới Nhất</h3>
                    <a href="#" className="font-medium underline text-gray-200 hover:text-[#DB4444] transition-colors text-sm">Khám Phá</a>
                </div>
            </div>
            
        </div>
      </div>

      {/* 4. Khối 3 Icon Dịch vụ VN */}
      <div className="w-full h-px bg-gray-200 mb-16"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center pb-10">
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 lg:mb-6 group hover:bg-[#DB4444] transition-colors cursor-pointer">
            <Truck size={36} strokeWidth={1.5} className="text-black group-hover:text-white transition-colors" />
          </div>
          <h4 className="font-bold text-base lg:text-lg mb-1 lg:mb-2 text-black uppercase tracking-wide">Miễn Phí Vận Chuyển</h4>
          <p className="text-xs lg:text-sm text-gray-500">Áp dụng cho đơn hàng từ 499k</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 lg:mb-6 group hover:bg-[#DB4444] transition-colors cursor-pointer">
            <Headphones size={36} strokeWidth={1.5} className="text-black group-hover:text-white transition-colors" />
          </div>
          <h4 className="font-bold text-base lg:text-lg mb-1 lg:mb-2 text-black uppercase tracking-wide">Hỗ Trợ Trực Tuyến 24/7</h4>
          <p className="text-xs lg:text-sm text-gray-500">Luôn sẵn sàng giải đáp thắc mắc</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 lg:mb-6 group hover:bg-[#DB4444] transition-colors cursor-pointer">
            <ShieldCheck size={36} strokeWidth={1.5} className="text-black group-hover:text-white transition-colors" />
          </div>
          <h4 className="font-bold text-base lg:text-lg mb-1 lg:mb-2 text-black uppercase tracking-wide">Cam Kết Chính Hãng</h4>
          <p className="text-xs lg:text-sm text-gray-500">Đền bù 200% nếu phát hiện hàng giả</p>
        </div>

      </div>

    </section>
  );
}