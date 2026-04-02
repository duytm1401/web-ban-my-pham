import React, { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation, Navigate } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart2,
  Settings, LogOut, Menu, X, Bell, ChevronDown, Store, Home
} from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Import AuthContext để check quyền

const NAV_ITEMS = [
  { to: "/admin", icon: LayoutDashboard, label: "Trang chủ", exact: true },
  { to: "/admin/products", icon: Package, label: "Sản phẩm" },
  { to: "/admin/orders", icon: ShoppingCart, label: "Đơn hàng" },
  { to: "/admin/customers", icon: Users, label: "Khách hàng" },
  { to: "/admin/reports", icon: BarChart2, label: "Báo cáo" },
  { to: "/admin/settings", icon: Settings, label: "Cài đặt" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth(); // Lấy thông tin user và hàm logout
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ── BẢO VỆ ROUTE: KHÓA TRANG ADMIN ──
  // Nếu chưa đăng nhập HOẶC không có quyền admin -> Đá về trang đăng nhập
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  // Hàm xử lý đăng xuất dành riêng cho Admin
  const handleAdminLogout = () => {
    logout();
    navigate('/login');
  };

  const currentPage = NAV_ITEMS.find((n) =>
    n.exact ? location.pathname === n.to : location.pathname.startsWith(n.to)
  );

  const notifications = [
    { id: 1, text: "Đơn hàng #0042 vừa được đặt", time: "2 phút trước", unread: true },
    { id: 2, text: "Sản phẩm 'Serum Estee' sắp hết hàng", time: "15 phút trước", unread: true },
    { id: 3, text: "Khách hàng mới đăng ký", time: "1 giờ trước", unread: false },
  ];
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="flex min-h-screen bg-gray-50 font-body">

      {/* ── SIDEBAR OVERLAY (mobile) ─────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ──────────────────────────────────────────────── */}
      <aside className={`
        fixed top-0 left-0 h-full z-50 w-64 bg-white border-r border-gray-100 flex flex-col
        transform transition-transform duration-300 ease-in-out shadow-lg
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:shadow-none
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#DB4444] rounded-sm flex items-center justify-center">
              <Store size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-gray-900 text-base">Aurelia Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ to, icon: Icon, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-all ${
                  isActive
                    ? "bg-red-50 text-[#DB4444] border-r-2 border-[#DB4444]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-r-2 border-transparent"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer Sidebar */}
        <div className="p-3 border-t border-gray-100 space-y-1">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <Home size={17} /> Về trang khách hàng
          </button>
          <button
            onClick={handleAdminLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={17} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* ── MAIN ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* TOPBAR */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-900 p-1"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-sm font-semibold text-gray-800">
              {currentPage?.label || "Admin"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Thông báo */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 rounded-sm bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <Bell size={17} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#DB4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-11 w-72 bg-white border border-gray-100 rounded-sm shadow-xl z-50">
                  <div className="px-4 py-3 border-b border-gray-100 font-semibold text-sm text-gray-800">
                    Thông báo
                  </div>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 text-sm border-b border-gray-50 last:border-0 ${n.unread ? "bg-red-50/40" : ""}`}
                    >
                      <p className="text-gray-800 leading-snug">{n.text}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{n.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name || "Admin"}&background=DB4444&color=fff&size=80`}
                alt="Admin"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden sm:block text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {user?.name || "Admin"}
              </span>
              <ChevronDown size={14} className="hidden sm:block text-gray-400" />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}