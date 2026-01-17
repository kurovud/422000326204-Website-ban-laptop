import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/formatPrice.js'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { items, updateQty, remove, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="card p-6 text-center">
        <h2 className="text-xl font-semibold text-slate-900">Giỏ hàng trống</h2>
        <p className="mt-2 text-sm text-slate-600">Chưa có sản phẩm nào trong giỏ.</p>
        <Link className="btn btn-primary mt-4" to="/products">Mua sắm ngay</Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Giỏ hàng của bạn</h2>
        <div className="mt-4 space-y-4">
          {items.map((x) => (
            <div key={x.product.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 p-4">
              <div>
                <p className="font-semibold text-slate-900">{x.product.name}</p>
                <p className="text-sm text-slate-500">{formatPrice(x.product.price)}</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  className="input w-20"
                  type="number"
                  min="1"
                  value={x.qty}
                  onChange={(e) => updateQty(x.product.id, Number(e.target.value))}
                />
                <button className="btn btn-outline" onClick={() => remove(x.product.id)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-900">Tóm tắt đơn hàng</h3>
        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>Tạm tính</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between">
            <span>Phí vận chuyển</span>
            <span>Miễn phí</span>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-semibold text-slate-900">
            <span>Tổng cộng</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
        <Link className="btn btn-primary mt-6 w-full" to="/checkout">Thanh toán</Link>
      </div>
    </div>
  )
}
