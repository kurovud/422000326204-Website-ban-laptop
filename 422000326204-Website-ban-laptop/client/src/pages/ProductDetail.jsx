import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../services/product.service.js'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/formatPrice.js'
import Loading from '../components/Loading/Loading.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const [p, setP] = useState(null)
  const { add } = useCart()

  useEffect(() => {
    getProduct(id).then(res => setP(res.data))
  }, [id])

  if (!p) return <Loading />

  return (
    <div className="card">
      <h2>{p.name}</h2>
      <div className="badge">{p.type} • SKU: {p.sku}</div>
      <h3 style={{ marginTop: 10 }}>{formatPrice(p.price)}</h3>
      <p style={{ whiteSpace: 'pre-wrap' }}>{p.description || 'Chưa có mô tả.'}</p>
      <button className="btn btn-primary" onClick={() => add(p, 1)}>Thêm vào giỏ</button>
    </div>
  )
}
