import { useEffect, useState } from 'react'
import { getAdminOrders } from '../../services/admin.service.js'
import Loading from '../../components/Loading/Loading.jsx'

export default function ManageOrder() {
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    getAdminOrders().then(setOrders)
  }, [])

  if (!orders) return <Loading />

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
            <p className="text-xs text-slate-500">Tổng {orders.length} đơn hàng.</p>
          </div>
          <button className="btn btn-outline">Lọc trạng thái</button>
        </div>
        <div className="mt-4 grid gap-4">
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
              Chưa có đơn hàng nào.
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-slate-100 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900">Đơn #{order.id}</p>
                  <span className="badge">Đang xử lý</span>
                </div>
                <div className="mt-2 text-sm text-slate-600">
                  <p>Khách hàng: #{order.userId}</p>
                  <p>Điện thoại: {order.phone}</p>
                  <p>Địa chỉ: {order.shippingAddress}</p>
                  <p>Sản phẩm: {order.items?.length || 0}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
