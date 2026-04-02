import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth(); // Lấy hàm login từ bộ não trung tâm

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setErrorMessage(''); // Xoá lỗi cũ trước khi thử đăng nhập mới

    // Gọi hàm login từ Context
    const role = login(email, password);

    if (role === 'admin') {
      navigate('/admin'); 
    } else if (role === 'user') {
      navigate('/'); // Đăng nhập xong nhảy về Trang chủ
    } else {
      setErrorMessage("Email hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white mt-[72px]">
      
      <div className="w-full max-w-[480px] p-8 sm:p-12 border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.06)] rounded-sm">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-wider mb-3 text-black">
            {isLogin ? 'Đăng Nhập' : 'Tạo tài khoản'}
          </h2>
          <p className="text-gray-500 text-sm">Chào mừng bạn đến với Aurelia Store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Họ và tên" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setErrorMessage('')}
              className="w-full border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#DB4444] transition-colors bg-transparent text-black"
            />
          )}

          <input 
            type="text" 
            placeholder="Email hoặc Số điện thoại" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setErrorMessage('')}
            className="w-full border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#DB4444] transition-colors bg-transparent text-black"
          />

          <div className="relative">
            <input 
              type="password" 
              placeholder="Mật khẩu" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setErrorMessage('')}
              className="w-full border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#DB4444] transition-colors bg-transparent text-black"
            />
            {/* HIỂN THỊ DÒNG LỖI MÀU ĐỎ NGAY DƯỚI PASSWORD */}
            {errorMessage && isLogin && (
              <div className="text-[#DB4444] text-xs font-medium mt-2 absolute">
                {errorMessage}
              </div>
            )}
          </div>

          <div className="pt-4 space-y-4">
            {isLogin && (
              <div className="text-right w-full">
                <span 
                  onClick={() => alert('Chức năng đang phát triển!')}
                  className="text-[#DB4444] text-sm hover:underline font-medium cursor-pointer"
                >
                  Quên mật khẩu?
                </span>
              </div>
            )}
            
            <button type="submit" className="w-full bg-[#DB4444] text-white py-4 rounded-sm font-medium hover:bg-red-600 transition-colors shadow-sm uppercase tracking-widest text-sm">
              {isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}
            </button>

            <div className="relative py-2">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
               <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Hoặc</span></div>
            </div>

            <button 
              type="button" 
              onClick={() => alert('Chức năng Google đang được phát triển!')}
              className="w-full border border-gray-300 text-black py-3.5 rounded-sm font-medium flex justify-center items-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Tiếp tục với Google
            </button>
          </div>
        </form>

        <div className="mt-10 text-center text-gray-600">
          <p>
            {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
            <span 
              onClick={() => { setIsLogin(!isLogin); setErrorMessage(''); }} 
              className="text-black font-semibold border-b border-gray-400 cursor-pointer pb-0.5 ml-2 hover:text-[#DB4444] hover:border-[#DB4444] transition-colors"
            >
              {isLogin ? "Đăng ký" : "Đăng nhập"}
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}