import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Check, LogIn, ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Import context đăng nhập

export default function ContactPage() {
  const { isLoggedIn } = useAuth(); // Lấy trạng thái đăng nhập
  const [isSubmitted, setIsSubmitted] = useState(false); // Trạng thái đã gửi form hay chưa

  // Hàm xử lý khi khách hàng bấm Gửi lời nhắn
  const handleSubmit = (e) => {
    e.preventDefault(); // Chặn hành vi load lại trang mặc định của form HTML
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-body overflow-x-hidden max-w-full">
      
      {/* TIÊU ĐỀ TRANG CHÍNH */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 mb-12 lg:mb-16 text-center">
        <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 font-display tracking-tight">
          Liên Hệ Với Chúng Tôi
        </h1>
        <p className="mt-4 text-gray-600 text-[15px] max-w-xl mx-auto">
          Aurelia luôn lắng nghe và sẵn sàng hỗ trợ bạn. Đừng ngần ngại gửi lời nhắn, chúng tôi sẽ phản hồi sớm nhất có thể!
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-12">
            
            <div className="border border-gray-200 rounded-sm p-8 bg-white shadow-[0_4px_40px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#DB4444] flex items-center justify-center text-white flex-shrink-0">
                  <Phone size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 tracking-wide">Gọi Cho Chúng Tôi</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
                <p>Chúng tôi luôn sẵn sàng 24/7, 7 ngày một tuần.</p>
                <p className="font-semibold text-gray-900 text-base">Điện thoại: 090 123 4567</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-sm p-8 bg-white shadow-[0_4px_40px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#DB4444] flex items-center justify-center text-white flex-shrink-0">
                  <Mail size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 tracking-wide">Viết Cho Chúng Tôi</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
                <p>Hãy điền vào biểu mẫu bên cạnh và chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.</p>
                <p>Email: <a href="mailto:hotro@aurelia.vn" className="text-[#DB4444] hover:underline">hotro@aurelia.vn</a></p>
                <p>Email: <a href="mailto:info@aurelia.vn" className="text-[#DB4444] hover:underline">info@aurelia.vn</a></p>
              </div>
            </div>

          </div>

          <div className="lg:col-span-2 border border-gray-200 rounded-sm p-8 bg-white shadow-[0_4px_40px_rgba(0,0,0,0.03)] min-h-[400px] flex flex-col justify-center">
            
            {/* TRẠNG THÁI 1: CHƯA ĐĂNG NHẬP */}
            {!isLoggedIn ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={32} className="text-gray-300" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-display font-semibold text-gray-900 mb-3">
                  Bạn cần đăng nhập
                </h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Để đảm bảo an toàn thông tin và giúp Aurelia hỗ trợ bạn tốt nhất, vui lòng đăng nhập trước khi gửi lời nhắn nhé!
                </p>
                <Link 
                  to="/login" 
                  className="inline-flex items-center justify-center gap-2 px-10 py-3.5 bg-[#DB4444] text-white font-medium rounded-sm hover:bg-red-600 transition-colors shadow-sm"
                >
                  <LogIn size={18} /> Đăng nhập ngay
                </Link>
              </div>

            // TRẠNG THÁI 2: ĐÃ ĐĂNG NHẬP -> ĐÃ GỬI THÀNH CÔNG
            ) : isSubmitted ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
                  <Check size={36} className="text-green-500" strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-display font-semibold text-gray-900 mb-2">
                  Gửi lời nhắn thành công!
                </h2>
                <p className="text-gray-500 mb-10 max-w-md mx-auto">
                  Aurelia đã nhận được thông tin của bạn. Đội ngũ CSKH sẽ phản hồi vào email của bạn trong thời gian sớm nhất.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="w-full sm:w-auto px-8 py-3.5 border-2 border-gray-200 text-gray-700 font-medium rounded-sm hover:border-[#DB4444] hover:text-[#DB4444] transition-colors"
                  >
                    Gửi liên hệ khác
                  </button>
                  <Link 
                    to="/" 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#DB4444] text-white font-medium rounded-sm hover:bg-red-600 transition-colors shadow-sm"
                  >
                    Tiếp tục mua hàng <ArrowLeft size={18} className="rotate-180" />
                  </Link>
                </div>
              </div>

            // TRẠNG THÁI 3: ĐÃ ĐĂNG NHẬP -> HIỆN FORM ĐIỀN
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 h-full justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Tên & Số điện thoại */}
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Họ và tên của bạn *"
                      required
                      className="w-full border border-gray-100 rounded-sm bg-gray-50 px-5 py-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#DB4444] focus:border-[#DB4444] transition-all"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="tel" 
                      placeholder="Số điện thoại liên hệ *"
                      required
                      className="w-full border border-gray-100 rounded-sm bg-gray-50 px-5 py-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#DB4444] focus:border-[#DB4444] transition-all"
                    />
                  </div>
                </div>

                {/* Tiêu đề & Lời nhắn */}
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Tiêu đề lời nhắn *"
                    required
                    className="w-full border border-gray-100 rounded-sm bg-gray-50 px-5 py-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#DB4444] focus:border-[#DB4444] transition-all"
                  />
                </div>

                <div className="relative">
                  <textarea 
                    placeholder="Nội dung chi tiết bạn cần hỗ trợ..." 
                    rows="5" 
                    required
                    className="w-full border border-gray-100 rounded-sm bg-gray-50 px-5 py-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#DB4444] focus:border-[#DB4444] transition-all resize-none"
                  />
                </div>

                {/* Nút gửi */}
                <div className="flex justify-end mt-2">
                  <button 
                    type="submit"
                    className="px-12 py-4 bg-[#DB4444] text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-colors shadow-sm tracking-wide"
                  >
                    Gửi Lời Nhắn
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}