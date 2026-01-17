import { useEffect, useState } from 'react'
import { getMyOrders } from '../services/order.service.js'
import Loading from '../components/Loading/Loading.jsx'

export default function OrderHistory() {
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    getMyOrders().then(setOrders)
  }, [])

  if (!orders) return <Loading />

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-slate-900">Lịch sử đơn hàng</h2>
      <p className="mt-2 text-sm text-slate-500">Theo dõi các đơn hàng gần đây của bạn.</p>
      {orders.data.length === 0 ? (
        <p className="mt-6 text-sm text-slate-600">Chưa có đơn hàng.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.data.map((o) => (
            <div key={o.id} className="rounded-2xl border border-slate-100 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <b className="text-slate-900">Đơn #{o.id}</b>
                <span className="badge">Đang xử lý</span>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                <p>Địa chỉ: {o.shippingAddress}</p>
                <p>Điện thoại: {o.phone}</p>
                <p>Số sản phẩm: {o.items?.length || 0}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
