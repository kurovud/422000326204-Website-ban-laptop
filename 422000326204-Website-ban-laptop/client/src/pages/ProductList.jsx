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
    <div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="row">
          <input className="input" style={{ flex: 1 }} value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm kiếm (tên/sku)..." />
          <select className="input" style={{ width: 220 }} value={type} onChange={e=>setType(e.target.value)}>
            <option value="">Tất cả</option>
            <option value="laptop">Laptop</option>
            <option value="pc">PC</option>
            <option value="component">Linh kiện</option>
          </select>
        </div>
      </div>

      <div className="row">
        {items.data.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}
