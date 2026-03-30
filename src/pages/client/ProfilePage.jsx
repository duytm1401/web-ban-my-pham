import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Package, Heart, LogOut, Camera, Plus, MapPin, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// FIX 2: Helper xác định active route
const NavItem = ({ to, icon: Icon, children }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${
        active
          ? "text-[#DB4444] bg-red-50 border-r-2 border-[#DB4444]"
          : "text-gray-600 hover:text-[#DB4444] border-r-2 border-transparent"
      }`}
    >
      <Icon size={18} /> {children}
    </Link>
  );
};

export default function ProfilePage() {
  const { logout } = useAuth();

  const [profile, setProfile] = useState({
    name: "Duy",
    email: "duy@example.com",
    phone: "0901234567",
    gender: "male",
    dob: "2002-10-15",
  });

  const [addresses, setAddresses] = useState([
    { id: 1, name: "Duy (Nhà riêng)", phone: "0901234567", address: "123 Nguyễn Huệ, Quận 1, TP. HCM", isDefault: true },
    { id: 2, name: "Duy (Công ty)", phone: "0901234567", address: "Tòa nhà Bitexco, Quận 1, TP. HCM", isDefault: false },
  ]);

  // FIX 5: Thay alert/confirm bằng inline state
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const confirmDelete = (id) => setDeleteConfirmId(id);
  const cancelDelete = () => setDeleteConfirmId(null);
  const executeDelete = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    setDeleteConfirmId(null);
  };

  const setDefault = (id) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen pb-20 font-body">

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#DB4444] transition-colors">Trang chủ</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">Tài khoản của tôi</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── SIDEBAR ──────────────────────────────────────────────────── */}
          <div className="w-full lg:w-[240px] flex-shrink-0">
            {/* Avatar card */}
            <div className="bg-white p-5 rounded-sm shadow-sm border border-gray-100 mb-3 flex items-center gap-4">
              <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=DB4444&color=fff`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400">Xin chào,</p>
                <p className="font-semibold text-gray-900 text-sm truncate">{profile.name}</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="bg-white rounded-sm shadow-sm border border-gray-100 py-2 overflow-hidden">
              <NavItem to="/profile" icon={User}>Tài khoản của tôi</NavItem>
              <NavItem to="/gio-hang" icon={Package}>Đơn mua của tôi</NavItem>
              <NavItem to="/wishlist" icon={Heart}>Sản phẩm yêu thích</NavItem>
              <div className="border-t border-gray-100 my-1.5" />
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut size={18} /> Đăng xuất
              </button>
            </nav>
          </div>

          {/* ── NỘI DUNG CHÍNH ───────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">

            {/* HỒ SƠ CÁ NHÂN */}
            <div className="bg-white p-6 sm:p-8 rounded-sm shadow-sm border border-gray-100">
              <h2 className="text-base font-display font-semibold text-gray-900 mb-0.5">Hồ Sơ Của Tôi</h2>
              <p className="text-sm text-gray-400 mb-6 pb-5 border-b border-gray-100">
                Quản lý thông tin hồ sơ để bảo mật tài khoản
              </p>

              <div className="flex flex-col md:flex-row gap-8 md:gap-10">

                {/* FIX 3 & 4: Form — đổi layout label/input thành flex-col thay vì
                    grid 3 cột. Gọn hơn, không bị lệch trên mobile */}
                <form onSubmit={handleUpdateProfile} className="flex-1 space-y-4">

                  {[
                    { label: "Họ và tên", key: "name", type: "text", required: true },
                    { label: "Email", key: "email", type: "email", required: true },
                    { label: "Số điện thoại", key: "phone", type: "tel", required: true },
                  ].map(({ label, key, type, required }) => (
                    <div key={key} className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {label} {required && <span className="text-[#DB4444]">*</span>}
                      </label>
                      <input
                        type={type}
                        value={profile[key]}
                        onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                        required={required}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-sm text-gray-800 focus:outline-none focus:border-[#DB4444] transition-colors"
                      />
                    </div>
                  ))}

                  {/* Giới tính */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Giới tính</label>
                    <div className="flex items-center gap-6 pt-1">
                      {[{ val: "male", label: "Nam" }, { val: "female", label: "Nữ" }].map(({ val, label }) => (
                        <label key={val} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            checked={profile.gender === val}
                            onChange={() => setProfile({ ...profile, gender: val })}
                            className="accent-[#DB4444]"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Ngày sinh */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ngày sinh</label>
                    <input
                      type="date"
                      value={profile.dob}
                      onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-sm text-gray-800 focus:outline-none focus:border-[#DB4444] transition-colors"
                    />
                  </div>

                  {/* FIX 4: Nút Lưu — w-full trên mobile, w-auto trên sm+ */}
                  <div className="pt-2 flex items-center gap-4">
                    <button
                      type="submit"
                      className="px-8 py-2.5 bg-[#DB4444] text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-colors shadow-sm w-full sm:w-auto"
                    >
                      Lưu Thay Đổi
                    </button>
                    {/* FIX 5: Thay alert bằng inline success feedback */}
                    {saveSuccess && (
                      <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                        <Check size={16} strokeWidth={2.5} /> Đã lưu thành công!
                      </span>
                    )}
                  </div>
                </form>

                {/* Avatar */}
                <div className="md:w-56 flex flex-col items-center md:border-l md:border-gray-100 md:pl-10">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 mb-4 group cursor-pointer">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=DB4444&color=fff&size=200`}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white" size={20} />
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors">
                    Chọn Ảnh
                  </button>
                  <p className="text-xs text-gray-400 mt-3 text-center leading-relaxed">
                    Tối đa 1 MB<br />JPEG, PNG
                  </p>
                </div>
              </div>
            </div>

            {/* SỔ ĐỊA CHỈ */}
            <div className="bg-white p-6 sm:p-8 rounded-sm shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-5 pb-5 border-b border-gray-100 gap-4">
                <h2 className="text-base font-display font-semibold text-gray-900">Sổ Địa Chỉ</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#DB4444] text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-colors shadow-sm whitespace-nowrap flex-shrink-0">
                  <Plus size={15} /> Thêm địa chỉ
                </button>
              </div>

              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div key={addr.id}>
                    <div className={`p-5 border rounded-sm transition-colors ${deleteConfirmId === addr.id ? "border-red-300 bg-red-50/40" : "border-gray-200 hover:border-gray-300"}`}>
                      <div className="flex flex-col sm:flex-row justify-between gap-4">

                        {/* Thông tin địa chỉ */}
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-900 text-sm">{addr.name}</span>
                            <span className="text-gray-200">|</span>
                            <span className="text-gray-500 text-sm">{addr.phone}</span>
                            {addr.isDefault && (
                              <span className="px-2 py-0.5 bg-red-50 text-[#DB4444] text-[10px] font-bold tracking-wide border border-red-200 rounded-sm">
                                MẶC ĐỊNH
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 flex items-start gap-1.5">
                            <MapPin size={14} className="mt-0.5 flex-shrink-0 text-gray-400" />
                            <span>{addr.address}</span>
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center sm:items-start gap-3 sm:flex-col sm:text-right flex-shrink-0">
                          <div className="flex gap-3">
                            <button className="text-sm font-medium text-blue-600 hover:underline whitespace-nowrap">
                              Cập nhật
                            </button>
                            {/* FIX 5: Thay window.confirm bằng inline confirm UI */}
                            {!addr.isDefault && (
                              <button
                                onClick={() => confirmDelete(addr.id)}
                                className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors whitespace-nowrap"
                              >
                                Xóa
                              </button>
                            )}
                          </div>
                          {!addr.isDefault && (
                            <button
                              onClick={() => setDefault(addr.id)}
                              className="px-3 py-1.5 border border-gray-300 text-gray-600 text-xs font-medium rounded-sm hover:border-[#DB4444] hover:text-[#DB4444] transition-colors whitespace-nowrap"
                            >
                              Đặt mặc định
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Inline confirm xóa */}
                      {deleteConfirmId === addr.id && (
                        <div className="mt-4 pt-4 border-t border-red-200 flex items-center justify-between gap-4 flex-wrap">
                          <p className="text-sm text-red-600 font-medium">Xác nhận xóa địa chỉ này?</p>
                          <div className="flex gap-2">
                            <button
                              onClick={cancelDelete}
                              className="px-4 py-1.5 border border-gray-300 text-gray-600 text-xs font-medium rounded-sm hover:bg-gray-50 transition-colors"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={() => executeDelete(addr.id)}
                              className="px-4 py-1.5 bg-red-500 text-white text-xs font-medium rounded-sm hover:bg-red-600 transition-colors"
                            >
                              Xác nhận xóa
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}