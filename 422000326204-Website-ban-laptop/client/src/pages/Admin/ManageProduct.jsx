export default function ManageProduct() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Quản lý sản phẩm</h2>
        <p className="mt-2 text-sm text-slate-500">Thêm mới, chỉnh sửa và tối ưu tồn kho.</p>
      </div>
      <div className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">Danh sách sản phẩm</p>
            <p className="text-xs text-slate-500">Đang chờ kết nối dữ liệu thực tế.</p>
          </div>
          <button className="btn btn-primary">Tạo sản phẩm</button>
        </div>
      </div>
    </div>
  )
}
