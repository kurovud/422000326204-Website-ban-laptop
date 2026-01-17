import { useEffect, useState } from 'react'
import { getProducts } from '../services/product.service.js'
import ProductCard from '../components/ProductCard/ProductCard.jsx'
import Loading from '../components/Loading/Loading.jsx'

export default function ProductList() {
  const [items, setItems] = useState(null)
  const [q, setQ] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    getProducts({ q, type }).then(setItems)
  }, [q, type])

  if (!items) return <Loading />

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tìm kiếm</label>
            <input
              className="input mt-2"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Nhập tên sản phẩm hoặc SKU..."
            />
          </div>
          <div className="min-w-[200px]">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Danh mục</label>
            <select className="input mt-2" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Tất cả</option>
              <option value="laptop">Laptop</option>
              <option value="pc">PC</option>
              <option value="linhkien">Linh kiện</option>
            </select>
          </div>
          <div className="flex min-w-[200px] flex-col items-start">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Kết quả</span>
            <span className="mt-2 text-sm text-slate-600">{items.length} sản phẩm</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  )
}
