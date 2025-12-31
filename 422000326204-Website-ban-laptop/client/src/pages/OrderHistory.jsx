import { useEffect, useState } from 'react'
import { getMyOrders } from '../services/order.service.js'
import Loading from '../components/Loading/Loading.jsx'
import { formatPrice } from '../utils/formatPrice.js'

export default function OrderHistory() {
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    getMyOrders().then(setOrders)
  }, [])

  if (!orders) return <Loading />

  return (
    <div className="card">
      <h2>Lịch sử đơn hàng</h2>
      {orders.data.length === 0 ? <p>Chưa có đơn hàng.</p> : orders.data.map(o => (
        <div key={o.id} className="card" style={{ marginTop: 10 }}>
          <div style={{ display:'flex', justifyContent:'space-between', gap: 10 }}>
            <b>#{o.code}</b>
            <span className="badge">{o.status}</span>
          </div>
          <div style={{ marginTop: 6 }}>Tổng: {formatPrice(o.total)}</div>
          <div style={{ marginTop: 6, opacity: .8 }}><small>{new Date(o.created_at).toLocaleString('vi-VN')}</small></div>
        </div>
      ))}
    </div>
  )
}
