import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Import Components & Layouts (Khách Hàng)
import ClientLayout from './layouts/ClientLayout';
import Home from './pages/client/Home';
import AuthPage from './pages/auth/AuthPage';
import { AuthProvider } from './context/AuthContext';
import CategoryPage from './pages/client/CategoryPage';
import AboutPage from './pages/client/AboutPage';
import ContactPage from './pages/client/ContactPage';
import CartPage from './pages/client/CartPage';
import CheckoutPage from './pages/client/CheckoutPage';
import ProductDetailPage from './pages/client/ProductDetailPage';
import WishlistPage from './pages/client/WishlistPage';
import ProfilePage from './pages/client/ProfilePage';

// Import Components & Layouts (Admin)
import AdminLayout from './layouts/AdminLayout'; 
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          {/* TRANG KHÁCH HÀNG */}
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<Home />} /> 
            <Route path="login" element={<AuthPage />} />
            <Route path="danh-muc" element={<CategoryPage />} />
            <Route path="tin-tuc" element={<AboutPage />} />
            <Route path="gioi-thieu" element={<AboutPage />} />
            <Route path="lien-he" element={<ContactPage />} />
            <Route path="gio-hang" element={<CartPage />} />
            <Route path="thanh-toan" element={<CheckoutPage />} />
            <Route path="san-pham/:id" element={<ProductDetailPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* TRANG ADMIN */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;