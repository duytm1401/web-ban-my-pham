import { INIT_STORE_SETTINGS, INIT_SHIPPING_SETTINGS, INIT_NOTIF_SETTINGS } from '../data/mockSettings';

// Lưu trên RAM
let storeDB = { ...INIT_STORE_SETTINGS };
let shippingDB = { ...INIT_SHIPPING_SETTINGS };
let notifDB = { ...INIT_NOTIF_SETTINGS };

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const settingService = {
  // Lấy toàn bộ cấu hình 1 lần khi vào trang
  getAllSettings: async () => {
    await delay(500); 
    return {
      store: { ...storeDB },
      shipping: { ...shippingDB },
      notif: { ...notifDB }
    };
  },

  // Các hàm lưu (Cập nhật)
  updateStore: async (data) => {
    await delay(600);
    storeDB = { ...data };
    return true;
  },

  updateShipping: async (data) => {
    await delay(600);
    shippingDB = { ...data };
    return true;
  },

  updateNotif: async (data) => {
    await delay(600);
    notifDB = { ...data };
    return true;
  },

  // Giả lập đổi mật khẩu thành công
  updatePassword: async (data) => {
    await delay(800);
    // Trong thực tế sẽ gửi pass cũ lên server check, pass mới để mã hóa
    return true; 
  }
};