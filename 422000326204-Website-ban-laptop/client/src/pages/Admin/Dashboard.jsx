export default function Dashboard() {
  const stats = [
    { label: 'Đơn hàng hôm nay', value: '18' },
    { label: 'Doanh thu', value: '320M' },
    { label: 'Sản phẩm tồn', value: '1,245' }
  ]

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Admin Dashboard</h2>
        <p className="mt-2 text-sm text-slate-500">Tổng quan hoạt động cửa hàng và hiệu suất bán hàng.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</p>
            <p className="mt-3 text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-900">Hoạt động gần đây</h3>
        <p className="mt-2 text-sm text-slate-500">Chức năng quản trị chi tiết sẽ được cập nhật ở các module.</p>
      </div>
    </div>
  )
}
