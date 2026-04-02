import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Check, MapPin, Phone, User, Mail, ChevronRight, Shield, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../../context/CartContext'; // KÉO ỐNG NƯỚC GIỎ HÀNG VÀO

// ── Dữ liệu địa chỉ & Thanh toán mẫu ──────────────────────────────────────────
const PROVINCES = ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Bình Dương", "Đồng Nai", "Cần Thơ", "Hải Phòng"];
const DISTRICTS = {
  "TP. Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 7", "Bình Thạnh", "Gò Vấp", "Tân Bình", "Thủ Đức"],
  "Hà Nội": ["Hoàn Kiếm", "Ba Đình", "Đống Đa", "Cầu Giấy", "Hai Bà Trưng", "Long Biên"],
  "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "Liên Chiểu"],
};
const WARDS = {
  "Quận 1": ["Phường Bến Nghé", "Phường Bến Thành", "Phường Cầu Kho", "Phường Cô Giang", "Phường Đa Kao"],
  "Quận 3": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5"],
  "Quận 7": ["Phường Tân Thuận Đông", "Phường Tân Thuận Tây", "Phường Tân Kiểng", "Phường Tân Hưng"],
  "Bình Thạnh": ["Phường 1", "Phường 3", "Phường 11", "Phường 13", "Phường 17", "Phường 25"],
};

const PAYMENT_METHODS = [
  {
    id: "cod",
    label: "Thanh toán khi nhận hàng (COD)",
    desc: "Trả tiền mặt khi nhận hàng",
    icon: <img src="/images/anh-thanh-toan/logo_COD.png" alt="COD" className="w-8 h-8 object-contain rounded-md" />,
  },
  {
    id: "momo",
    label: "Ví MoMo",
    desc: "Thanh toán qua ví điện tử MoMo",
    icon: <img src="/images/anh-thanh-toan/logo_momo.webp" alt="MoMo" className="w-8 h-8 object-contain rounded-md" />,
  },
  {
    id: "vnpay",
    label: "VNPay",
    desc: "Thanh toán qua cổng VNPay",
    icon: <img src="/images/anh-thanh-toan/logo_vnpay.jpg" alt="VNPay" className="w-8 h-8 object-contain" />,
  },
  {
    id: "zalopay",
    label: "ZaloPay",
    desc: "Thanh toán qua ví ZaloPay",
    icon: <img src="/images/anh-thanh-toan/logo_zalo.png" alt="ZaloPay" className="w-8 h-8 object-contain rounded-md" />,
  },
  {
    id: "bank",
    label: "Chuyển khoản ngân hàng",
    desc: "Chuyển khoản trực tiếp tới tài khoản",
    icon: <img src="/images/anh-thanh-toan/logo_banking.png" alt="banking" className="w-8 h-8 object-contain rounded-md" />,
  },
];

// ── Helper ────────────────────────────────────────────────────────────────────
const fmt = (n) => n.toLocaleString("vi-VN");

// ── Sub-components ────────────────────────────────────────────────────────────
const SectionCard = ({ step, title, children }) => (
  <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/60">
      <div className="w-7 h-7 rounded-full bg-[#DB4444] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
        {step}
      </div>
      <h2 className="font-display font-semibold text-gray-900 text-base">{title}</h2>
    </div>
    <div className="px-6 py-6">{children}</div>
  </div>
);

const InputField = ({ label, required, icon: Icon, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {label} {required && <span className="text-[#DB4444]">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon size={15} />
        </div>
      )}
      <input
        {...props}
        className={`w-full ${Icon ? "pl-9" : "pl-4"} pr-4 py-3 border border-gray-200 rounded-sm text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#DB4444] transition-colors bg-white`}
      />
    </div>
  </div>
);

