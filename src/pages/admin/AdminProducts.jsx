import React, { useState, useEffect } from "react";
import { Search, Plus, Pencil, Trash2, X, Check, Package, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { productService } from "../../services/productService"; 

const EMPTY_FORM = { name: "", category: "", price: "", stock: "", status: "Đang bán", image: "" };
const fmt = (n) => Number(n).toLocaleString("vi-VN");
const PAGE_SIZE = 8;

export default function AdminProducts() {
  // 1. CÁC STATE QUẢN LÝ DỮ LIỆU VÀ TRẠNG THÁI MẠNG
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái chờ load dữ liệu
  const [isSaving, setIsSaving] = useState(false);  // Trạng thái chờ lưu (thêm/sửa/xóa)

  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("Tất cả");
  const [modal, setModal] = useState(null); // null | "add" | "edit" | "delete"
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [page, setPage] = useState(1);
  const [saveOk, setSaveOk] = useState(false);

  // 2. GỌI DỮ LIỆU KHI VÀO TRANG (MÔ PHỎNG FETCH API)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        setCategories(productService.getCategories());
        EMPTY_FORM.category = productService.getCategories()[0];
        
        const data = await productService.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // 3. LOGIC LỌC VÀ PHÂN TRANG
  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "Tất cả" || p.category === filterCat;
    return matchSearch && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // 4. CÁC HÀM MỞ MODAL
  const openAdd = () => { setForm({ ...EMPTY_FORM, category: categories[0] }); setModal("add"); };
  const openEdit = (p) => { setSelected(p); setForm({ ...p }); setModal("edit"); };
  const openDelete = (p) => { setSelected(p); setModal("delete"); };
  const closeModal = () => { if(!isSaving) { setModal(null); setSelected(null); setSaveOk(false); } };

  const setF = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // 5. GỌI API LƯU DỮ LIỆU (THÊM / SỬA)
  const handleSave = async () => {
    if (!form.name || !form.price || !form.stock) return;
    setIsSaving(true);
    
    try {
      if (modal === "add") {
        await productService.add(form);
      } else {
        await productService.update(selected.id, form);
      }
      // Load lại danh sách mới nhất
      const newData = await productService.getAll();
      setProducts(newData);
      
      setSaveOk(true);
      setTimeout(closeModal, 800);
    } catch (error) {
      console.error("Lỗi lưu:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // 6. GỌI API XÓA DỮ LIỆU
  const handleDelete = async () => {
    setIsSaving(true);
    try {
      await productService.delete(selected.id);
      const newData = await productService.getAll();
      setProducts(newData);
      closeModal();
    } catch (error) {
      console.error("Lỗi xóa:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Sản phẩm</h1>
          <p className="text-xs text-gray-400 mt-0.5">{products.length} sản phẩm trong kho</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#DB4444] text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-colors shadow-sm"
        >
          <Plus size={16} /> Thêm sản phẩm
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-sm border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Tìm tên sản phẩm..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#DB4444] transition-colors"
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => { setFilterCat(e.target.value); setPage(1); }}
          className="px-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#DB4444] bg-white"
        >
          <option>Tất cả</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden relative min-h-[400px]">
        {/* HIỆU ỨNG LOADING */}
        {isLoading ? (
          <div className="absolute inset-0 z-10 bg-white/80 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-[#DB4444] mb-2" size={32} />
            <span className="text-sm text-gray-500 font-medium">Đang tải dữ liệu...</span>
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Sản phẩm</th>
                <th className="text-left px-5 py-3 font-semibold">Danh mục</th>
                <th className="text-left px-5 py-3 font-semibold">Giá</th>
                <th className="text-left px-5 py-3 font-semibold">Tồn kho</th>
                <th className="text-left px-5 py-3 font-semibold">Trạng thái</th>
                <th className="px-5 py-3 text-right font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && paged.length === 0 && (
                <tr><td colSpan={6} className="text-center py-16 text-gray-400">
                  <Package size={32} className="mx-auto mb-2 opacity-40" />
                  Không tìm thấy sản phẩm nào
                </td></tr>
              )}
              {paged.map((p) => (
                <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-sm object-cover bg-gray-100 flex-shrink-0" />
                      <span className="font-medium text-gray-900 line-clamp-1">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{p.category}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{fmt(p.price)}đ</td>
                  <td className="px-5 py-3.5">
                    <span className={`font-semibold ${p.stock < 20 ? "text-red-500" : "text-gray-900"}`}>
                      {p.stock}
                    </span>
                    {p.stock < 20 && <span className="ml-1.5 text-[10px] text-red-400">Sắp hết</span>}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-semibold px-2 py-1 rounded-full ${p.status === "Đang bán" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-sm transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => openDelete(p)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 text-xs text-gray-500">
            <span>Trang {page} / {totalPages} ({filtered.length} kết quả)</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="p-1.5 rounded-sm border border-gray-200 text-gray-500 disabled:opacity-40 hover:border-[#DB4444] hover:text-[#DB4444] transition-colors">
                <ChevronLeft size={14} />
              </button>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="p-1.5 rounded-sm border border-gray-200 text-gray-500 disabled:opacity-40 hover:border-[#DB4444] hover:text-[#DB4444] transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── MODAL THÊM / SỬA ─────────────────────────────────────── */}
      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">{modal === "add" ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}</h3>
              <button onClick={closeModal} disabled={isSaving} className="text-gray-400 hover:text-gray-700 disabled:opacity-50"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {[
                { label: "Tên sản phẩm *", key: "name", type: "text", placeholder: "Nhập tên sản phẩm" },
                { label: "Giá (đ) *", key: "price", type: "number", placeholder: "500000" },
                { label: "Tồn kho *", key: "stock", type: "number", placeholder: "50" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
                  <input type={type} value={form[key]} onChange={setF(key)} placeholder={placeholder} disabled={isSaving}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#DB4444] disabled:bg-gray-50 transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Danh mục</label>
                <select value={form.category} onChange={setF("category")} disabled={isSaving}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#DB4444] bg-white disabled:bg-gray-50">
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Trạng thái</label>
                <select value={form.status} onChange={setF("status")} disabled={isSaving}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#DB4444] bg-white disabled:bg-gray-50">
                  <option>Đang bán</option>
                  <option>Ẩn</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
              {saveOk && <span className="flex items-center gap-1 text-sm text-green-600 font-medium"><Check size={14} /> Đã lưu!</span>}
              <button onClick={closeModal} disabled={isSaving} className="px-5 py-2 border border-gray-200 text-gray-700 text-sm rounded-sm hover:bg-gray-50 disabled:opacity-50 transition-colors">Huỷ</button>
              <button onClick={handleSave} disabled={isSaving} className="px-5 py-2 bg-[#DB4444] text-white text-sm rounded-sm hover:bg-red-600 disabled:opacity-70 transition-colors font-medium shadow-sm flex items-center gap-2">
                {isSaving && <Loader2 size={14} className="animate-spin" />}
                {modal === "add" ? "Thêm mới" : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL XÓA ────────────────────────────────────────────── */}
      {modal === "delete" && selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl w-full max-w-sm">
            <div className="p-6 text-center">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-[#DB4444]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Xoá sản phẩm?</h3>
              <p className="text-sm text-gray-500">Bạn có chắc muốn xoá <span className="font-medium text-gray-900">"{selected.name}"</span>? Hành động này không thể hoàn tác.</p>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={closeModal} disabled={isSaving} className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm rounded-sm hover:bg-gray-50 disabled:opacity-50 transition-colors">Huỷ</button>
              <button onClick={handleDelete} disabled={isSaving} className="flex-1 py-2.5 bg-[#DB4444] text-white text-sm rounded-sm hover:bg-red-600 disabled:opacity-70 transition-colors font-medium flex justify-center items-center gap-2">
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : "Xoá"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}