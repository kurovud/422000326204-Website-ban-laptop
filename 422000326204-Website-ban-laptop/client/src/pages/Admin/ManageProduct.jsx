import { useEffect, useState } from 'react'
import { getProducts } from '../../services/product.service.js'
import Loading from '../../components/Loading/Loading.jsx'
import { formatPrice } from '../../utils/formatPrice.js'

export default function ManageProduct() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  if (!products) return <Loading />

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Quản lý sản phẩm</h2>
        <p className="mt-2 text-sm text-slate-500">Thêm mới, chỉnh sửa và tối ưu tồn kho.</p>
      </div>
      <div className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">Danh sách sản phẩm</p>
            <p className="text-xs text-slate-500">Tổng {products.length} sản phẩm đang hiển thị.</p>
          </div>
          <button className="btn btn-primary">Tạo sản phẩm</button>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Sản phẩm</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Danh mục</th>
                <th className="px-4 py-3">Giá</th>
                <th className="px-4 py-3">Tồn kho</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-semibold text-slate-900">{product.name}</td>
                  <td className="px-4 py-3 text-slate-500">{product.sku}</td>
                  <td className="px-4 py-3 text-slate-500">{product.category}</td>
                  <td className="px-4 py-3 text-slate-700">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3 text-slate-500">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