const SelectField = ({ label, required, value, onChange, options, placeholder }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {label} {required && <span className="text-[#DB4444]">*</span>}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-sm text-sm text-gray-800 focus:outline-none focus:border-[#DB4444] transition-colors bg-white cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  // LẤY DỮ LIỆU TỪ KHO CHUNG
  const { cartItems, clearCart } = useCart();

  // Form state
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "", note: "",
    province: "", district: "", ward: "", address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const districts = DISTRICTS[form.province] || [];
  const wards = WARDS[form.district] || [];

  // TÍNH TOÁN TIỀN BẠC (Dựa trên cartItems thật)
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingFee = shippingMethod === "express" ? 45000 : shippingMethod === "same_day" ? 75000 : 0;
  const discount = couponApplied ? 50000 : 0;
  const total = subtotal + shippingFee - discount;

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === "AURELIA50") setCouponApplied(true);
    else alert("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
  };

  const handleOrder = () => {
    if (cartItems.length === 0) { 
      alert("Giỏ hàng rỗng, không thể đặt hàng!"); 
      return; 
    }
    const required = ["fullName", "phone", "province", "district", "ward", "address"];
    const missing = required.filter((k) => !form[k]);
    if (missing.length) { alert("Vui lòng điền đầy đủ thông tin bắt buộc."); return; }
    if (!agreeTerms) { alert("Vui lòng đồng ý với điều khoản dịch vụ."); return; }
    
    // Đặt hàng thành công
    setSubmitted(true);
    clearCart(); // DỌN SẠCH GIỎ HÀNG THẬT
    window.scrollTo(0, 0);
  };

  // ── Success Screen ──
  if (submitted) {
    return (
      <div className="bg-white min-h-[80vh] flex flex-col items-center justify-center px-4 font-body mt-[72px]">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6 border-4 border-green-100">
          <Check size={36} className="text-green-500" strokeWidth={2.5} />
        </div>
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2 text-center">Đặt hàng thành công!</h2>
        <p className="text-gray-500 text-center mb-1">Mã đơn hàng của bạn: <span className="font-semibold text-gray-900">#AUR-{Math.floor(100000 + Math.random() * 900000)}</span></p>
        <p className="text-gray-500 text-center mb-8 max-w-sm">
          Chúng tôi sẽ liên hệ xác nhận đơn hàng trong vòng 30 phút. Cảm ơn bạn đã tin tưởng Aurelia!
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/" className="px-8 py-3 bg-[#DB4444] text-white font-medium rounded-sm hover:bg-red-600 transition-colors text-center text-sm">
            Về trang chủ
          </Link>
          <Link to="/danh-muc" className="px-8 py-3 border border-gray-200 text-gray-700 font-medium rounded-sm hover:border-[#DB4444] hover:text-[#DB4444] transition-colors text-center text-sm">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  // ── Main Checkout ──
  return (
    <div className="bg-[#F5F5F5] min-h-screen pb-20 font-body mt-[72px]">

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#DB4444] transition-colors">Trang chủ</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <Link to="/gio-hang" className="hover:text-[#DB4444] transition-colors">Giỏ hàng</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-gray-900 font-medium">Thanh toán</span>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="bg-white border-b border-gray-100 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-0 max-w-xs">
            {["Giỏ hàng", "Thanh toán", "Hoàn tất"].map((s, i) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${i === 0 ? "bg-[#DB4444] border-[#DB4444] text-white" : i === 1 ? "bg-[#DB4444] border-[#DB4444] text-white" : "border-gray-300 text-gray-400 bg-white"}`}>
                    {i < 1 ? <Check size={14} strokeWidth={3} /> : i + 1}
                  </div>
                  <span className={`text-[11px] font-medium whitespace-nowrap ${i <= 1 ? "text-[#DB4444]" : "text-gray-400"}`}>{s}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-0.5 mx-1 mb-4 ${i < 1 ? "bg-[#DB4444]" : "bg-gray-200"}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ═══ CỘT TRÁI ═══════════════════════════════════════════════════ */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">

            {/* 1. Thông tin người nhận */}
            <SectionCard step="1" title="Thông tin người nhận">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Họ và tên" required icon={User} placeholder="Nguyễn Văn A" value={form.fullName} onChange={set("fullName")} />
                <InputField label="Số điện thoại" required icon={Phone} placeholder="0912 345 678" value={form.phone} onChange={set("phone")} type="tel" />
                <div className="sm:col-span-2">
                  <InputField label="Email" icon={Mail} placeholder="email@gmail.com" value={form.email} onChange={set("email")} type="email" />
                </div>
              </div>
            </SectionCard>

            {/* 2. Địa chỉ giao hàng */}
            <SectionCard step="2" title="Địa chỉ giao hàng">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField
                  label="Tỉnh / Thành phố" required
                  value={form.province}
                  onChange={(e) => setForm(f => ({ ...f, province: e.target.value, district: "", ward: "" }))}
                  options={PROVINCES}
                  placeholder="Chọn tỉnh / thành phố"
                />
                <SelectField
                  label="Quận / Huyện" required
                  value={form.district}
                  onChange={(e) => setForm(f => ({ ...f, district: e.target.value, ward: "" }))}
                  options={districts}
                  placeholder={form.province ? "Chọn quận / huyện" : "Chọn tỉnh trước"}
                />
                <SelectField
                  label="Phường / Xã" required
                  value={form.ward}
                  onChange={set("ward")}
                  options={wards}
                  placeholder={form.district ? "Chọn phường / xã" : "Chọn quận trước"}
                />
                <div className="sm:col-span-1">
                  <InputField
                    label="Số nhà, tên đường" required icon={MapPin}
                    placeholder="123 Nguyễn Huệ"
                    value={form.address}
                    onChange={set("address")}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Ghi chú đơn hàng</label>
                  <textarea
                    rows={3}
                    placeholder="Ghi chú cho người giao hàng, ví dụ: giao giờ hành chính, gọi trước khi giao..."
                    value={form.note}
                    onChange={set("note")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#DB4444] transition-colors resize-none bg-white"
                  />
                </div>
              </div>
            </SectionCard>

            {/* 3. Phương thức vận chuyển */}
            <SectionCard step="3" title="Phương thức vận chuyển">
              <div className="flex flex-col gap-3">
                {[
                  { id: "standard", label: "Giao hàng tiêu chuẩn", desc: "3 – 5 ngày làm việc", fee: 0, tag: "Miễn phí" },
                  { id: "express", label: "Giao hàng nhanh", desc: "1 – 2 ngày làm việc", fee: 45000, tag: null },
                  { id: "same_day", label: "Giao trong ngày", desc: "Nội thành TP.HCM & Hà Nội", fee: 75000, tag: "Phổ biến" },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition-all ${shippingMethod === opt.id ? "border-[#DB4444] bg-red-50/40" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.id}
                      checked={shippingMethod === opt.id}
                      onChange={() => setShippingMethod(opt.id)}
                      className="accent-[#DB4444] w-4 h-4 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-gray-900">{opt.label}</span>
                        {opt.tag && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${opt.id === "same_day" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                            {opt.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                    </div>
                    <span className={`text-sm font-semibold flex-shrink-0 ${opt.fee === 0 ? "text-green-600" : "text-gray-900"}`}>
                      {opt.fee === 0 ? "Miễn phí" : `${fmt(opt.fee)}đ`}
                    </span>
                  </label>
                ))}
              </div>
            </SectionCard>

            {/* 4. Phương thức thanh toán */}
            <SectionCard step="4" title="Phương thức thanh toán">
              <div className="flex flex-col gap-3">
                {PAYMENT_METHODS.map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition-all ${paymentMethod === m.id ? "border-[#DB4444] bg-red-50/40" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={m.id}
                      checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id)}
                      className="accent-[#DB4444] w-4 h-4 flex-shrink-0"
                    />
                    <span className="text-xl flex-shrink-0">{m.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{m.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{m.desc}</p>
                    </div>
                    {paymentMethod === m.id && (
                      <div className="w-5 h-5 rounded-full bg-[#DB4444] flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-white" strokeWidth={3} />
                      </div>
                    )}
                  </label>
                ))}

                {/* Hướng dẫn chuyển khoản */}
                {paymentMethod === "bank" && (
                  <div className="mt-2 p-4 bg-blue-50 border border-blue-100 rounded-sm text-sm text-blue-800 space-y-1">
                    <p className="font-semibold">Thông tin chuyển khoản:</p>
                    <p>Ngân hàng: <span className="font-medium">Vietcombank</span></p>
                    <p>Số tài khoản: <span className="font-medium">1234567890</span></p>
                    <p>Chủ tài khoản: <span className="font-medium">CÔNG TY TNHH AURELIA</span></p>
                    <p className="text-blue-600 text-xs mt-2">* Ghi nội dung: Họ tên + SĐT để xác nhận đơn hàng</p>
                  </div>
                )}
              </div>
            </SectionCard>

          </div>

          {/* ═══ CỘT PHẢI — TÓM TẮT ĐƠN HÀNG ══════════════════════════════ */}
          <div className="w-full lg:w-[380px] flex-shrink-0 flex flex-col gap-4 lg:sticky lg:top-6">

            {/* Danh sách sản phẩm TỪ KHO THẬT */}
            <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60">
                <h2 className="font-display font-semibold text-gray-900 text-base">
                  Đơn hàng ({cartItems.reduce((s, i) => s + i.quantity, 0)} sản phẩm)
                </h2>
              </div>
              <div className="divide-y divide-gray-50">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 px-6 py-4">
                    <div className="relative flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-sm object-cover bg-gray-50 mix-blend-multiply" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#DB4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{item.brand || "AURELIA"}</p>
                      <p className="text-sm text-gray-900 font-medium line-clamp-2 leading-snug">{item.name}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 flex-shrink-0 ml-2">
                      {fmt(item.price * item.quantity)}đ
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mã giảm giá */}
            <div className="bg-white border border-gray-100 rounded-sm shadow-sm px-6 py-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Mã giảm giá</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập mã (VD: AURELIA50)"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  disabled={couponApplied}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#DB4444] transition-colors disabled:bg-gray-50 disabled:text-gray-400"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={couponApplied || !coupon.trim()}
                  className="px-4 py-2.5 bg-[#DB4444] text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {couponApplied ? "Đã áp dụng" : "Áp dụng"}
                </button>
              </div>
              {couponApplied && (
                <p className="text-green-600 text-xs mt-2 font-medium">✓ Đã giảm {fmt(discount)}đ</p>
              )}
            </div>

            {/* Tổng tiền */}
            <div className="bg-white border border-gray-100 rounded-sm shadow-sm px-6 py-5">
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tạm tính</span>
                  <span className="text-gray-900 font-medium">{fmt(subtotal)}đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phí vận chuyển</span>
                  <span className={shippingFee === 0 ? "text-green-600 font-medium" : "text-gray-900 font-medium"}>
                    {shippingFee === 0 ? "Miễn phí" : `${fmt(shippingFee)}đ`}
                  </span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Giảm giá</span>
                    <span className="text-green-600 font-medium">- {fmt(discount)}đ</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Tổng cộng</span>
                  <span className="font-bold text-lg text-[#DB4444]">{fmt(total)}đ</span>
                </div>
              </div>

              {/* Đồng ý điều khoản */}
              <label className="flex items-start gap-3 mb-5 cursor-pointer group">
                <div
                  onClick={() => setAgreeTerms(!agreeTerms)}
                  className={`w-4 h-4 border-2 rounded flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${agreeTerms ? "bg-[#DB4444] border-[#DB4444]" : "border-gray-300 group-hover:border-[#DB4444]"}`}
                >
                  {agreeTerms && <Check size={10} className="text-white" strokeWidth={3} />}
                </div>
                <span className="text-xs text-gray-500 leading-relaxed">
                  Tôi đã đọc và đồng ý với{" "}
                  <a href="#" className="text-[#DB4444] hover:underline font-medium">Điều khoản dịch vụ</a>
                  {" "}và{" "}
                  <a href="#" className="text-[#DB4444] hover:underline font-medium">Chính sách bảo mật</a>
                  {" "}của Aurelia.
                </span>
              </label>

              <button
                onClick={handleOrder}
                className="w-full py-4 bg-[#DB4444] text-white font-semibold rounded-sm hover:bg-red-600 active:scale-[0.98] transition-all text-sm tracking-wide shadow-sm"
              >
                Đặt hàng ngay
              </button>
            </div>

            {/* Cam kết */}
            <div className="bg-white border border-gray-100 rounded-sm shadow-sm px-6 py-5">
              <div className="flex flex-col gap-3">
                {[
                  { icon: Shield, text: "Thanh toán an toàn & bảo mật tuyệt đối" },
                  { icon: Truck, text: "Miễn phí giao hàng đơn từ 499.000đ" },
                  { icon: RotateCcw, text: "Đổi trả dễ dàng trong vòng 7 ngày" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-[#DB4444]" />
                    </div>
                    {text}
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