import { INIT_ORDERS, STATUSES, STATUS_STYLE } from '../data/mockOrders';

let ordersDB = [...INIT_ORDERS];

// Giả lập độ trễ mạng
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const orderService = {
  getStatuses: () => STATUSES,
  getStatusStyles: () => STATUS_STYLE,

  // Lấy danh sách đơn hàng
  getAll: async () => {
    await delay(500); 
    return [...ordersDB];
  },

  // Cập nhật trạng thái (Chờ xác nhận -> Đang giao -> Hoàn thành)
  updateStatus: async (id, newStatus) => {
    await delay(600); // Giả vờ gọi lên Server mất 0.6s
    ordersDB = ordersDB.map(o => o.id === id ? { ...o, status: newStatus } : o);
    return true;
  }
};