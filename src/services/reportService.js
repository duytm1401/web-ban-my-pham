import { REPORT_DATA, PERIOD_LABELS, CATEGORY_DATA, CATEGORY_COLORS } from '../data/mockReports';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const reportService = {
  getConstants: () => ({
    PERIOD_LABELS,
    CATEGORY_COLORS
  }),

  // Mô phỏng việc gọi API để lấy số liệu thống kê
  getDashboardData: async () => {
    await delay(700); // Giả lập server tính toán mất 0.7s
    return {
      chartData: REPORT_DATA,
      categoryData: CATEGORY_DATA
    };
  }
};