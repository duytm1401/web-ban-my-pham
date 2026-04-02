import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Tự động kiểm tra xem trước đó đã đăng nhập chưa khi F5 trang web
  useEffect(() => {
    const savedUser = localStorage.getItem('aurelia_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (email, password) => {
    // Tạm thời mình giả lập logic kiểm tra ở đây (Sau này Java sẽ làm việc này)
    if (email === "admin@gmail.com" && password === "123456") {
      const adminData = { name: "Quản trị viên", email, role: "admin" };
      setUser(adminData);
      setIsLoggedIn(true);
      localStorage.setItem('aurelia_user', JSON.stringify(adminData));
      return "admin";
    } else if (email && password) {
      const userData = { name: "Duy Trần", email, role: "user" };
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('aurelia_user', JSON.stringify(userData));
      return "user";
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('aurelia_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};