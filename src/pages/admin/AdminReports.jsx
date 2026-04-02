import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Download, Loader2 } from "lucide-react";
import { reportService } from "../../services/reportService";

const fmt = (n) => n.toLocaleString("vi-VN");

// ── Reusable bar chart ────────────────────────────────────────────────────────
function BarChart({ labels, values, color, barAreaPx = 192, unit = "M" }) {
  const [hovered, setHovered] = useState(null);
  const max = Math.max(...values);
  const drawablePx = barAreaPx - 40;

  return (
    <div className="flex items-end gap-1 sm:gap-2 w-full" style={{ height: barAreaPx }}>
      {values.map((v, i) => {
        const barPx = max > 0 ? Math.max(4, Math.round((v / max) * drawablePx)) : 4;
        const isHovered = hovered === i;
        return (
          <div
            key={labels[i]}
            className="flex-1 flex flex-col items-center justify-end min-w-0"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              className="text-[10px] font-semibold whitespace-nowrap transition-opacity duration-150 mb-1"
              style={{ opacity: isHovered ? 1 : 0, height: 16 }}
            >
              {v}{unit}
            </span>
            <div
              className={`w-full rounded-t-sm cursor-pointer transition-all duration-300 ${color} ${
                isHovered ? "opacity-100 brightness-110" : "opacity-80"
              }`}
              style={{ height: barPx }}
            />
            <span className="text-[9px] sm:text-[10px] text-gray-400 truncate w-full text-center mt-1.5">
              {labels[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AdminReports() {
  // 1. STATE DỮ LIỆU & LOADING
  const [chartData, setChartData] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [constants, setConstants] = useState({ PERIOD_LABELS: {}, CATEGORY_COLORS: [] });
  const [isLoading, setIsLoading] = useState(true);
  
  const [period, setPeriod] = useState("month");

  // 2. FETCH DỮ LIỆU KHI VÀO TRANG
  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        setConstants(reportService.getConstants());
        const data = await reportService.getDashboardData();
        setChartData(data.chartData);
        setCategoryData(data.categoryData);
      } catch (error) {
        console.error("Lỗi tải báo cáo:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, []);

  // 3. TÍNH TOÁN (Chỉ thực hiện khi đã có dữ liệu)
  let totalRevenue = 0, totalOrders = 0, avgOrder = 0;
  let labels = [], revenue = [], orders = [];

  if (chartData) {
    const currentData = chartData[period];
    labels = currentData.labels;
    revenue = currentData.revenue;
    orders = currentData.orders;

    totalRevenue = revenue.reduce((s, v) => s + v * 1000000, 0);
    totalOrders  = orders.reduce((s, v) => s + v, 0);
    avgOrder     = Math.round(totalRevenue / totalOrders) || 0;
  }

  const { PERIOD_LABELS, CATEGORY_COLORS } = constants;

  // Render màn hình Loading nếu dữ liệu chưa sẵn sàng
  if (isLoading || !chartData) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Loader2 className="animate-spin text-[#DB4444] mb-3" size={40} />
        <p className="text-gray-500 font-medium">Đang tổng hợp báo cáo...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Báo cáo & Thống kê</h1>
          <p className="text-xs text-gray-400 mt-0.5">Năm 2025–2026</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-sm hover:border-[#DB4444] hover:text-[#DB4444] transition-colors w-fit">
          <Download size={15} /> Xuất báo cáo
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Tổng doanh thu", value: `${fmt(totalRevenue)}đ`, trend: +18.5 },
          { label: "Tổng đơn hàng",  value: String(totalOrders),     trend: +12.3 },
          { label: "Giá trị đơn TB", value: `${fmt(avgOrder)}đ`,     trend: +5.2  },
        ].map(({ label, value, trend }) => (
          <div key={label} className="bg-white p-5 rounded-sm border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{label}</p>
            <p className="text-xl font-bold text-gray-900 mb-1">{value}</p>
            <div className={`flex items-center gap-1 text-xs font-medium ${trend >= 0 ? "text-green-600" : "text-red-500"}`}>
              {trend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {Math.abs(trend)}% YoY
            </div>
          </div>
        ))}
      </div>

      {/* PERIOD SWITCHER */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-xs text-gray-500 font-medium">
          Đang xem theo: <span className="text-gray-900 font-semibold">{PERIOD_LABELS[period]}</span>
        </p>
        <div className="flex gap-1">
          {(["month", "quarter", "year"]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-sm text-xs font-semibold transition-colors ${
                period === p
                  ? "bg-[#DB4444] text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-500 hover:border-[#DB4444] hover:text-[#DB4444]"
              }`}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>
      </div>

      {/* BIỂU ĐỒ CỘT — DOANH THU */}
      <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
          <h3 className="font-semibold text-gray-900 text-sm">
            Doanh thu theo {PERIOD_LABELS[period].toLowerCase()}
          </h3>
          <span className="text-xs text-gray-400">Đơn vị: triệu đồng</span>
        </div>
        <div className="mt-4">
          <BarChart labels={labels} values={revenue} color="bg-[#DB4444]" barAreaPx={192} unit="M" />
        </div>
      </div>

      {/* BIỂU ĐỒ CỘT — ĐƠN HÀNG */}
      <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
          <h3 className="font-semibold text-gray-900 text-sm">
            Số đơn hàng theo {PERIOD_LABELS[period].toLowerCase()}
          </h3>
          <span className="text-xs text-gray-400">Đơn vị: đơn</span>
        </div>
        <div className="mt-4">
          <BarChart labels={labels} values={orders} color="bg-blue-400" barAreaPx={160} unit="" />
        </div>
      </div>

      {/* DOANH THU THEO DANH MỤC */}
      <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-900 text-sm mb-5">Doanh thu theo danh mục</h3>

        <div className="flex flex-wrap gap-3 mb-5">
          {categoryData.map((c, i) => (
            <div key={c.name} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-sm ${CATEGORY_COLORS[i]}`} />
              <span className="text-[11px] text-gray-500">{c.name}</span>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {categoryData.map((c, i) => (
            <div key={c.name} className="flex items-center gap-4">
              <span className="text-xs text-gray-600 font-medium w-36 flex-shrink-0 truncate">
                {c.name}
              </span>
              <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-700 ${CATEGORY_COLORS[i]}`}
                  style={{ width: `${c.percent}%` }}
                />
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 w-28 justify-end">
                <span className="text-xs text-gray-400 hidden sm:block">{fmt(c.revenue)}đ</span>
                <span className="text-xs font-bold text-gray-900">{c.percent}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-5 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2 font-medium">Tỷ trọng tổng hợp</p>
          <div className="flex h-5 rounded-sm overflow-hidden gap-0.5">
            {categoryData.map((c, i) => (
              <div
                key={c.name}
                title={`${c.name}: ${c.percent}%`}
                className={`transition-all duration-700 cursor-pointer hover:opacity-90 ${CATEGORY_COLORS[i]}`}
                style={{ width: `${c.percent}%` }}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}