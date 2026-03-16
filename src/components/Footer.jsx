import React from 'react';
import { Send, MapPin, Phone, Mail, Facebook, Instagram, Youtube, QrCode, CreditCard } from 'lucide-react';

import qrCodeImg from '../assets/Footer/qr-code.png';
import bctImg from '../assets/Footer/bo-cong-thuong.png';

export default function Footer() {
  
  // Hiệu ứng hover cho link: Chuyển màu sang Đỏ (#DB4444) mượt mà
  const linkHoverClass = "text-gray-300 hover:text-[#DB4444] transition-colors duration-300 cursor-pointer";

  // Hiệu ứng hover cho icon mạng xã hội: Scale nhẹ và đổi màu
  const socialIconHoverClass = "text-gray-300 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer";

  return (
    <footer className="bg-[#0A0D11] text-white pt-16 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Khối chính chia 5 cột (Phù hợp với ảnh mẫu) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Cột 1: Logo, Slogan, Đăng ký nhận tin */}
          <div className="flex flex-col items-start gap-5">
            <h2 className="text-2xl font-bold tracking-wider mb-2">Aurelia Store</h2>
            <p className="text-sm font-medium mb-1 text-white">Đăng ký nhận tin</p>
            <p className="text-xs mb-3 text-gray-400">Nhận ngay ưu đãi 10% cho đơn hàng đầu tiên của bạn.</p>
            
            {/* Ô nhập Email với hiệu ứng hover ở nút Send */}
            <div className="relative w-full max-w-[250px] mt-1 group">
              <input 
                type="email" 
                placeholder="Nhập email của bạn" 
                className="w-full bg-transparent border-b-2 border-white/30 rounded-none py-2 pl-0 pr-10 text-sm text-white focus:outline-none focus:border-white transition-colors"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-white group-hover:text-[#DB4444] group-hover:scale-110 transition-all">
                <Send size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Cột 2: Hỗ trợ khách hàng (Việt hóa) */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold mb-6 text-white">Hỗ Trợ</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <MapPin size={22} className="flex-shrink-0 mt-0.5 text-[#DB4444]" />
                <span className="text-gray-300">Văn phòng: Phường 1, Gò Vấp, Hồ Chí Minh.</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0 text-[#DB4444]" />
                <span className={linkHoverClass}>support@aureliastore.vn</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-[#DB4444]" />
                <span className={linkHoverClass}>0936-1836-18</span>
              </li>
            </ul>
          </div>

          {/* Cột 3: Tài khoản & Đơn hàng (Việt hóa) */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold mb-6 text-white">Tài Khoản</h3>
            <ul className="space-y-4 text-sm">
              <li className={linkHoverClass}>Tài khoản của tôi</li>
              <li className={linkHoverClass}>Đăng nhập / Đăng ký</li>
              <li className={linkHoverClass}>Giỏ hàng</li>
              <li className={linkHoverClass}>Danh sách yêu thích</li>
              <li className={linkHoverClass}>Theo dõi đơn hàng</li>
            </ul>
          </div>

          {/* Cột 4: Liên kết nhanh & Chính sách (Việt hóa) */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold mb-6 text-white">Liên Kết Nhanh</h3>
            <ul className="space-y-4 text-sm">
              <li className={linkHoverClass}>Chính sách bảo mật</li>
              <li className={linkHoverClass}>Điều khoản sử dụng</li>
              <li className={linkHoverClass}>Câu hỏi thường gặp (FAQ)</li>
              <li className={linkHoverClass}>Chính sách đổi trả</li>
              <li className={linkHoverClass}>Tuyển dụng</li>
            </ul>
          </div>

          {/* Cột 5: Kết nối & Thanh toán */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold mb-6 text-white">Kết Nối Với Chúng Tôi</h3>
            
            {/* Thêm nút Zalo */}
            <button className="flex items-center gap-2.5 bg-sky-600 text-white text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-sky-700 transition-colors shadow-md mb-6 w-full">
              <QrCode size={18} /> Chat qua Zalo OA
            </button>
            
            {/* Mã QR giả lập  */}
            <div className="w-28 h-28 border border-white/20 p-2 rounded-sm bg-white mb-6">
              <img src={qrCodeImg || "https://placehold.co/100x100/eeeeee/999999?text=Mã+QR"} alt="QR Zalo OA" className="w-full h-full object-contain" />
            </div>

            {/* Icon Bộ Công Thương */}
            <div className="w-32 hover:scale-105 transition-transform cursor-pointer">
              <img src={bctImg || "https://placehold.co/120x45/eeeeee/333333?text=Bộ+Công+Thương"} alt="Đã Thông Báo Bộ Công Thương" className="w-full h-auto object-contain" />
            </div>
          </div>

        </div>

        {/*Copyright & Mạng xã hội */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <p className="text-sm text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} Aurelia Store. Tất Cả Thành Viên Nhóm 8.
          </p>
          
          {/* Lưới các phương thức thanh toán phổ biến ở VN  */}
          <div className="flex items-center gap-4 text-gray-500">
            <CreditCard size={20} className="hover:text-white cursor-pointer" />
            <span className="text-xs font-semibold hover:text-white cursor-pointer">MOMO</span>
            <span className="text-xs font-semibold hover:text-white cursor-pointer">VNPAY</span>
            <span className="text-xs font-semibold hover:text-white cursor-pointer">ZALOPAY</span>
          </div>
          
          {/* Mạng xã hội Việt Hóa: Thêm TikTok, Youtube, bỏ bớt Twitter/LinkedIn */}
          <div className="flex items-center gap-6">
            <a href="#" className={socialIconHoverClass}><Facebook size={20} /></a>
            <a href="#" className={socialIconHoverClass}><Instagram size={20} /></a>
            <a href="#" className={socialIconHoverClass}>
                {/* Icon TikTok đơn giản */}
                <span className="font-bold text-lg hover:text-white transition-colors cursor-pointer">T</span>
            </a>
            <a href="#" className={socialIconHoverClass}><Youtube size={22} /></a>
          </div>

        </div>

      </div>
    </footer>
  );
}