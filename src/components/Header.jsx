  import React, { useState, useEffect, useRef } from "react";
  import { Menu, Search, Heart, ShoppingCart, User, X, Sparkles, Package, Settings, LogOut } from "lucide-react";
  import { Link, useLocation } from 'react-router-dom';

  import { useAuth } from '../context/AuthContext';

  const NAV_LINKS = ["Trang chủ", "Sản phẩm", "Tin tức", "Liên hệ"];

  export default function Header() {
    const [menuOpen, setMenuOpen]     = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled]     = useState(false);
    const [cartCount]                 = useState(3);   
    const [wishCount]                 = useState(5);   
    const searchRef                   = useRef(null);

    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    const { isLoggedIn, logout } = useAuth();
    const location = useLocation();

    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 8);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
      if (searchOpen) searchRef.current?.focus();
    }, [searchOpen]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
          setUserMenuOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getHomeLink = () => {
      return isLoggedIn ? "/" : "/"; 
    };

    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');
          .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
          .font-body    { font-family: 'DM Sans', sans-serif; }
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track { animation: marquee 28s linear infinite; }
          .marquee-track:hover { animation-play-state: paused; }
          
          /* CSS Gạch chân */
          .nav-link::after {
            content: ''; display: block; height: 1.5px; background: #DB4444;
            transform: scaleX(0); transform-origin: left; transition: transform 0.25s ease;
          }
          .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
          .nav-link.active { color: #DB4444; }
          
          .search-input:focus-within {
            box-shadow: 0 0 0 2px #DB444430; border-color: #DB4444 !important;
          }
          .icon-btn { position: relative; overflow: visible; }
          .icon-btn .ripple-bg {
            position: absolute; inset: 4px; background: #DB444415; border-radius: 50%;
            transform: scale(0); transition: transform 0.2s ease; z-index: 0; pointer-events: none;
          }
          .icon-btn:hover .ripple-bg { transform: scale(1); }
          .icon-btn > svg { position: relative; z-index: 1; }
          .sidebar-link { position: relative; transition: color 0.2s, padding-left 0.2s; }
          .sidebar-link:hover { color: #DB4444; padding-left: 4px; }
        `}</style>

{/* ĐÃ THÊM w-full max-w-[100vw] VÀO ĐÂY */}
        <header
          className={`font-body sticky top-0 z-[100] transition-all duration-300 w-full max-w-[100vw]
            ${scrolled ? "bg-white/80 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]" : "bg-white border-b border-gray-100"}
          `}
        >
          {/* ĐÃ THÊM w-full max-w-[100vw] VÀO ĐÂY */}
          <div className="bg-[#1a1a1a] text-white text-[11px] py-2.5 overflow-hidden relative w-full max-w-[100vw]">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
            <div className="flex whitespace-nowrap marquee-track">
              {[0, 1].map(i => (
                <div key={i} className="flex items-center gap-10 pr-10">
                  <span className="flex items-center gap-2">
                    <Sparkles size={11} className="text-[#DB4444]" /> Summer Sale — Miễn phí vận chuyển toàn quốc
                    <Link to="/danh-muc" className="underline font-semibold hover:text-[#DB4444] transition-colors ml-1">Mua ngay →</Link>
                  </span>
                  <span className="text-white/40">✦</span><span>Ưu đãi đến 50% cho sản phẩm chăm sóc da</span>
                  <span className="text-white/40">✦</span><span>Đổi trả miễn phí trong 30 ngày</span><span className="text-white/40">✦</span>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[72px] gap-4">

              {/* LEFT - LOGO */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <button aria-label="Mở menu" className="lg:hidden icon-btn p-2 rounded-full text-gray-700 hover:text-[#DB4444] transition-colors" onClick={() => setMenuOpen(true)}>
                  <Menu size={24} />
                </button>
                
                <Link to={getHomeLink()} className="flex items-center gap-2 group">
                  <div className="w-7 h-7 rounded-full bg-[#DB4444] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xs leading-none select-none">✿</span>
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="font-display text-[22px] font-semibold tracking-wide text-gray-900 group-hover:text-[#DB4444] transition-colors duration-300">Aurelia</span>
                    <span className="font-body text-[9px] uppercase tracking-[0.25em] text-gray-400 font-medium -mt-0.5">Beauty Store</span>
                  </div>
                </Link>
              </div>

              {/* CENTER - MENU DESKTOP */}
              <nav className="hidden lg:flex items-center gap-8 font-body">
                {NAV_LINKS.map((label) => {
                  const linkTarget = label === "Trang chủ" ? getHomeLink() : 
                                     label === "Sản phẩm" ? "/danh-muc" : 
                                     label === "Tin tức" ? "/tin-tuc" :
                                     label === "Liên hệ" ? "/lien-he" :
                                     `/${label.toLowerCase().replace(/ /g, '-')}`;
                  
                  const isActive = location.pathname === linkTarget;

                  return (
                    <Link 
                      key={label} 
                      to={linkTarget} 
                      className={`nav-link text-[15px] font-medium text-gray-700 tracking-wide cursor-pointer pb-0.5 ${isActive ? "active" : ""}`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </nav>

              {/* RIGHT - TÌM KIẾM, GIỎ HÀNG, TÀI KHOẢN */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="search-input hidden md:flex items-center border border-gray-200 rounded-full px-4 py-2 w-52 lg:w-64 gap-2 transition-all duration-300 bg-gray-50">
                  <Search size={15} className="text-gray-400 flex-shrink-0" />
                  <input className="bg-transparent outline-none flex-1 text-sm text-gray-700 placeholder:text-gray-400 font-body" placeholder="Tìm sản phẩm..." aria-label="Tìm kiếm sản phẩm" />
                </div>

                <button aria-label="Tìm kiếm" className="md:hidden icon-btn p-2 rounded-full text-gray-700 hover:text-[#DB4444] transition-colors" onClick={() => setSearchOpen(true)}>
                  <Search size={22} />
                </button>

                <div className="relative hidden sm:flex">
                  <Link to="/wishlist" aria-label={`Yêu thích (${wishCount})`} className="icon-btn p-2 rounded-full text-gray-700 hover:text-[#DB4444] transition-colors block">
                    <span className="ripple-bg" /><Heart size={22} />
                  </Link>
                  {wishCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#DB4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none ring-2 ring-white pointer-events-none z-10">
                      {wishCount}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <Link to="/gio-hang" aria-label={`Giỏ hàng (${cartCount})`} className="icon-btn p-2 rounded-full text-gray-700 hover:text-[#DB4444] transition-colors block">
                    <span className="ripple-bg" /><ShoppingCart size={22} />
                  </Link>
                  
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#DB4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none ring-2 ring-white pointer-events-none z-10">
                      {cartCount}
                    </span>
                  )}
              </div>

                {/* KHU VỰC TÀI KHOẢN */}
                {isLoggedIn ? (
                  <div className="relative" ref={userMenuRef}>
                    <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 lg:pl-3 lg:ml-1 lg:border-l lg:border-gray-200 text-sm font-medium text-gray-700 hover:text-[#DB4444] transition-colors cursor-pointer">
                      
                      {/* Giao diện Mobile: Chỉ hiện Avatar */}
                      <div className="lg:hidden w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                        <img src="https://ui-avatars.com/api/?name=Duy&background=DB4444&color=fff" alt="User" className="w-full h-full object-cover" />
                      </div>

                      {/* Giao diện Desktop: Avatar + Chữ "Tài khoản" */}
                      <div className="hidden lg:flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                          <img src="https://ui-avatars.com/api/?name=Duy&background=DB4444&color=fff" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <span>Tài khoản</span>
                      </div>

                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-5 w-[220px] bg-white border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-none z-[200] flex flex-col py-2">
                        <div className="absolute -top-[6px] right-6 w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45"></div>

                        <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#DB4444] transition-colors relative z-10">
                          <User size={16} strokeWidth={1.5} /> Tài khoản của tôi
                        </Link>
                        <Link to="/gio-hang" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#DB4444] transition-colors relative z-10">
                          <Package size={16} strokeWidth={1.5} /> Đơn mua của tôi
                        </Link>
                        <Link to="/wishlist" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#DB4444] transition-colors relative z-10">
                          <Heart size={16} strokeWidth={1.5} /> Sản phẩm yêu thích
                        </Link>
                        <div className="my-1 border-t border-gray-100 relative z-10"></div>
                        
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-[#DB4444] transition-colors text-left relative z-10"
                        >
                          <LogOut size={16} strokeWidth={1.5} /> Đăng xuất
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-2 lg:pl-3 lg:ml-1 lg:border-l lg:border-gray-200 text-sm font-medium text-gray-700 hover:text-[#DB4444] transition-colors cursor-pointer"
                  >
                    {/* Giao diện Mobile: Chỉ hiện cái Icon User */}
                    <div className="lg:hidden icon-btn p-2 rounded-full text-gray-700 hover:text-[#DB4444] transition-colors">
                      <span className="ripple-bg" />
                      <User size={22} />
                    </div>

                    {/* Giao diện Desktop: Hiện hình tròn xám + chữ "Đăng nhập" */}
                    <div className="hidden lg:flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#DB444415] transition-colors">
                        <User size={16} />
                      </div>
                      <span>Đăng nhập</span>
                    </div>
                  </Link>
                )}

              </div>
            </div>
          </div>

          <div className={`fixed inset-0 bg-white z-[200] flex flex-col transition-all duration-300 ${searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
              <Search size={20} className="text-[#DB4444] flex-shrink-0" />
              <input ref={searchRef} className="flex-1 outline-none text-base font-body text-gray-800 placeholder:text-gray-400" placeholder="Bạn đang tìm gì..." />
              <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-gray-700 p-1"><X size={22} /></button>
            </div>
          </div>
        </header>

        {menuOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] lg:hidden" onClick={() => setMenuOpen(false)} />}

        <div className={`fixed top-0 left-0 h-full w-[300px] bg-white z-[160] flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-between items-center px-6 py-5 bg-gradient-to-br from-[#DB4444] to-[#b83535]">
            <Link to={getHomeLink()} onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
              <span className="text-white text-lg">✿</span>
              <span className="font-display text-xl font-semibold text-white tracking-wide">Aurelia</span>
            </Link>
            <button onClick={() => setMenuOpen(false)} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"><X size={18} /></button>
          </div>

          <nav className="flex flex-col px-6 pt-6 pb-4 font-body gap-1">
            {NAV_LINKS.map((label) => {
              const linkTarget = label === "Trang chủ" ? getHomeLink() : 
                                label === "Sản phẩm" ? "/danh-muc" : 
                                label === "Tin tức" ? "/tin-tuc" :
                                label === "Liên hệ" ? "/lien-he" :
                                `/${label.toLowerCase().replace(/ /g, '-')}`;
              
              const isActive = location.pathname === linkTarget;

              return (
                <Link 
                  key={label} 
                  to={linkTarget} 
                  onClick={() => setMenuOpen(false)}
                  className={`sidebar-link flex justify-between items-center py-3.5 border-b border-gray-50 text-[15px] font-medium ${isActive ? "text-[#DB4444]" : "text-gray-700"}`}
                >
                  {label} <span className="text-gray-300 text-lg">›</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto px-6 py-6 border-t border-gray-100 flex flex-col gap-3 font-body">
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-[#DB4444] transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Duy&background=DB4444&color=fff" alt="User" className="w-full h-full object-cover" />
                  </div>
                  Tài khoản của tôi
                </Link>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-[#DB4444] transition-colors cursor-pointer text-left">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                    <LogOut size={16} className="text-[#DB4444]" />
                  </div>
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-[#DB4444] transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <User size={16} className="text-gray-500" />
                </div>
                Đăng nhập / Đăng ký
              </Link>
            )}
          </div>
        </div>
      </>
    );
  }