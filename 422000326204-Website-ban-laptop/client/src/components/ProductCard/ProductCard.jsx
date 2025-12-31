import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatPrice.js'

export default function ProductCard({ p }) {
  return (
    <div className="card" style={{ width: 260 }}>
      <div style={{ height: 140, background: '#f3f4f6', borderRadius: 10, marginBottom: 10 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <b style={{ fontSize: 14 }}>{p.name}</b>
        <span className="badge">{p.type}</span>
      </div>
      <div style={{ marginTop: 8 }}>{formatPrice(p.price)}</div>
      <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
        <Link className="btn btn-outline" to={`/products/${p.id}`}>Chi tiết</Link>
        <Link className="btn btn-primary" to={`/products/${p.id}`}>Mua</Link>
      </div>
    </div>
  )
}
