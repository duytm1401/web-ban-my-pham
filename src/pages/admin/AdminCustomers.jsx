import React, { useState, useEffect } from "react";
import { Search, Eye, X, Users, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { customerService } from "../../services/customerService"; // Import đường ống

const fmt = (n) => n.toLocaleString("vi-VN");
const PAGE_SIZE = 8;

export default function AdminCustomers() {
  // 1. STATE QUẢN LÝ DỮ LIỆU
  const [customers, setCustomers] = useState([]);
  const [tierStyle, setTierStyle] = useState({});
  
  // 2. STATE TRẠNG THÁI MẠNG
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState(null);

  // 3. FETCH DỮ LIỆU KHI VÀO TRANG
  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      try {
        setTierStyle(customerService.getTierStyles());
        
        const data = await customerService.getAll();
        setCustomers(data);
      } catch (error) {
        console.error("Lỗi lấy danh sách khách hàng:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  // 4. LỌC & PHÂN TRANG
  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );
  
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Khách hàng</h1>
          <p className="text-xs text-gray-400 mt-0.5">{customers.length} khách hàng đã đăng ký</p>
        </div>
      </div>

      {/* THẺ THỐNG KÊ NHANH (Chỉ tính toán khi đã có dữ liệu) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Tổng khách hàng", value: isLoading ? "..." : customers.length, color: "bg-blue-50 text-blue-700" },
          { label: "Khách VIP", value: isLoading ? "..." : customers.filter(c => c.tier === "VIP").length, color: "bg-amber-50 text-amber-700" },
          { label: "Mới trong tháng", value: isLoading ? "..." : 5, color: "bg-green-50 text-green-700" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white p-5 rounded-sm border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
            <div className={`w-11 h-11 rounded-sm flex items-center justify-center ${color}`}>
              <Users size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* THANH TÌM KIẾM */}
      <div className="bg-white p-4 rounded-sm border border-gray-100 shadow-sm">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Tìm tên hoặc email..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#DB4444] transition-colors"
          />
        </div>
      </div>

      {/* BẢNG KHÁCH HÀNG */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden relative min-h-[400px]">
        {/* HIỆU ỨNG LOADING */}
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-white/80 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-[#DB4444] mb-2" size={32} />
            <span className="text-sm text-gray-500 font-medium">Đang tải danh sách...</span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Khách hàng</th>
                <th className="text-left px-5 py-3 font-semibold">Ngày tham gia</th>
                <th className="text-left px-5 py-3 font-semibold">Đơn hàng</th>
                <th className="text-left px-5 py-3 font-semibold">Chi tiêu</th>
                <th className="text-left px-5 py-3 font-semibold">Hạng</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {!isLoading && paged.length === 0 && (
                <tr><td colSpan={6} className="text-center py-16 text-gray-400">
                  <Users size={32} className="mx-auto mb-2 opacity-40" />
                  Không tìm thấy khách hàng
                </td></tr>
              )}
              {paged.map((c) => (
                <tr key={c.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=f3f4f6&color=6b7280&size=64`}
                        alt={c.name}
                        className="w-9 h-9 rounded-full flex-shrink-0"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{c.name}</p>
                        <p className="text-xs text-gray-400">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{c.joinDate}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{c.orders}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{fmt(c.totalSpent)}đ</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${tierStyle[c.tier]}`}>
                      {c.tier}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => setDetail(c)} className="p-1.5 text-gray-400 hover:text-[#DB4444] hover:bg-red-50 rounded-sm transition-colors">
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 text-xs text-gray-500">
            <span>Trang {page} / {totalPages}</span>
            <div className="flex gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="p-1.5 rounded-sm border border-gray-200 disabled:opacity-40 hover:border-[#DB4444] hover:text-[#DB4444] transition-colors">
                <ChevronLeft size={14} />
              </button>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="p-1.5 rounded-sm border border-gray-200 disabled:opacity-40 hover:border-[#DB4444] hover:text-[#DB4444] transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL CHI TIẾT KHÁCH HÀNG */}
      {detail && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Thông tin khách hàng</h3>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-gray-700"><X size={18} /></button>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center mb-5">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(detail.name)}&background=DB4444&color=fff&size=128`}
                  alt={detail.name}
                  className="w-16 h-16 rounded-full mb-3"
                />
                <p className="font-bold text-gray-900 text-base">{detail.name}</p>
                <span className={`mt-1 text-[11px] font-semibold px-2.5 py-1 rounded-full ${tierStyle[detail.tier]}`}>
                  {detail.tier}
                </span>
              </div>
              <div className="space-y-3 text-sm bg-gray-50 rounded-sm p-4">
                {[
                  ["Email", detail.email],
                  ["Số điện thoại", detail.phone],
                  ["Ngày tham gia", detail.joinDate],
                  ["Tổng đơn hàng", `${detail.orders} đơn`],
                  ["Tổng chi tiêu", `${fmt(detail.totalSpent)}đ`],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-500 font-medium">{label}:</span>
                    <span className="text-gray-900 font-semibold text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 pb-6">
              <button onClick={() => setDetail(null)} className="w-full py-2.5 bg-[#DB4444] text-white text-sm rounded-sm hover:bg-red-600 transition-colors font-medium">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}