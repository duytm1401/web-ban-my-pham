export const TIER_STYLE = {
  "VIP":       "bg-amber-100 text-amber-700",
  "Thân thiết":"bg-purple-100 text-purple-700",
  "Thường":    "bg-gray-100 text-gray-500",
};

export const INIT_CUSTOMERS = Array(16).fill(null).map((_, i) => ({
  id: i + 1,
  name: ["Nguyễn Thị Lan", "Trần Văn Minh", "Phạm Thu Hà", "Lê Quốc Bảo", "Võ Thị Mai",
         "Đặng Hữu Phúc", "Hồ Thị Ngọc", "Bùi Văn Tú", "Lý Thị Hoa", "Trịnh Văn Nam",
         "Cao Thị Bích", "Vũ Đức Long", "Mai Thị Tuyết", "Ngô Văn Hùng", "Đinh Thị Kim", "Phan Văn An"][i],
  email: `khach${i + 1}@gmail.com`,
  phone: `090${String(1000000 + i * 1234567).slice(0, 7)}`,
  orders: Math.floor(Math.random() * 12) + 1,
  totalSpent: (Math.floor(Math.random() * 15) + 1) * 500000,
  joinDate: `${String((i % 28) + 1).padStart(2, "0")}/${String((i % 12) + 1).padStart(2, "0")}/2025`,
  tier: i < 3 ? "VIP" : i < 8 ? "Thân thiết" : "Thường",
}));