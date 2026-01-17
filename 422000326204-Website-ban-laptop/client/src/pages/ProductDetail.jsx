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
  const categoryLabel = {
    laptop: 'Laptop',
    pc: 'PC',
    linhkien: 'Linh kiện'
  }[p?.category] || 'Sản phẩm'

  useEffect(() => {
    getProduct(id).then(res => setP(res.data))
  }, [id])

  if (!p) return <Loading />

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="card flex h-full items-center justify-center p-6">
        <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 via-slate-50 to-white text-slate-400">
          Hình ảnh sản phẩm
        </div>
      </div>
      <div className="card p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="badge">{categoryLabel}</span>
          <span className="text-xs text-slate-400">SKU: {p.sku}</span>
        </div>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">{p.name}</h2>
        <p className="mt-3 text-sm text-slate-600">{p.description || 'Chưa có mô tả.'}</p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-sm text-slate-500">Giá bán</p>
            <p className="text-2xl font-bold text-slate-900">{formatPrice(p.price)}</p>
          </div>
          <div className="text-right text-sm text-slate-500">
            <p>Kho: {p.stock ?? 0} sản phẩm</p>
            <p>Giao nhanh 2h (nội thành)</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="btn btn-primary" onClick={() => add(p, 1)}>Thêm vào giỏ</button>
          <button className="btn btn-outline">Yêu cầu tư vấn</button>
        </div>
      </div>
    </div>
  )
}
