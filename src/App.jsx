import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FlashSales from './components/FlashSales';

import hinh1 from './assets/anh-1.jpg';
import hinh2 from './assets/anh-2.jpg';
import hinh3 from './assets/anh-3.jpg';
import hinh4 from './assets/anh-4.jpg';
import hinh5 from './assets/anh-5.jpg';

function App() {
  const bannerData = [
    {
      id: 0,
      tag: "NEW COLLECTION",
      title: "24 Hours Moist",
      discount: "Skincare Chuyên Sâu",
      image: hinh1,
      bgColor: "bg-[#122A25]"
    },
    {
      id: 1,
      tag: "NEW FASHION WEEK",
      title: "Premium Makeup",
      discount: "Thương Hiệu Mới",
      image: hinh2,
      bgColor: "bg-[#261814]"
    },
    {
      id: 2,
      tag: "NEW BRANDS OFFER",
      title: "Flowers Skincare",
      discount: "Thành phần tự nhiên",
      image: hinh3,
      bgColor: "bg-[#2D2F3A]"
    },
    {
      id: 3,
      tag: "NEW COLLECTION",
      title: "Nước Hoa Cao Cấp",
      discount: "Hương thơm quyến rũ",
      image: hinh4,
      bgColor: "bg-[#2E3C4A]"
    },
    {
      id: 4,
      tag: "PERFUME",
      title: "Shalimar",
      discount: "Souffle de Parfum",
      image: hinh5,
      bgColor: "bg-[#003B73]"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Trạng thái sidebar cho mobile/tablet
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Trạng thái accordion cho từng mục (mobile/tablet)
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [bannerData.length]);

  // Đóng sidebar khi click ra ngoài (mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarOpen && !e.target.closest('#sidebar') && !e.target.closest('#sidebar-toggle')) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  // ===== DATA CÁC MỤC DANH MỤC =====
  const menuItems = [
    {
      label: "Chăm sóc da mặt",
      columns: [
        {
          title: "Làm sạch da",
          links: ["Tẩy trang (Micellar Water)", "Dầu tẩy trang (Cleansing Oil)", "Sáp tẩy trang (Cleansing Balm)", "Sữa rửa mặt (Foam Cleanser)", "Gel rửa mặt", "Tẩy tế bào chết vật lý", "Tẩy tế bào chết hóa học"]
        },
        {
          title: "Dưỡng da chuyên sâu",
          links: ["Serum", "Toner / Nước hoa hồng", "Essence / Lotion", "Serum Vitamin C", "Serum Hyaluronic Acid", "Serum Niacinamide", "Serum Retinol"]
        },
        {
          title: "Dưỡng ẩm",
          links: ["Kem dưỡng ẩm", "Gel dưỡng ẩm", "Kem dưỡng ban ngày", "Kem dưỡng ban đêm", "Dầu dưỡng da (Facial Oil)"]
        },
        {
          title: "Phục hồi & Bảo vệ",
          links: ["Kem chống nắng", "Kem B5 phục hồi", "Xịt khoáng", "Mặt nạ ngủ"]
        },
        {
          title: "Đặc trị",
          links: ["Kem trị mụn", "Kem trị nám / tàn nhang", "Miếng dán mụn"]
        },
        {
          title: "Chăm sóc mắt & môi",
          links: ["Kem mắt (Eye cream)", "Mặt nạ mắt", "Son dưỡng môi", "Mặt nạ môi"]
        },
        {
          title: "Mặt nạ",
          links: ["Mặt nạ giấy", "Mặt nạ đất sét", "Mặt nạ ngủ", "Mặt nạ dưỡng da"]
        }
      ]
    },
    {
      label: "Trang điểm (Makeup)",
      columns: [
        {
          title: "Trang điểm mặt",
          links: ["Kem nền (Foundation)", "Cushion", "BB Cream / CC Cream", "Kem che khuyết điểm", "Phấn phủ", "Phấn má hồng", "Highlight", "Contour"]
        },
        {
          title: "Trang điểm mắt",
          links: ["Mascara", "Kẻ mắt (Eyeliner)", "Phấn mắt (Eyeshadow)", "Kẻ chân mày", "Gel chân mày"]
        },
        {
          title: "Trang điểm môi",
          links: ["Son thỏi", "Son kem", "Son tint", "Son bóng"]
        }
      ]
    },
    {
      label: "Chăm sóc cơ thể (Body)",
      columns: [
        {
          title: "Sản phẩm Body",
          links: ["Sữa tắm", "Dưỡng thể", "Tẩy tế bào chết Body"]
        }
      ]
    },
    {
      label: "Chăm sóc tóc",
      columns: [
        {
          title: "Sản phẩm Tóc",
          links: ["Dầu gội / Dầu xả", "Tinh dưỡng tóc"]
        }
      ]
    },
    {
      label: "Mỹ phẩm cho nam",
      columns: [
        {
          title: "Dành cho nam",
          links: ["Sữa rửa mặt nam", "Kem cạo râu"]
        }
      ]
    },
    {
      label: "Dụng cụ làm đẹp",
      columns: [
        {
          title: "Phụ kiện",
          links: ["Cọ trang điểm", "Mút tán nền", "Bông tẩy trang"]
        }
      ]
    }
  ];

  const simpleMenuItems = ["Nước hoa", "Set quà tặng"];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-6 sm:pt-10 mb-12 sm:mb-24">

          {/* ===== NÚT MỞ SIDEBAR (chỉ hiện trên mobile/tablet) ===== */}
          <button
            id="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2 bg-[#DB4444] text-white rounded-sm text-sm font-medium hover:bg-[#c03838] transition-colors"
          >
            <span className="text-lg">☰</span>
            Danh mục sản phẩm
          </button>

          <div className="flex relative">

            {/* ===== OVERLAY KHI SIDEBAR MỞ (mobile/tablet) ===== */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* ================= 1. SIDEBAR ================= */}
            <div
              id="sidebar"
              className={`
                /* Mobile/Tablet: drawer từ trái */
                fixed top-0 left-0 h-full w-72 bg-white z-50 overflow-y-auto
                transform transition-transform duration-300 ease-in-out shadow-2xl
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}

                /* Desktop: hiển thị tĩnh như cũ */
                lg:static lg:translate-x-0 lg:shadow-none lg:overflow-visible
                lg:w-64 lg:border-r lg:border-gray-200 lg:pr-6 lg:flex lg:flex-col lg:pt-2 lg:z-auto
              `}
            >
              {/* Header sidebar (mobile/tablet) */}
              <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-bold text-base text-black">Danh mục sản phẩm</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-500 hover:text-[#DB4444] text-2xl leading-none"
                >
                  ✕
                </button>
              </div>

              {/* Tiêu đề desktop */}
              <h3 className="hidden lg:block font-bold text-lg mb-6 text-black border-b-2 border-[#DB4444] inline-block pb-1 w-max">
                Danh mục sản phẩm
              </h3>

              <div className="flex flex-col text-sm font-medium text-gray-700 p-4 lg:p-0 lg:space-y-4">

                {/* ===== CÁC MỤC CÓ MEGA MENU ===== */}
                {menuItems.map((item, index) => (
                  <div key={index} className="group">

                    {/* Desktop: hover trigger */}
                    <a
                      href="#"
                      className="hidden lg:flex justify-between items-center hover:text-[#DB4444] transition-colors py-1 cursor-pointer"
                    >
                      {item.label} <span className="text-lg">›</span>
                    </a>

                    {/* Mobile/Tablet: accordion trigger */}
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="lg:hidden w-full flex justify-between items-center text-left py-3 border-b border-gray-100 hover:text-[#DB4444] transition-colors"
                    >
                      <span>{item.label}</span>
                      <span className={`text-lg transition-transform duration-200 ${openAccordion === index ? 'rotate-90' : ''}`}>
                        ›
                      </span>
                    </button>

                    {/* Accordion content (mobile/tablet) */}
                    <div className={`lg:hidden overflow-hidden transition-all duration-300 ${openAccordion === index ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="pl-3 pb-2 pt-1 space-y-4">
                        {item.columns.map((col, colIndex) => (
                          <div key={colIndex}>
                            <h4 className="font-semibold text-black text-xs uppercase tracking-wide mb-2 mt-3">
                              {col.title}
                            </h4>
                            <ul className="space-y-2">
                              {col.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                  <a href="#" className="text-gray-500 hover:text-[#DB4444] transition-colors text-sm">
                                    {link}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mega Menu Desktop (giữ nguyên 100%) */}
                    <div className="hidden lg:block absolute top-0 bottom-0 left-[296px] right-0 bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-sm z-50 before:absolute before:content-[''] before:-left-24 before:top-0 before:w-24 before:h-full invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                      <div className="w-full h-full p-8 overflow-y-auto grid grid-cols-4 gap-8 content-start">
                        {item.columns.map((col, colIndex) => (
                          <div key={colIndex}>
                            <h4 className="font-bold text-black mb-4 border-b border-gray-200 pb-2">
                              {col.title}
                            </h4>
                            <ul className="space-y-3">
                              {col.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                  <a href="#" className="hover:text-[#DB4444] text-gray-500 transition-colors">
                                    {link}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* ===== CÁC MỤC ĐƠN GIẢN (Nước hoa, Set quà tặng) ===== */}
                {simpleMenuItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="hover:text-[#DB4444] transition-colors py-3 lg:py-1 border-b border-gray-100 lg:border-0 lg:mt-2 block"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* ================= 2. BANNER ================= */}
            <div className="flex-1 lg:ml-10 relative h-[260px] sm:h-[350px] lg:h-[450px] rounded-sm overflow-hidden z-30">

              {bannerData.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`absolute inset-0 w-full h-full flex items-center justify-between
                    px-6 sm:px-10 lg:px-16
                    transition-all duration-1000 ease-in-out
                    ${currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}
                    ${banner.bgColor} text-white`}
                >
                  {/* Text */}
                  <div className="w-1/2 sm:w-1/2">
                    <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-5">
                      <div className="text-xl sm:text-3xl">✨</div>
                      <span className="text-[10px] sm:text-sm font-light tracking-widest">{banner.tag}</span>
                    </div>
                    <h2 className="text-xl sm:text-3xl lg:text-5xl font-semibold leading-tight mb-3 sm:mb-6">
                      {banner.title}<br />{banner.discount}
                    </h2>
                    <a href="#" className="flex items-center gap-2 text-xs sm:text-md font-medium border-b border-white pb-1 w-max hover:text-gray-300 transition-colors">
                      Mua Ngay <span>→</span>
                    </a>
                  </div>

                  {/* Ảnh */}
                  <div className="w-28 h-28 sm:w-48 sm:h-48 lg:w-72 lg:h-72 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover rounded-full mix-blend-normal"
                    />
                  </div>
                </div>
              ))}

              {/* Dots điều hướng */}
              <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
                {bannerData.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 sm:h-3 rounded-full cursor-pointer transition-all duration-300 ${
                      currentSlide === index
                        ? "w-6 sm:w-8 bg-[#DB4444] border-2 border-white shadow-lg"
                        : "w-2 sm:w-3 bg-gray-400 hover:bg-white"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Flash Sales */}
        <FlashSales />
      </main>
    </div>
  );
}

export default App;