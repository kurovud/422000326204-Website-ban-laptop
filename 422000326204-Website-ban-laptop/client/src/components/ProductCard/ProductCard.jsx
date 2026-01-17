import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatPrice.js'

export default function ProductCard({ p }) {
  const categoryLabel = {
    laptop: 'Laptop',
    pc: 'PC',
    linhkien: 'Linh kiện'
  }[p.category] || 'Sản phẩm'

  return (
    <div className="card flex h-full flex-col p-4">
      <div className="flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 via-slate-50 to-white text-slate-400">
        Ảnh sản phẩm
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-900">{p.name}</h3>
        <span className="badge">{categoryLabel}</span>
      </div>
      <div className="mt-2 text-base font-bold text-slate-900">{formatPrice(p.price)}</div>
      <p className="mt-2 text-sm text-slate-500">{p.description || 'Cấu hình tối ưu cho hiệu năng ổn định.'}</p>
      <div className="mt-auto flex gap-2 pt-4">
        <Link className="btn btn-outline flex-1" to={`/products/${p.id}`}>Chi tiết</Link>
        <Link className="btn btn-primary flex-1" to={`/products/${p.id}`}>Mua</Link>
      </div>
    </div>
  )
}
