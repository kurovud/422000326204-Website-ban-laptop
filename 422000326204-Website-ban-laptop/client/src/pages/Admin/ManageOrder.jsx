import { useEffect, useState } from 'react'
import { listOrdersAdmin, updateOrderStatus } from '../../services/order.service.js'
import { formatPrice } from '../../utils/formatPrice.js'

const statuses = ['pending', 'paid', 'shipping', 'completed', 'cancelled']

export default function ManageOrder() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const load = async () => {
    setLoading(true)
    const res = await listOrdersAdmin()
    setOrders(res.data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const onUpdate = async (id, status) => {
    setRefreshing(true)
    await updateOrderStatus(id, status)
    await load()
    setRefreshing(false)
  }

  const filtered = orders.filter(o => !filter || o.status === filter)
  const summary = statuses.map((s) => ({
    label: s,
    value: orders.filter(o => o.status === s).length
  }))

  return (
    <div className="card">
      <h2>Quản lý đơn hàng</h2>
      <p className="muted">Theo dõi tiến độ, cập nhật trạng thái và hỗ trợ khách hàng.</p>

      <div className="grid" style={{ marginBottom: 12 }}>
        {summary.map((s) => (
          <div key={s.label} className="service-card">
            <div className="muted">{s.label}</div>
            <h3 style={{ margin: '6px 0 0' }}>{s.value}</h3>
          </div>
        ))}
      </div>

      <div className="row" style={{ marginBottom: 10 }}>
        <select className="input" style={{ width: 220 }} value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="btn btn-outline" onClick={load}>Làm mới</button>
      </div>

      {loading && <div className="muted">Đang tải...</div>}

      <div className="card" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr style={{ textAlign: 'left', background: '#f8fafc' }}>
              <th style={{ padding: 10 }}>Mã đơn</th>
              <th style={{ padding: 10 }}>Khách hàng</th>
              <th style={{ padding: 10 }}>Tổng tiền</th>
              <th style={{ padding: 10 }}>Trạng thái</th>
              <th style={{ padding: 10 }}>Ngày</th>
              <th style={{ padding: 10 }}>Cập nhật</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                <td style={{ padding: 10, fontWeight: 600 }}>{o.code}</td>
                <td style={{ padding: 10 }}>{o.email}</td>
                <td style={{ padding: 10 }}>{formatPrice(o.total)}</td>
                <td style={{ padding: 10 }}>
                  <span className={`status ${o.status}`}>{o.status}</span>
                </td>
                <td style={{ padding: 10 }}>{new Date(o.created_at).toLocaleString('vi-VN')}</td>
                <td style={{ padding: 10 }}>
                  <select className="input" value={o.status} onChange={e => onUpdate(o.id, e.target.value)}>
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {refreshing && <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>Đang cập nhật...</div>}
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan={6} style={{ padding: 12, color: '#64748b' }}>Không có đơn hàng.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
