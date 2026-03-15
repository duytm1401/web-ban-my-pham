import React, { useState, useEffect } from 'react';

import FlashSales1 from '../assets/fsh1.webp';
import FlashSales2 from '../assets/fsh2.jpg';
import FlashSales3 from '../assets/fsh3.jpg';
import FlashSales4 from '../assets/fsh4.jpg';
import FlashSales5 from '../assets/fsh5.jpg';
import FlashSales6 from '../assets/fsh6.jpg';

const FlashSales = () => {
  const productsData = [
    {
      id: 1,
      name: "Son Kem Lì Romand Zero",
      price: "120.000đ",
      oldPrice: "200.000đ",
      discount: "-40%",
      rating: 88,
      image: FlashSales1
    },
    {
      id: 2,
      name: "Kem Chống Nắng La Roche-Posay",
      price: "370.000đ",
      oldPrice: "570.000đ",
      discount: "-35%",
      rating: 75,
      image: FlashSales2
    },
    {
      id: 3,
      name: "Serum Estee Lauder Phục Hồi",
      price: "1.500.000đ",
      oldPrice: "2.100.000đ",
      discount: "-30%",
      rating: 99,
      image: FlashSales3
    },
    {
      id: 4,
      name: "Nước Hoa Dior Miss Dior",
      price: "3.200.000đ",
      oldPrice: "4.000.000đ",
      discount: "-25%",
      rating: 65,
      image: FlashSales4
    },
    {
      id: 5,
      name: "Tẩy Trang Bioderma",
      price: "350.000đ",
      oldPrice: "450.000đ",
      discount: "-20%",
      rating: 120,
      image: FlashSales5
    },
    {
      id: 6,
      name: "Kem Dưỡng Ẩm Clinique",
      price: "850.000đ",
      oldPrice: "1.200.000đ",
      discount: "-15%",
      rating: 50,
      image: FlashSales6
    }
  ];

  // === LOGIC ĐỒNG HỒ ĐẾM NGƯỢC ===
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 23, minutes: 19, seconds: 56 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else { hours = 23; if (days > 0) days--; }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => time < 10 ? `0${time}` : time;

  // === RESPONSIVE: số sản phẩm hiển thị theo màn hình ===
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640) return 1;       // Mobile: 1 sản phẩm
    if (window.innerWidth < 1024) return 2;      // Tablet: 2 sản phẩm
    return 4;                                     // Desktop: 4 sản phẩm
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView);

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // maxIndex phụ thuộc vào itemsPerView
  const maxIndex = productsData.length - itemsPerView;

  const [startIndex, setStartIndex] = useState(0);

  // Reset về 0 khi itemsPerView thay đổi để tránh lỗi vượt biên
  useEffect(() => {
    setStartIndex(0);
  }, [itemsPerView]);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setStartIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(slideTimer);
  }, [maxIndex]);

  const nextSlide = () => setStartIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () => setStartIndex(prev => (prev <= 0 ? maxIndex : prev - 1));

  // Tính % dịch chuyển theo số items đang hiển thị
  const slidePercent = 100 / itemsPerView;

  return (
    <section className="mt-16 sm:mt-24 lg:mt-32 mb-12 sm:mb-20">

      {/* Tiêu đề "Hôm nay" với khối đỏ */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
        <span className="text-[#DB4444] font-bold">Hôm nay</span>
      </div>

      {/* Hàng: Flash Sales + Đồng hồ + Nút mũi tên */}
      {/* Mobile: xếp dọc 2 hàng | Tablet+: hàng ngang như cũ */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10 gap-4 sm:gap-0">

        {/* Nhóm trái: Tiêu đề + Đồng hồ */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider text-black">
            Flash Sales
          </h2>

          {/* Đồng hồ đếm ngược */}
          <div className="flex items-end gap-2 sm:gap-4 font-bold text-black">
            <div className="flex flex-col items-start">
              <span className="text-[10px] sm:text-[12px] font-medium text-black mb-1">Ngày</span>
              <span className="text-2xl sm:text-3xl lg:text-4xl">{formatTime(timeLeft.days)}</span>
            </div>
            <span className="text-[#DB4444] text-xl sm:text-3xl mb-1">:</span>
            <div className="flex flex-col items-start">
              <span className="text-[10px] sm:text-[12px] font-medium text-black mb-1">Giờ</span>
              <span className="text-2xl sm:text-3xl lg:text-4xl">{formatTime(timeLeft.hours)}</span>
            </div>
            <span className="text-[#DB4444] text-xl sm:text-3xl mb-1">:</span>
            <div className="flex flex-col items-start">
              <span className="text-[10px] sm:text-[12px] font-medium text-black mb-1">Phút</span>
              <span className="text-2xl sm:text-3xl lg:text-4xl">{formatTime(timeLeft.minutes)}</span>
            </div>
            <span className="text-[#DB4444] text-xl sm:text-3xl mb-1">:</span>
            <div className="flex flex-col items-start">
              <span className="text-[10px] sm:text-[12px] font-medium text-black mb-1">Giây</span>
              <span className="text-2xl sm:text-3xl lg:text-4xl">{formatTime(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>

        {/* Nút mũi tên: mobile căn trái, desktop căn phải */}
        <div className="flex gap-2 self-start sm:self-auto">
          <button
            onClick={prevSlide}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#DB4444] hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#DB4444] hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* === BĂNG CHUYỀN SẢN PHẨM === */}
      <div className="overflow-hidden -mx-4 py-4">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${startIndex * slidePercent}%)` }}
        >
          {productsData.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 px-3 sm:px-4"
              style={{ width: `${slidePercent}%` }}
            >
              <div className="group cursor-pointer">
                {/* Khung ảnh */}
                <div className="relative bg-white rounded-sm h-[200px] sm:h-[220px] lg:h-[250px] flex items-center justify-center overflow-hidden mb-3 sm:mb-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">

                  {/* Ảnh tràn viền */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Tag giảm giá */}
                  <div className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-2 sm:px-3 py-1 rounded-sm z-10">
                    {item.discount}
                  </div>

                  {/* Nút thả tim & xem trước */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-[#DB4444] hover:text-white transition-colors shadow-md text-black">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-[#DB4444] hover:text-white transition-colors shadow-md text-black">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>

                  {/* Nút Add to Cart — mobile: luôn hiện | desktop: hover */}
                  <button className="absolute bottom-0 left-0 right-0 bg-black text-white text-sm py-3 translate-y-full group-hover:translate-y-0 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300 font-medium z-10">
                    Thêm Vào Giỏ
                  </button>
                </div>

                {/* Thông tin sản phẩm */}
                <h3 className="text-black font-medium mb-2 truncate text-sm sm:text-base">{item.name}</h3>
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <span className="text-[#DB4444] font-medium text-sm sm:text-base">{item.price}</span>
                  <span className="text-gray-400 line-through text-xs sm:text-sm">{item.oldPrice}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex text-[#FFAD33] text-xs sm:text-sm">★★★★★</div>
                  <span className="text-gray-400 text-xs font-semibold">({item.rating})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator (mobile) */}
      <div className="flex justify-center gap-2 mt-4 sm:hidden">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <div
            key={i}
            onClick={() => setStartIndex(i)}
            className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
              startIndex === i
                ? 'w-6 bg-[#DB4444]'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Nút View All */}
      <div className="mt-10 sm:mt-14 flex justify-center">
        <button className="bg-[#DB4444] text-white px-8 sm:px-12 py-3 sm:py-4 rounded-sm hover:bg-red-600 transition-colors font-medium text-sm sm:text-base">
          Xem Tất Cả Sản Phẩm
        </button>
      </div>

    </section>
  );
};

export default FlashSales;