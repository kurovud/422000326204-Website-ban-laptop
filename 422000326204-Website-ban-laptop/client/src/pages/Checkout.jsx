import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { createOrder } from '../services/order.service.js'
import { useNavigate } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice.js'

export default function Checkout() {
  const { items, total, clear } = useCart()
  const nav = useNavigate()
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [err, setErr] = useState('')
  const [ok, setOk] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr(''); setOk('')
    try {
      const payload = {
        shippingAddress: address,
        phone,
        items: items.map(x => ({ productId: x.product.id, qty: x.qty }))
      }
      await createOrder(payload)
      clear()
      setOk('Đặt hàng thành công!')
      setTimeout(()=>nav('/orders'), 700)
    } catch (e) {
      setErr(e?.response?.data?.message || 'Thanh toán thất bại')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.6fr]">
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Thông tin thanh toán</h2>

        {err && <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{err}</div>}
        {ok && <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">{ok}</div>}

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Số điện thoại</label>
            <input className="input mt-2" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="090..." />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Địa chỉ giao hàng</label>
            <textarea
              className="input mt-2"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Số nhà, đường, quận/huyện..."
            />
          </div>
          <button className="btn btn-primary" type="submit">Xác nhận đặt hàng</button>
        </form>
      </div>
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-900">Tóm tắt thanh toán</h3>
        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>Số sản phẩm</span>
            <span>{items.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Tạm tính</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between">
            <span>Ưu đãi</span>
            <span>0₫</span>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-semibold text-slate-900">
            <span>Tổng cộng</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
