export default function ManageUser() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Quản lý người dùng</h2>
        <p className="mt-2 text-sm text-slate-500">Phân quyền tài khoản và quản lý hỗ trợ khách hàng.</p>
      </div>
      <div className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">Danh sách người dùng</p>
            <p className="text-xs text-slate-500">Sẵn sàng kết nối dữ liệu thật.</p>
          </div>
          <button className="btn btn-outline">Xuất danh sách</button>
        </div>
      </div>
    </div>
  )
}
