import { useEffect, useMemo, useState } from 'react'
import { listOrdersAdmin } from '../../services/order.service.js'
import { getProducts } from '../../services/product.service.js'
import { listUsers } from '../../services/user.service.js'
import { formatPrice } from '../../utils/formatPrice.js'
import AdminLayout from '../../components/Admin/AdminLayout.jsx'

export default function Dashboard() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [updatedAt, setUpdatedAt] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [o, p, u] = await Promise.all([
          listOrdersAdmin(),
          getProducts(),
          listUsers()
        ])
        setOrders(o.data || [])
        setProducts(p.data || [])
        setUsers(u.data || [])
        setUpdatedAt(new Date())
        setError(null)
      } catch (e) {
        setError('Không tải được dữ liệu dashboard')
      }
    }
    load()
  }, [])

  const revenue = useMemo(() => orders.reduce((sum, o) => sum + Number(o.total), 0), [orders])
  const pending = useMemo(() => orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length, [orders])
  const stockLow = useMemo(() => products.filter(p => p.stock < 5).length, [products])

  const cards = [
    { title: 'Tổng doanh thu (lũy kế)', value: formatPrice(revenue) },
    { title: 'Đơn cần xử lý', value: pending },
    { title: 'Sản phẩm tồn kho thấp (<5)', value: stockLow },
    { title: 'Người dùng', value: users.length },
  ]

  const quickFilters = [
    { label: 'Đơn mới nhất', hint: 'Theo dõi 8 đơn gần nhất' },
    { label: 'Tồn kho thấp', hint: `${stockLow} sản phẩm <5 tồn` },
    { label: 'Hiệu quả doanh thu', hint: 'Tính toán tổng lũy kế' },
  ]

  return (
    <AdminLayout
      title="Trang quản trị TechShop"
      subtitle="Theo dõi sức khoẻ vận hành, trạng thái đơn hàng và sản phẩm."
    >
      {error && <div className="alert error">{error}</div>}
      {updatedAt && <div className="alert info">Cập nhật lúc: {updatedAt.toLocaleString('vi-VN')}</div>}

      <div className="grid">
        {cards.map((c) => (
          <div key={c.title} className="service-card">
            <div className="muted">{c.title}</div>
            <h3 style={{ margin: '6px 0 0' }}>{c.value}</h3>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <div className="section-header">
          <div>
            <h4 style={{ margin: 0 }}>Nhật ký đơn hàng mới</h4>
            <p className="section-sub">Realtime từ API /orders</p>
          </div>
          <div className="row" style={{ gap: 8 }}>
            {quickFilters.map((f) => (
              <span key={f.label} className="chip">{f.label} · {f.hint}</span>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr style={{ textAlign: 'left', background: '#f8fafc' }}>
                <th style={{ padding: 10 }}>Mã đơn</th>
                <th style={{ padding: 10 }}>Khách</th>
                <th style={{ padding: 10 }}>Tổng</th>
                <th style={{ padding: 10 }}>Trạng thái</th>
                <th style={{ padding: 10 }}>Ngày</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 8).map((o) => (
                <tr key={o.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                  <td style={{ padding: 10 }}>{o.code}</td>
                  <td style={{ padding: 10 }}>{o.email}</td>
                  <td style={{ padding: 10 }}>{formatPrice(o.total)}</td>
                  <td style={{ padding: 10 }}><span className="badge">{o.status}</span></td>
                  <td style={{ padding: 10 }}>{new Date(o.created_at).toLocaleString('vi-VN')}</td>
                </tr>
              ))}
              {!orders.length && (
                <tr><td colSpan={5} style={{ padding: 12, color: '#64748b' }}>Chưa có đơn hàng.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
