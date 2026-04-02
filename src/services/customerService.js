import { INIT_CUSTOMERS, TIER_STYLE } from '../data/mockCustomers';

// Lưu trữ trên RAM
let customersDB = [...INIT_CUSTOMERS];

// Hàm tạo độ trễ giả lập mạng internet
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const customerService = {
  getTierStyles: () => TIER_STYLE,

  // Lấy toàn bộ danh sách khách hàng
  getAll: async () => {
    await delay(500); // Giả lập chờ 0.5s
    return [...customersDB];
  }
};