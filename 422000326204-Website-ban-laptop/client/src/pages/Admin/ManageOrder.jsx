export default function ManageOrder() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Quản lý đơn hàng</h2>
        <p className="mt-2 text-sm text-slate-500">Theo dõi trạng thái, xử lý giao hàng và đổi trả.</p>
      </div>
      <div className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">Danh sách đơn hàng</p>
            <p className="text-xs text-slate-500">Kết nối API để hiển thị trạng thái thực tế.</p>
          </div>
          <button className="btn btn-outline">Lọc trạng thái</button>
        </div>
      </div>
    </div>
  )
}
