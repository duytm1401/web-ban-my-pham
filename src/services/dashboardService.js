import { STATS_DATA, WEEK_DATA, RECENT_ORDERS, TOP_PRODUCTS, STATUS_STYLE } from '../data/mockDashboard';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const dashboardService = {
  getDashboardData: async () => {
    await delay(600); // Giả lập độ trễ mạng tải Dashboard 0.6s
    return {
      stats: STATS_DATA,
      weekData: WEEK_DATA,
      recentOrders: RECENT_ORDERS,
      topProducts: TOP_PRODUCTS,
      statusStyle: STATUS_STYLE
    };
  }
};