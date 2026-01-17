import { useEffect, useState } from 'react'
import { getAdminOrders, getAdminUsers } from '../../services/admin.service.js'
import { getProducts } from '../../services/product.service.js'

export default function Dashboard() {
  const [stats, setStats] = useState([
    { label: 'Đơn hàng', value: '-' },
    { label: 'Khách hàng', value: '-' },
    { label: 'Sản phẩm', value: '-' }
  ])

  useEffect(() => {
    const load = async () => {
      try {
        const [orders, users, products] = await Promise.all([
          getAdminOrders(),
          getAdminUsers(),
          getProducts()
        ])
        setStats([
          { label: 'Đơn hàng', value: orders.length },
          { label: 'Khách hàng', value: users.length },
          { label: 'Sản phẩm', value: products.length }
        ])
      } catch (err) {
        setStats([
          { label: 'Đơn hàng', value: 'N/A' },
          { label: 'Khách hàng', value: 'N/A' },
          { label: 'Sản phẩm', value: 'N/A' }
        ])
      }
    }
    load()
  }, [])

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
        <p className="mt-2 text-sm text-slate-500">Dữ liệu được cập nhật từ hệ thống đơn hàng và khách hàng.</p>
      </div>
    </div>
  )
}
