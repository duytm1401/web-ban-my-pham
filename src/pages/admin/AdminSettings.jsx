import React, { useState, useEffect } from "react";
import { Check, Store, Bell, Shield, Truck, Loader2 } from "lucide-react";
import { settingService } from "../../services/settingService";

const TABS = [
  { id: "store", label: "Cửa hàng", icon: Store },
  { id: "shipping", label: "Vận chuyển", icon: Truck },
  { id: "notif", label: "Thông báo", icon: Bell },
  { id: "security", label: "Bảo mật", icon: Shield },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("store");
  
  // Trạng thái Loading và Saving
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // States lưu trữ dữ liệu các form
  const [storeSettings, setStoreSettings] = useState({});
  const [shippingSettings, setShippingSettings] = useState({});
  const [notifSettings, setNotifSettings] = useState({});
  const [secSettings, setSecSettings] = useState({ currentPw: "", newPw: "", confirmPw: "" });

  // Lấy dữ liệu khi vào trang
  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const data = await settingService.getAllSettings();
        setStoreSettings(data.store);
        setShippingSettings(data.shipping);
        setNotifSettings(data.notif);
      } catch (error) {
        console.error("Lỗi lấy cấu hình:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Xử lý khi bấm nút Lưu cài đặt
  const handleSave = async (e) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);

    try {
      // Phân luồng lưu theo Tab đang mở
      if (activeTab === "store") {
        await settingService.updateStore(storeSettings);
      } else if (activeTab === "shipping") {
        await settingService.updateShipping(shippingSettings);
      } else if (activeTab === "notif") {
        await settingService.updateNotif(notifSettings);
      } else if (activeTab === "security") {
        if (secSettings.newPw !== secSettings.confirmPw) {
          alert("Mật khẩu mới không khớp!");
          return;
        }
        await settingService.updatePassword(secSettings);
        setSecSettings({ currentPw: "", newPw: "", confirmPw: "" }); // Reset form pass
      }

      // Hiện thông báo thành công
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error("Lỗi lưu cấu hình:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const setStore = (key) => (e) => setStoreSettings((s) => ({ ...s, [key]: e.target.value }));
  const setShip = (key) => (e) => setShippingSettings((s) => ({ ...s, [key]: e.target.value }));
  const setSec = (key) => (e) => setSecSettings((s) => ({ ...s, [key]: e.target.value }));

  const InputRow = ({ label, value, onChange, type = "text", placeholder = "" }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      <input type={type} value={value || ""} onChange={onChange} placeholder={placeholder} disabled={isSaving}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#DB4444] transition-colors bg-white disabled:bg-gray-50" />
    </div>
  );

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Cài đặt</h1>
        <p className="text-xs text-gray-400 mt-0.5">Quản lý cấu hình cửa hàng</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 flex-wrap">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => { setActiveTab(id); setSaved(false); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-semibold transition-colors ${
              activeTab === id ? "bg-[#DB4444] text-white shadow-sm" : "bg-white border border-gray-200 text-gray-600 hover:border-[#DB4444] hover:text-[#DB4444]"
            }`}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* Form Area */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm relative min-h-[300px]">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-white/90 flex flex-col items-center justify-center rounded-sm">
            <Loader2 className="animate-spin text-[#DB4444] mb-2" size={32} />
            <span className="text-sm text-gray-500 font-medium">Đang tải cấu hình...</span>
          </div>
        )}

        {!isLoading && (
          <form onSubmit={handleSave} className="p-6 space-y-5">
            {/* ── STORE ── */}
            {activeTab === "store" && (
              <div className="animate-in fade-in duration-300">
                <h3 className="font-semibold text-gray-900 text-sm pb-3 border-b border-gray-100 mb-4">Thông tin cửa hàng</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <InputRow label="Tên cửa hàng" value={storeSettings.name} onChange={setStore("name")} />
                  </div>
                  <InputRow label="Email liên hệ" value={storeSettings.email} onChange={setStore("email")} type="email" />
                  <InputRow label="Số điện thoại" value={storeSettings.phone} onChange={setStore("phone")} />
                  <div className="sm:col-span-2">
                    <InputRow label="Địa chỉ" value={storeSettings.address} onChange={setStore("address")} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Đơn vị tiền tệ</label>
                    <select value={storeSettings.currency} onChange={setStore("currency")} disabled={isSaving}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#DB4444] bg-white disabled:bg-gray-50">
                      <option value="VND">VND – Đồng Việt Nam</option>
                      <option value="USD">USD – US Dollar</option>
                    </select>
                  </div>
                  <InputRow label="Thuế VAT (%)" value={storeSettings.taxRate} onChange={setStore("taxRate")} type="number" />
                  <InputRow label="Miễn phí giao hàng từ (đ)" value={storeSettings.minOrderFree} onChange={setStore("minOrderFree")} type="number" />
                </div>
              </div>
            )}

            {/* ── SHIPPING ── */}
            {activeTab === "shipping" && (
              <div className="animate-in fade-in duration-300">
                <h3 className="font-semibold text-gray-900 text-sm pb-3 border-b border-gray-100 mb-4">Phí vận chuyển</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <InputRow label="Giao hàng tiêu chuẩn (đ)" value={shippingSettings.standardFee} onChange={setShip("standardFee")} type="number" placeholder="0 = miễn phí" />
                  <InputRow label="Giao hàng nhanh (đ)" value={shippingSettings.expressFee} onChange={setShip("expressFee")} type="number" />
                  <InputRow label="Giao trong ngày (đ)" value={shippingSettings.sameDayFee} onChange={setShip("sameDayFee")} type="number" />
                  <InputRow label="Miễn phí khi đơn từ (đ)" value={shippingSettings.freeAbove} onChange={setShip("freeAbove")} type="number" />
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-sm p-4 text-xs text-blue-700">
                  💡 Đặt phí giao hàng tiêu chuẩn = 0 để miễn phí cho tất cả đơn hàng
                </div>
              </div>
            )}

            {/* ── NOTIFICATIONS ── */}
            {activeTab === "notif" && (
              <div className="animate-in fade-in duration-300">
                <h3 className="font-semibold text-gray-900 text-sm pb-3 border-b border-gray-100 mb-4">Cài đặt thông báo</h3>
                <div className="space-y-4">
                  {[
                    { key: "newOrder", label: "Đơn hàng mới", desc: "Nhận thông báo khi có đơn hàng mới" },
                    { key: "lowStock", label: "Sắp hết hàng", desc: "Cảnh báo khi sản phẩm còn dưới 20 units" },
                    { key: "newCustomer", label: "Khách hàng mới", desc: "Thông báo khi có khách đăng ký mới" },
                    { key: "orderCancelled", label: "Đơn huỷ", desc: "Thông báo khi khách huỷ đơn hàng" },
                    { key: "dailyReport", label: "Báo cáo hàng ngày", desc: "Nhận tóm tắt doanh thu lúc 8:00 mỗi sáng" },
                  ].map(({ key, label, desc }) => (
                    <label key={key} className={`flex items-center justify-between py-3 border-b border-gray-50 last:border-0 cursor-pointer group ${isSaving ? "opacity-60 pointer-events-none" : ""}`}>
                      <div>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-[#DB4444] transition-colors">{label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                      </div>
                      <div
                        onClick={() => setNotifSettings((s) => ({ ...s, [key]: !s[key] }))}
                        className={`w-10 h-5 rounded-full transition-colors cursor-pointer flex-shrink-0 relative ${notifSettings[key] ? "bg-[#DB4444]" : "bg-gray-200"}`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifSettings[key] ? "translate-x-5" : "translate-x-0.5"}`} />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ── SECURITY ── */}
            {activeTab === "security" && (
              <div className="animate-in fade-in duration-300">
                <h3 className="font-semibold text-gray-900 text-sm pb-3 border-b border-gray-100 mb-4">Đổi mật khẩu</h3>
                <div className="space-y-4 max-w-sm mb-4">
                  <InputRow label="Mật khẩu hiện tại" value={secSettings.currentPw} onChange={setSec("currentPw")} type="password" placeholder="••••••••" />
                  <InputRow label="Mật khẩu mới" value={secSettings.newPw} onChange={setSec("newPw")} type="password" placeholder="••••••••" />
                  <InputRow label="Xác nhận mật khẩu mới" value={secSettings.confirmPw} onChange={setSec("confirmPw")} type="password" placeholder="••••••••" />
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-sm p-4 text-xs text-amber-700 max-w-sm">
                  🔒 Mật khẩu tối thiểu 8 ký tự, bao gồm chữ hoa và số
                </div>
              </div>
            )}

            {/* Save button */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-6">
              <button type="submit" disabled={isSaving}
                className="px-8 py-2.5 bg-[#DB4444] text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2">
                {isSaving && <Loader2 size={15} className="animate-spin" />}
                Lưu cài đặt
              </button>
              {saved && (
                <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium animate-in fade-in">
                  <Check size={16} strokeWidth={2.5} /> Đã lưu thành công!
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}