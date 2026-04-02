import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp, ShoppingCart, Users, Package,
  ArrowUpRight, ArrowDownRight, Eye, Loader2
} from "lucide-react";
import { dashboardService } from "../../services/dashboardService";

// ── UI CONFIG (Chỉ chứa Icon, Label, Color. Không chứa số liệu) ──
const STATS_UI_CONFIG = [
  { id: "revenue", label: "Doanh thu tháng", icon: TrendingUp, color: "bg-blue-50 text-blue-600" },
  { id: "orders", label: "Đơn hàng mới", icon: ShoppingCart, color: "bg-green-50 text-green-600" },
  { id: "customers", label: "Khách hàng mới", icon: Users, color: "bg-purple-50 text-purple-600" },
  { id: "products", label: "Sản phẩm đang bán", icon: Package, color: "bg-orange-50 text-orange-600" },
];

const fmt   = (n) => n.toLocaleString("vi-VN");
const fmtM  = (n) => (n / 1000000).toFixed(1) + "M";   // 54.6M
const DRAW_PX = 140; // chiều cao vùng cột, tính bằng px

export default function AdminDashboard() {
  // 1. STATE DỮ LIỆU VÀ LOADING
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [metric, setMetric] = useState("revenue"); // "revenue" | "orders"

  // 2. FETCH DATA KHI VÀO TRANG
  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      try {
        const result = await dashboardService.getDashboardData();
        setData(result);
      } catch (error) {
        console.error("Lỗi tải Dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // 3. HIỂN THỊ LOADING NẾU CHƯA CÓ DATA
  if (isLoading || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Loader2 className="animate-spin text-[#DB4444] mb-3" size={40} />
        <p className="text-gray-500 font-medium">Đang tải bảng điều khiển...</p>
      </div>
    );
  }

  // 4. BÓC TÁCH DỮ LIỆU (DESTRUCTURING) ĐỂ SỬ DỤNG
  const { stats, weekData, recentOrders, topProducts, statusStyle } = data;

  // Tính toán trục Y cho biểu đồ dựa trên dữ liệu thật
  const values = weekData.map((d) => d[metric]);
  const maxVal = Math.max(...values);
  const totalWeek = values.reduce((s, v) => s + v, 0);

  const ySteps = 5;
  const yMax   = Math.ceil(maxVal / (metric === "revenue" ? 10000000 : 5)) * (metric === "revenue" ? 10000000 : 5);
  const yLabels = Array.from({ length: ySteps }, (_, i) => Math.round((yMax / (ySteps - 1)) * (ySteps - 1 - i)));

  const formatY = (v) => metric === "revenue" ? (v === 0 ? "0" : `${v / 1000000}M`) : String(v);

  return (
    <div className="space-y-6">

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS_UI_CONFIG.map(({ id, label, icon: Icon, color }) => {
          // Khớp dữ liệu API vào giao diện
          const statData = stats.find(s => s.id === id);
          if (!statData) return null;

          return (
            <div key={id} className="bg-white p-5 rounded-sm border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
                <div className={`w-9 h-9 rounded-sm flex items-center justify-center ${color}`}>
                  <Icon size={17} />
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900 mb-1">{statData.value}</p>
              <div className={`flex items-center gap-1 text-xs font-medium ${statData.change >= 0 ? "text-green-600" : "text-red-500"}`}>
                {statData.change >= 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                {Math.abs(statData.change)}% so với tháng trước
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── BIỂU ĐỒ CỘT DOANH THU / ĐƠN HÀNG TUẦN ────────────── */}
        <div className="xl:col-span-2 bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Doanh thu tuần này</h3>
              <p className="text-xs text-gray-400 mt-0.5">25/03 – 31/03/2026</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Toggle metric */}
              <div className="flex rounded-sm border border-gray-200 overflow-hidden text-xs font-semibold">
                <button
                  onClick={() => setMetric("revenue")}
                  className={`px-3 py-1.5 transition-colors ${metric === "revenue" ? "bg-[#DB4444] text-white" : "text-gray-500 hover:bg-gray-50"}`}
                >
                  Doanh thu
                </button>
                <button
                  onClick={() => setMetric("orders")}
                  className={`px-3 py-1.5 transition-colors border-l border-gray-200 ${metric === "orders" ? "bg-[#DB4444] text-white" : "text-gray-500 hover:bg-gray-50"}`}
                >
                  Đơn hàng
                </button>
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-sm">+12.5%</span>
            </div>
          </div>

          {/* Tổng tuần */}
          <p className="text-2xl font-bold text-gray-900 mb-5">
            {metric === "revenue" ? `${fmt(totalWeek)}đ` : `${totalWeek} đơn`}
            <span className="text-xs font-normal text-gray-400 ml-2">tổng tuần</span>
          </p>

          {/* Chart area */}
          <div className="flex gap-2">
            {/* Y-axis labels */}
            <div
              className="flex flex-col justify-between items-end text-[10px] text-gray-300 select-none flex-shrink-0 pr-1"
              style={{ height: DRAW_PX + 36 }}
            >
              {yLabels.map((v) => (
                <span key={v}>{formatY(v)}</span>
              ))}
            </div>

            {/* Bars + grid */}
            <div className="flex-1 relative">
              {/* Grid lines ngang */}
              <div
                className="absolute left-0 right-0 top-4 flex flex-col justify-between pointer-events-none"
                style={{ height: DRAW_PX }}
              >
                {yLabels.map((v) => (
                  <div key={v} className="w-full border-t border-gray-100" />
                ))}
              </div>

              {/* Bars */}
              <div className="flex items-end gap-1 sm:gap-2" style={{ height: DRAW_PX + 36 }}>
                {weekData.map((d, i) => {
                  const v      = d[metric];
                  const barPx  = maxVal > 0 ? Math.max(4, Math.round((v / maxVal) * DRAW_PX)) : 4;
                  const tipVal = metric === "revenue" ? fmtM(v) : `${v}đ`;

                  return (
                    <div
                      key={d.label}
                      className="flex-1 flex flex-col items-center justify-end group min-w-0"
                      style={{ height: DRAW_PX + 36 }}
                    >
                      <span
                        className="text-[10px] font-semibold text-gray-700 whitespace-nowrap mb-1 transition-opacity duration-150"
                        style={{ opacity: 0, height: 16 }}
                      >
                        {tipVal}
                      </span>
                      <span
                        className="text-[10px] font-semibold text-gray-700 whitespace-nowrap mb-1 transition-opacity duration-150
                                   absolute opacity-0 group-hover:opacity-100 -translate-y-[calc(100%+4px+20px)]"
                        style={{ bottom: barPx + 20 }}
                      >
                        {tipVal}
                      </span>
                      <div
                        className="w-full rounded-t-sm cursor-pointer transition-all duration-300
                                   bg-[#DB4444] opacity-75 group-hover:opacity-100 group-hover:brightness-110"
                        style={{ height: barPx }}
                      />
                      <span className="text-[10px] text-gray-400 mt-1.5 select-none">{d.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mini legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-50 flex-wrap">
            {weekData.map((d) => (
              <div key={d.label} className="flex flex-col">
                <span className="text-[10px] text-gray-400">{d.label}</span>
                <span className="text-[11px] font-semibold text-gray-700">
                  {metric === "revenue" ? fmtM(d.revenue) : d.orders}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* TOP SẢN PHẨM */}
        <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 text-sm mb-4">Sản phẩm bán chạy</h3>
          <div className="space-y-4">
            {topProducts.map((p, i) => (
              <div key={p.name}>
                <div className="flex items-start justify-between mb-1.5 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`text-[10px] font-bold w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0 ${i === 0 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
                      {i + 1}
                    </span>
                    <span className="text-xs text-gray-700 font-medium truncate">{p.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-900 flex-shrink-0">{p.sold} SP</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-[#DB4444] h-1.5 rounded-full" style={{ width: `${p.sold}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BẢNG ĐƠN HÀNG GẦN ĐÂY */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900 text-sm">Đơn hàng gần đây</h3>
          <Link to="/admin/orders" className="text-xs font-medium text-[#DB4444] hover:underline flex items-center gap-1">
            Xem tất cả <ArrowUpRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[540px]">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Mã đơn</th>
                <th className="text-left px-6 py-3 font-semibold">Khách hàng</th>
                <th className="text-left px-6 py-3 font-semibold">Ngày</th>
                <th className="text-left px-6 py-3 font-semibold">Tổng tiền</th>
                <th className="text-left px-6 py-3 font-semibold">Trạng thái</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-xs font-semibold text-gray-700">#{order.id}</td>
                  <td className="px-6 py-3.5 text-gray-800 font-medium">{order.customer}</td>
                  <td className="px-6 py-3.5 text-gray-500 text-xs">{order.date}</td>
                  <td className="px-6 py-3.5 font-semibold text-gray-900">{fmt(order.total)}đ</td>
                  <td className="px-6 py-3.5">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyle[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <Link to="/admin/orders" className="text-gray-400 hover:text-[#DB4444] transition-colors">
                      <Eye size={15} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}