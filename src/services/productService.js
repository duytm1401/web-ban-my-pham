import { INIT_PRODUCTS, CATEGORIES } from '../data/mockProducts';

let productsDB = [...INIT_PRODUCTS];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  getCategories: () => CATEGORIES,

  // Lấy danh sách sản phẩm
  getAll: async () => {
    await delay(600); 
    return [...productsDB];
  },

  // Thêm sản phẩm mới
  add: async (productData) => {
    await delay(600);
    const newProduct = { 
      ...productData, 
      id: Date.now(), 
      image: productData.image || `https://placehold.co/60x60/f8f9fa/a1a1aa?text=New` 
    };
    productsDB = [newProduct, ...productsDB]; // Thêm lên đầu danh sách
    return newProduct;
  },

  // Cập nhật sản phẩm
  update: async (id, updatedData) => {
    await delay(600);
    productsDB = productsDB.map(p => p.id === id ? { ...p, ...updatedData } : p);
    return true;
  },

  // Xóa sản phẩm
  delete: async (id) => {
    await delay(600);
    productsDB = productsDB.filter(p => p.id !== id);
    return true;
  }
};