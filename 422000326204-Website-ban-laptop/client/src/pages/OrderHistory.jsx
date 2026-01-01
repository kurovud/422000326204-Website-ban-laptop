import { useEffect, useState } from 'react'
import { getMyOrders } from '../services/order.service.js'
import Loading from '../components/Loading/Loading.jsx'
import { formatPrice } from '../utils/formatPrice.js'

export default function OrderHistory() {
  const [orders, setOrders] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch((e) => {
        setError(e?.response?.data?.message || 'Không tải được lịch sử đơn hàng. Vui lòng đăng nhập lại.')
        setOrders({ data: [] })
      })
  }, [])

  if (!orders) return <Loading />

  return (
    <div className="card">
      <h2>Lịch sử đơn hàng</h2>
      {error && <div className="alert error">{error}</div>}
      {orders.data.length === 0 ? <p>Chưa có đơn hàng.</p> : orders.data.map(o => (
        <div key={o.id} className="card" style={{ marginTop: 10 }}>
          <div style={{ display:'flex', justifyContent:'space-between', gap: 10 }}>
            <b>#{o.code}</b>
            <span className="badge">{o.status}</span>
          </div>
          <div style={{ marginTop: 6 }}>Tổng: {formatPrice(o.total)}</div>
          <div className="muted" style={{ marginTop: 4 }}>
            Giao tới: {o.shipping_address} • {o.phone}
          </div>
          {!!o.items?.length && (
            <ul style={{ marginTop: 6, paddingLeft: 18, color: '#334155' }}>
              {o.items.map((it) => (
                <li key={`${o.id}-${it.productId}-${it.qty}`}>
                  {it.name} x{it.qty} — {formatPrice(Number(it.price) * Number(it.qty))}
                </li>
              ))}
            </ul>
          )}
          <div style={{ marginTop: 6, opacity: .8 }}><small>{new Date(o.created_at).toLocaleString('vi-VN')}</small></div>
        </div>
      ))}
    </div>
  )
}
