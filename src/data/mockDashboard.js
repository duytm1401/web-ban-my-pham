export const STATS_DATA = [
  { id: "revenue", value: "84,320,000đ", change: +12.5 },
  { id: "orders", value: "142", change: +8.2 },
  { id: "customers", value: "38", change: -3.1 },
  { id: "products", value: "96", change: +2.0 },
];

export const WEEK_DATA = [
  { label: "T2", revenue: 54600000, orders: 18 },
  { label: "T3", revenue: 68880000, orders: 24 },
  { label: "T4", revenue: 46200000, orders: 15 },
  { label: "T5", revenue: 75600000, orders: 27 },
  { label: "T6", revenue: 65520000, orders: 22 },
  { label: "T7", revenue: 79800000, orders: 31 },
  { label: "CN", revenue: 40320000, orders: 13 },
];

export const RECENT_ORDERS = [
  { id: "AUR-0042", customer: "Nguyễn Thị Lan", total: 2920000, status: "Hoàn thành", date: "31/03/2026" },
  { id: "AUR-0041", customer: "Trần Văn Minh", total: 495000,   status: "Đang giao",   date: "31/03/2026" },
  { id: "AUR-0040", customer: "Phạm Thu Hà",   total: 5400000, status: "Chờ xác nhận", date: "30/03/2026" },
  { id: "AUR-0039", customer: "Lê Quốc Bảo",  total: 1200000, status: "Đã huỷ",       date: "30/03/2026" },
  { id: "AUR-0038", customer: "Võ Thị Mai",    total: 3600000, status: "Hoàn thành",   date: "29/03/2026" },
];

export const TOP_PRODUCTS = [
  { name: "Serum Estee Lauder ANR",      sold: 48 },
  { name: "Kem chống nắng Anessa",       sold: 72 },
  { name: "Tẩy trang Bioderma",          sold: 91 },
  { name: "Sữa rửa mặt La Roche-Posay", sold: 65 },
];

export const STATUS_STYLE = {
  "Hoàn thành":   "bg-green-100 text-green-700",
  "Đang giao":    "bg-blue-100 text-blue-700",
  "Chờ xác nhận": "bg-amber-100 text-amber-700",
  "Đã huỷ":       "bg-red-100 text-red-600",
};