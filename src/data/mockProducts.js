// src/data/mockProducts.js
export const CATEGORIES = ["Chăm sóc da mặt", "Trang điểm", "Chăm sóc cơ thể", "Chăm sóc tóc", "Mỹ phẩm nam"];

export const INIT_PRODUCTS = Array(12).fill(null).map((_, i) => ({
  id: i + 1,
  name: ["Serum Estee Lauder ANR 50ml", "Kem chống nắng Anessa Perfect UV", "Tẩy trang Bioderma 500ml",
    "Sữa rửa mặt La Roche-Posay", "Serum Vitamin C Skinceuticals", "Toner Klairs Supple Prep",
    "Kem dưỡng ẩm Neutrogena", "Son kem Black Rouge A01", "Cushion Laneige Neo",
    "Serum Niacinamide The Ordinary", "Kem B5 La Roche-Posay", "Mặt nạ JM Solution"][i],
  category: CATEGORIES[i % CATEGORIES.length],
  price: [2500000, 550000, 495000, 420000, 3200000, 380000, 290000, 175000, 650000, 280000, 480000, 120000][i],
  stock: [24, 72, 91, 65, 12, 48, 55, 200, 33, 88, 40, 150][i],
  status: i % 5 === 3 ? "Ẩn" : "Đang bán",
  image: `https://placehold.co/60x60/f8f9fa/a1a1aa?text=SP${i + 1}`,
}));