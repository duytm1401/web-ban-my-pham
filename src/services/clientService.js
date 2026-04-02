import { 
  FLASH_SALES_DATA, 
  BANNERS_DATA, 
  CATEGORIES_DATA, 
  BEST_SELLERS_DATA, 
  PROMO_BANNER_DATA, 
  EXPLORE_PRODUCTS_DATA, 
  FEATURED_ARRIVALS_DATA,
  CATEGORY_PRODUCTS_DATA 
} from '../data/mockClient';

// Giả lập độ trễ mạng Internet
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const clientService = {
  // Trả về toàn bộ dữ liệu cho Trang Chủ trong 1 lần gọi
  getHomePageData: async () => {
    await delay(700); 
    
    return {
      flashSales: FLASH_SALES_DATA,
      banners: BANNERS_DATA,
      categories: CATEGORIES_DATA,
      bestSellers: BEST_SELLERS_DATA,
      promoBanner: PROMO_BANNER_DATA,
      exploreProducts: EXPLORE_PRODUCTS_DATA,
      featuredArrivals: FEATURED_ARRIVALS_DATA
    };
  },

  getCategoryProducts: async () => {
    await delay(500); // Giả lập loading nửa giây
    return CATEGORY_PRODUCTS_DATA;
  }
};