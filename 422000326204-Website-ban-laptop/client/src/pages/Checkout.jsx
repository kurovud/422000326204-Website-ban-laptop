import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { createOrder } from '../services/order.service.js'
import { Link, useNavigate } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Checkout() {
  const { items, total, clear } = useCart()
  const { user } = useAuth()
  const nav = useNavigate()
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [err, setErr] = useState('')
  const [ok, setOk] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!items.length && !ok) nav('/cart')
  }, [items, nav, ok])

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr(''); setOk('')
    if (!items.length) {
      setErr('Giỏ hàng trống, vui lòng chọn sản phẩm.')
      return
    }
    if (!phone.trim() || !address.trim()) {
      setErr('Vui lòng nhập số điện thoại và địa chỉ giao hàng.')
      return
    }
    setSubmitting(true)
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
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="card" style={{ maxWidth: 640, margin: '0 auto' }}>
      <h2>Thanh toán</h2>
      <p>
        <span className="muted">Khách hàng:</span> <b>{user?.email}</b>
      </p>
      <p>Tổng tiền: <b>{formatPrice(total)}</b></p>

      {err && <div className="card" style={{ background: '#fff7ed' }}>{err}</div>}
      {ok && <div className="card" style={{ background: '#ecfdf5' }}>{ok}</div>}

      <div className="card" style={{ margin: '12px 0', background: '#f8fafc' }}>
        <h4 style={{ margin: '0 0 8px' }}>Thông tin sản phẩm</h4>
        {!items.length && <p className="muted">Giỏ hàng đang trống.</p>}
        {items.map(x => (
          <div key={x.product.id} className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
            <div>
              <b>{x.product.name}</b>
              <div className="muted">x{x.qty}</div>
            </div>
            <div>{formatPrice(Number(x.product.price) * x.qty)}</div>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 10 }}>
          <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Số điện thoại" required />
        </div>
        <div style={{ marginBottom: 10 }}>
          <textarea className="input" rows="3" value={address} onChange={e=>setAddress(e.target.value)} placeholder="Địa chỉ giao hàng" required />
        </div>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/cart" className="btn btn-outline">Quay lại giỏ hàng</Link>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
          </button>
        </div>
      </form>
    </div>
  )
}
