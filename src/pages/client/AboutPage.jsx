import React from 'react';
import { 
  Store, 
  CircleDollarSign, 
  Gift, 
  Wallet, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Truck, 
  Headphones, 
  ShieldCheck 
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { id: 1, icon: Store, number: "10.5k", label: "Người bán hàng trên trang", active: false },
    { id: 2, icon: CircleDollarSign, number: "33k", label: "Doanh số sản phẩm hàng tháng", active: true },
    { id: 3, icon: Gift, number: "45.5k", label: "Khách hàng đang hoạt động", active: false },
    { id: 4, icon: Wallet, number: "1tỷ USD", label: "Tổng doanh thu hàng năm", active: false },
  ];

  const team = [
    { id: 1, name: "Nguyễn Phương Hằng", role: "Người sáng lập & Chủ tịch", image: "/images/ng3.jpg" },
    { id: 2, name: "Dược Sĩ Tiến", role: "Giám đốc điều hành", image: "/images/ng1.webp" },
    { id: 3, name: "Đoàn Di Băng", role: "Nhà thiết kế sản phẩm", image: "images/ng2.jpg" },
  ];

  const features = [
    { id: 1, icon: Truck, title: "GIAO HÀNG NHANH VÀ MIỄN PHÍ", desc: "Giao hàng miễn phí cho đơn từ 499k" },
    { id: 2, icon: Headphones, title: "HỖ TRỢ KHÁCH HÀNG 24/7", desc: "Đội ngũ hỗ trợ thân thiện 24/7" },
    { id: 3, icon: ShieldCheck, title: "CAM KẾT CHÍNH HÃNG", desc: "Đền bù 200% nếu phát hiện hàng giả" },
  ];

  return (
    <div className="bg-white min-h-screen pb-20 font-body overflow-x-hidden max-w-full">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
        
        {/* OUR STORY SECTION */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24">
          <div className="flex-1 space-y-6">
            <h1 className="text-[40px] lg:text-[54px] font-semibold text-gray-900 tracking-tight font-display mb-8">
              Câu chuyện của chúng tôi
            </h1>
            <p className="text-gray-600 leading-relaxed text-[15px]">
              Ra mắt vào năm 2015, Aurelia là nền tảng mua sắm mỹ phẩm trực tuyến hàng đầu khu vực với sự hiện diện mạnh mẽ tại Việt Nam. Được hỗ trợ bởi hàng loạt các giải pháp tiếp thị, dữ liệu và dịch vụ được thiết kế riêng, Aurelia hiện có 10,500 nhà bán hàng và 300 thương hiệu, phục vụ 3 triệu khách hàng trên toàn quốc.
            </p>
            <p className="text-gray-600 leading-relaxed text-[15px]">
              Aurelia cung cấp hơn 1 triệu sản phẩm đa dạng và đang phát triển với tốc độ chóng mặt. Chúng tôi mang đến những bộ sưu tập phong phú thuộc nhiều danh mục làm đẹp từ bình dân đến cao cấp.
            </p>
          </div>
          <div className="flex-1 w-full">
            <img 
              src="/images/banner_cty.jpg" 
              alt="Our Story" 
              className="w-full h-auto object-cover rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className={`group flex flex-col items-center justify-center p-8 border rounded-sm transition-all duration-300 cursor-pointer ${
                stat.active 
                  ? 'bg-[#DB4444] border-[#DB4444] text-white shadow-[0_4px_20px_rgba(219,68,68,0.3)]' 
                  : 'bg-white border-gray-200 text-gray-900 hover:bg-[#DB4444] hover:border-[#DB4444] hover:text-white'
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 border-[10px] transition-colors duration-300 ${
                stat.active ? 'bg-white border-white/30 text-black' : 'bg-black border-gray-200/60 text-white group-hover:bg-white group-hover:border-white/30 group-hover:text-black'
              }`}>
                <stat.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-[32px] font-bold mb-1 tracking-wider">{stat.number}</h3>
              <p className={`text-sm text-center ${stat.active ? 'text-white' : 'text-gray-600 group-hover:text-white'}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* TEAM SECTION */}
        <div className="mb-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {team.map((member) => (
              <div key={member.id} className="flex flex-col group cursor-pointer">
                <div className="bg-gray-100 rounded-sm overflow-hidden mb-6 aspect-[3/4] shadow-sm">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-3xl font-medium text-gray-900 mb-1 font-display tracking-wide">{member.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{member.role}</p>
                <div className="flex items-center gap-4 text-gray-900">
                  <Twitter size={18} className="hover:text-[#DB4444] transition-colors" />
                  <Instagram size={18} className="hover:text-[#DB4444] transition-colors" />
                  <Linkedin size={18} className="hover:text-[#DB4444] transition-colors" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300 cursor-pointer hover:bg-gray-400 transition-colors"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300 cursor-pointer hover:bg-gray-400 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-[#DB4444] ring-2 ring-[#DB4444] ring-offset-2 cursor-pointer"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300 cursor-pointer hover:bg-gray-400 transition-colors"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300 cursor-pointer hover:bg-gray-400 transition-colors"></div>
          </div>
        </div>

        {/* FEATURES / SERVICES SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-6 max-w-5xl mx-auto pb-10">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gray-300/40 flex items-center justify-center mb-6">
                <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center">
                  <feature.icon size={28} strokeWidth={1.5} />
                </div>
              </div>
              <h4 className="text-[17px] font-bold text-gray-900 mb-2 uppercase tracking-wide">{feature.title}</h4>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}