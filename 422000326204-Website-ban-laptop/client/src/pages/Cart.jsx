import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/formatPrice.js'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { items, updateQty, remove, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="card">
        <h2>Giỏ hàng</h2>
        <p>Chưa có sản phẩm nào.</p>
        <Link className="btn btn-primary" to="/products">Mua sắm</Link>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Giỏ hàng</h2>
      {items.map(x => (
        <div key={x.product.id} className="card" style={{ marginTop: 10 }}>
          <b>{x.product.name}</b>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 8 }}>
            <span>{formatPrice(x.product.price)}</span>
            <input className="input" style={{ width: 90 }} type="number" min="1"
              value={x.qty} onChange={e=>updateQty(x.product.id, Number(e.target.value))} />
            <button className="btn btn-outline" onClick={()=>remove(x.product.id)}>Xóa</button>
          </div>
        </div>
      ))}
      <h3 style={{ marginTop: 12 }}>Tổng: {formatPrice(total)}</h3>
      <Link className="btn btn-primary" to="/checkout">Thanh toán</Link>
    </div>
  )
}
