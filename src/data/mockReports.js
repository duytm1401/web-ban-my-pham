export const REPORT_DATA = {
  month: {
    labels: ["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"],
    revenue: [42, 55, 38, 67, 72, 88, 65, 79, 91, 84, 76, 95],   // triệu đ
    orders:  [28, 36, 22, 45, 51, 60, 44, 55, 63, 58, 52, 68],
  },
  quarter: {
    labels: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"],
    revenue: [135, 227, 235, 255],
    orders:  [86,  156,  162, 172],
  },
  year: {
    labels: ["2022", "2023", "2024", "2025", "2026"],
    revenue: [480, 620, 750, 852, 310],   // 2026 chưa kết thúc
    orders:  [320, 430, 512, 576, 210],
  },
};

export const PERIOD_LABELS = { month: "Tháng", quarter: "Quý", year: "Năm" };

export const CATEGORY_DATA = [
  { name: "Chăm sóc da mặt", revenue: 48200000, percent: 42 },
  { name: "Trang điểm",       revenue: 23500000, percent: 20 },
  { name: "Chăm sóc cơ thể",  revenue: 17300000, percent: 15 },
  { name: "Serum & Essence",  revenue: 19800000, percent: 17 },
  { name: "Khác",             revenue:  6900000, percent:  6 },
];

export const CATEGORY_COLORS = [
  "bg-[#DB4444]", "bg-blue-500", "bg-amber-400", "bg-purple-500", "bg-gray-300",
];