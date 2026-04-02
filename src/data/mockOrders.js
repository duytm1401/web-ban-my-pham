export const STATUSES = ["Tất cả", "Chờ xác nhận", "Đang giao", "Hoàn thành", "Đã huỷ"];

export const STATUS_STYLE = {
  "Hoàn thành":    { cls: "bg-green-100 text-green-700", dot: "bg-green-500" },
  "Đang giao":     { cls: "bg-blue-100 text-blue-700",   dot: "bg-blue-500" },
  "Chờ xác nhận":  { cls: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  "Đã huỷ":        { cls: "bg-red-100 text-red-600",     dot: "bg-red-500" },
};

export const INIT_ORDERS = Array(18).fill(null).map((_, i) => ({
  id: `AUR-${String(42 - i).padStart(4, "0")}`,
  customer: ["Nguyễn Thị Lan", "Trần Văn Minh", "Phạm Thu Hà", "Lê Quốc Bảo", "Võ Thị Mai",
             "Đặng Hữu Phúc", "Hồ Thị Ngọc", "Bùi Văn Tú", "Lý Thị Hoa", "Trịnh Văn Nam"][i % 10],
  phone: "090" + String(1234567 + i),
  address: `${100 + i} Nguyễn Huệ, Quận ${(i % 5) + 1}, TP. HCM`,
  date: `${String(31 - (i % 10)).padStart(2, "0")}/03/2026`,
  total: 420000 + i * 350000,
  status: ["Hoàn thành", "Đang giao", "Chờ xác nhận", "Đã huỷ", "Hoàn thành"][i % 5],
  payment: ["COD", "MoMo", "VNPay", "COD", "Chuyển khoản"][i % 5],
  items: [
    { name: "Serum Estee Lauder ANR", qty: 1, price: 2500000 },
    { name: "Kem chống nắng Anessa", qty: 2, price: 550000 },
  ],
}));