import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import BannerSlider from '../../components/BannerSlider';
import FlashSales from '../../components/FlashSales';
import BrowseCategories from '../../components/BrowseCategories';
import BestSellers from '../../components/BestSellers';
import PromoBanner from '../../components/PromoBanner';
import ExploreProducts from '../../components/ExploreProducts';
import FeaturedArrivals from '../../components/FeaturedArrivals';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  // Xử lý click ra ngoài để đóng sidebar trên mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarOpen &&
        !e.target.closest('#sidebar') &&
        !e.target.closest('#sidebar-toggle')
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  // Khóa scroll body khi sidebar mở => tránh layout bị rung
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const toggleAccordion = (index) =>
    setOpenAccordion(openAccordion === index ? null : index);

  const menuItems = [
    {
      label: "Chăm sóc da mặt",
      columns: [
        {
          title: "Làm sạch da",
          links: [
            "Tẩy trang (Micellar Water)", "Dầu tẩy trang (Cleansing Oil)",
            "Sáp tẩy trang (Cleansing Balm)", "Sữa rửa mặt (Foam Cleanser)",
            "Gel rửa mặt", "Tẩy tế bào chết vật lý", "Tẩy tế bào chết hóa học"
          ]
        },
        {
          title: "Dưỡng da chuyên sâu",
          links: [
            "Serum", "Toner / Nước hoa hồng", "Essence / Lotion",
            "Serum Vitamin C", "Serum Hyaluronic Acid",
            "Serum Niacinamide", "Serum Retinol"
          ]
        },
        {
          title: "Dưỡng ẩm",
          links: [
            "Kem dưỡng ẩm", "Gel dưỡng ẩm",
            "Kem dưỡng ban ngày", "Kem dưỡng ban đêm",
            "Dầu dưỡng da (Facial Oil)"
          ]
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
          links: [
            "Kem nền (Foundation)", "Cushion", "BB Cream / CC Cream",
            "Kem che khuyết điểm", "Phấn phủ", "Phấn má hồng",
            "Highlight", "Contour"
          ]
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pt-6 sm:pt-10 mb-12 sm:mb-24">

        {/* Nút mở sidebar (mobile/tablet) */}
        <button
          id="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2 bg-[#DB4444] text-white
                     rounded-sm text-sm font-medium hover:bg-[#c03838] transition-colors"
        >
          <span className="text-lg">☰</span>
          Danh mục sản phẩm
        </button>

        <div className="flex relative isolate items-start">

          {/* Overlay (mobile) — touch-none chặn scroll cảm ứng iOS */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden touch-none"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* ═══════════════ SIDEBAR ═══════════════ */}
          <div
            id="sidebar"
            className={`
              fixed top-0 left-0 h-full w-72 bg-white z-50 overflow-y-auto shadow-2xl
              transform transition-transform duration-300 ease-in-out
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              lg:static lg:transform-none lg:shadow-none lg:overflow-visible
              lg:w-64 lg:border-r lg:border-gray-200 lg:pr-6 lg:flex lg:flex-col lg:pt-2 lg:z-40
            `}
          >
            {/* Header mobile */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-bold text-base text-black">Danh mục sản phẩm</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-500 hover:text-[#DB4444] text-2xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Title desktop */}
            <h3 className="hidden lg:block font-bold text-lg mb-6 text-black
                        pb-2 border-b-2 border-[#DB4444] mx-3">
              Danh mục sản phẩm
            </h3>

            <div className="flex flex-col text-sm font-medium text-gray-700 p-4 lg:px-6 lg:p-0 lg:space-y-4">

              {/* MENU */}
              {menuItems.map((item, index) => (
                <div key={index} className="group">

                  {/* Desktop */}
                  <a
                    href="#"
                    className="hidden lg:flex justify-between items-center
                              hover:text-[#DB4444] transition-colors py-1 cursor-pointer"
                  >
                    {item.label}
                    <span className="text-lg">›</span>
                  </a>

                  {/* Mobile */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="lg:hidden w-full flex justify-between items-center text-left
                              py-3 border-b border-gray-100 hover:text-[#DB4444] transition-colors"
                  >
                    <span>{item.label}</span>
                    <span className={`text-lg transition-transform duration-200
                      ${openAccordion === index ? 'rotate-90' : ''}`}>
                      ›
                    </span>
                  </button>

                  {/* Accordion */}
                  <div className={`lg:hidden overflow-hidden transition-all duration-300
                    ${openAccordion === index ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-3 pb-2 pt-1 space-y-4">
                      {item.columns.map((col, ci) => (
                        <div key={ci}>
                          <h4 className="font-semibold text-black text-xs uppercase tracking-wide mb-2 mt-3">
                            {col.title}
                          </h4>
                          <ul className="space-y-2">
                            {col.links.map((link, li) => (
                              <li key={li}>
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

                  {/* MEGA MENU DESKTOP */}
                  <div className="hidden lg:block absolute top-0 bottom-0 left-[296px] right-0
                                  bg-white border border-gray-100
                                  shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-sm z-50
                                  before:absolute before:content-[''] before:-left-24 before:top-0
                                  before:w-24 before:h-full
                                  invisible opacity-0 translate-y-2
                                  group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                                  transition-all duration-300 ease-out">
                    
                    <div className={`w-full h-full p-8 overflow-y-auto grid gap-8 content-start
                                    ${item.columns.length >= 4 ? 'grid-cols-4' : 
                                      item.columns.length === 3 ? 'grid-cols-3' : 
                                      item.columns.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {item.columns.map((col, ci) => (
                        <div key={ci}>
                          <h4 className="font-bold text-black mb-4 border-b border-gray-200 pb-2">
                            {col.title}
                          </h4>
                          <ul className="space-y-3">
                            {col.links.map((link, li) => (
                              <li key={li}>
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

              {/* SIMPLE ITEMS */}
              {simpleMenuItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="hover:text-[#DB4444] transition-colors
                            py-3 lg:py-1 border-b border-gray-100 lg:border-0 lg:mt-2 block"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          {/* ═══════════════ BANNER SLIDER ═══════════ */}
          <BannerSlider />
        </div>
      </div>

      {/* Các khối tính năng */}
      <FlashSales />
      <BrowseCategories />
      <BestSellers /> 
      <PromoBanner />
      <ExploreProducts />
      <FeaturedArrivals />
    </div>
  );
}