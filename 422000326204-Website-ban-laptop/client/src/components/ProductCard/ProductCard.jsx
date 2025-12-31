import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatPrice.js'

export default function ProductCard({ p }) {
  return (
    <div className="product-card">
      <div className="product-media">{p.type.toUpperCase()}</div>
      <div className="product-meta" style={{ marginTop: 8 }}>
        <b style={{ fontSize: 15, flex: 1 }}>{p.name}</b>
        <span className="badge">{p.type}</span>
      </div>
      <div className="muted" style={{ marginTop: 4 }}>SKU: {p.sku}</div>
      <div className="price" style={{ marginTop: 6 }}>{formatPrice(p.price)}</div>
      <div className="row" style={{ marginTop: 10 }}>
        <Link className="btn btn-outline" to={`/products/${p.id}`}>Chi tiết</Link>
        <Link className="btn btn-primary" to={`/products/${p.id}`}>Thêm vào giỏ</Link>
      </div>
    </div>
  )
}
