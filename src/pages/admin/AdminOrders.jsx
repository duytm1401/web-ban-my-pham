import React, { useState, useEffect } from "react";
import { Search, Eye, X, ChevronLeft, ChevronRight, ShoppingCart, Loader2 } from "lucide-react";
import { orderService } from "../../services/orderService"; // Gọi đường ống vào

const fmt = (n) => n.toLocaleString("vi-VN");
const PAGE_SIZE = 8;

export default function AdminOrders() {
  // 1. STATE QUẢN LÝ DỮ LIỆU
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [statusStyle, setStatusStyle] = useState({});
  
  // 2. STATE QUẢN LÝ TRẠNG THÁI MẠNG (LOADING)
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState(null);

  // 3. FETCH DỮ LIỆU KHI VÀO TRANG
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        setStatuses(orderService.getStatuses());
        setStatusStyle(orderService.getStatusStyles());
        
        const data = await orderService.getAll();
        setOrders(data);
      } catch (error) {
        console.error("Lỗi lấy đơn hàng:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // LỌC VÀ PHÂN TRANG
  const filtered = orders.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Tất cả" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // 4. HÀM CẬP NHẬT TRẠNG THÁI CÓ GỌI API GIẢ LẬP
  const handleUpdateStatus = async (id, newStatus) => {
    if (isUpdating) return;
    setIsUpdating(true);
    
    try {
      // Báo lên Server
      await orderService.updateStatus(id, newStatus);
      
      // Lấy danh sách mới về
      const newData = await orderService.getAll();
      setOrders(newData);
      
      // Cập nhật luôn modal chi tiết nếu đang mở
      if (detail?.id === id) {
        setDetail((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Đơn hàng</h1>
        <p className="text-xs text-gray-400 mt-0.5">{orders.length} đơn hàng tổng cộng</p>
      </div>

      {/* TABS TRẠNG THÁI */}
      <div className="flex gap-1 flex-wrap">
        {!isLoading && statuses.map((s) => {
          const count = s === "Tất cả" ? orders.length : orders.filter((o) => o.status === s).length;
          return (
            <button
              key={s}
              onClick={() => { setFilterStatus(s); setPage(1); }}
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                filterStatus === s ? "bg-[#DB4444] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#DB4444] hover:text-[#DB4444]"
              }`}
            >
              {s}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${filterStatus === s ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-sm border border-gray-100 shadow-sm">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Tìm mã đơn hoặc tên khách..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#DB4444] transition-colors"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden relative min-h-[400px]">
        {/* HIỆU ỨNG LOADING BẢNG */}
        {isLoading ? (
          <div className="absolute inset-0 z-10 bg-white/80 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-[#DB4444] mb-2" size={32} />
            <span className="text-sm text-gray-500 font-medium">Đang tải đơn hàng...</span>
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Mã đơn</th>
                <th className="text-left px-5 py-3 font-semibold">Khách hàng</th>
                <th className="text-left px-5 py-3 font-semibold">Ngày đặt</th>
                <th className="text-left px-5 py-3 font-semibold">Tổng tiền</th>
                <th className="text-left px-5 py-3 font-semibold">Thanh toán</th>
                <th className="text-left px-5 py-3 font-semibold">Trạng thái</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {!isLoading && paged.length === 0 && (
                <tr><td colSpan={7} className="text-center py-16 text-gray-400">
                  <ShoppingCart size={32} className="mx-auto mb-2 opacity-40" />
                  Không có đơn hàng nào
                </td></tr>
              )}
              {paged.map((o) => (
                <tr key={o.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs font-semibold text-gray-700">#{o.id}</td>
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-gray-900">{o.customer}</p>
                    <p className="text-xs text-gray-400">{o.phone}</p>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{o.date}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{fmt(o.total)}đ</td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{o.payment}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 w-fit ${statusStyle[o.status]?.cls}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyle[o.status]?.dot}`} />
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => setDetail(o)} className="p-1.5 text-gray-400 hover:text-[#DB4444] hover:bg-red-50 rounded-sm transition-colors">
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

      {/* MODAL CHI TIẾT ĐƠN HÀNG */}
      {detail && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-sm shadow-2xl w-full max-w-lg my-8 relative">
            
            {/* Overlay loading khi đang bấm cập nhật trạng thái */}
            {isUpdating && (
              <div className="absolute inset-0 z-20 bg-white/50 flex items-center justify-center rounded-sm">
                <Loader2 className="animate-spin text-[#DB4444]" size={32} />
              </div>
            )}

            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h3 className="font-semibold text-gray-900">Chi tiết đơn hàng</h3>
                <p className="text-xs text-gray-400 font-mono">#{detail.id}</p>
              </div>
              <button onClick={() => !isUpdating && setDetail(null)} className="text-gray-400 hover:text-gray-700"><X size={18} /></button>
            </div>

            <div className="p-6 space-y-5">
              {/* Thông tin khách */}
              <div className="bg-gray-50 rounded-sm p-4 space-y-1.5 text-sm">
                <p><span className="font-semibold text-gray-700">Khách hàng:</span> <span className="text-gray-900">{detail.customer}</span></p>
                <p><span className="font-semibold text-gray-700">SĐT:</span> <span className="text-gray-600">{detail.phone}</span></p>
                <p><span className="font-semibold text-gray-700">Địa chỉ:</span> <span className="text-gray-600">{detail.address}</span></p>
                <p><span className="font-semibold text-gray-700">Thanh toán:</span> <span className="text-gray-600">{detail.payment}</span></p>
              </div>

              {/* Sản phẩm */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Sản phẩm</p>
                {detail.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-400">x{item.qty}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{fmt(item.price * item.qty)}đ</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-3 mt-1">
                  <span className="font-semibold text-gray-900">Tổng cộng</span>
                  <span className="font-bold text-lg text-[#DB4444]">{fmt(detail.total)}đ</span>
                </div>
              </div>

              {/* Cập nhật trạng thái */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Cập nhật trạng thái</p>
                <div className="flex flex-wrap gap-2">
                  {statuses.filter(s => s !== "Tất cả").map((s) => (
                    <button
                      key={s}
                      onClick={() => handleUpdateStatus(detail.id, s)}
                      disabled={isUpdating}
                      className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors border ${
                        detail.status === s
                          ? `${statusStyle[s]?.cls} border-current`
                          : "border-gray-200 text-gray-500 hover:border-gray-400 disabled:opacity-50"
                      }`}
                    >
                      {detail.status === s && "✓ "}{s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 flex justify-end">
              <button onClick={() => !isUpdating && setDetail(null)} className="px-6 py-2.5 bg-[#DB4444] text-white text-sm rounded-sm hover:bg-red-600 transition-colors font-medium disabled:opacity-70">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}