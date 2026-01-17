export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container grid gap-6 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">TS</span>
            TechShop
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Chuyên laptop, PC build và linh kiện chính hãng. Giao hàng toàn quốc, hỗ trợ kỹ thuật 24/7.
          </p>
        </div>
        <div className="text-sm text-slate-600">
          <h4 className="font-semibold text-slate-800">Danh mục</h4>
          <ul className="mt-2 space-y-2">
            <li>Laptop văn phòng & gaming</li>
            <li>PC build theo yêu cầu</li>
            <li>Linh kiện & phụ kiện</li>
          </ul>
        </div>
        <div className="text-sm text-slate-600">
          <h4 className="font-semibold text-slate-800">Liên hệ</h4>
          <ul className="mt-2 space-y-2">
            <li>Hotline: 1900 1234</li>
            <li>Email: support@techshop.vn</li>
            <li>Giờ làm việc: 8:00 - 21:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} TechShop - Laptop, PC, Linh kiện Build PC
      </div>
    </footer>
  )
}
