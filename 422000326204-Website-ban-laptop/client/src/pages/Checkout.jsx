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
    <div className="card" style={{ maxWidth: 640, margin: '0 auto' }}>
      <h2>Thanh toán</h2>
      <p>Tổng tiền: <b>{formatPrice(total)}</b></p>

      {err && <div className="card" style={{ background: '#fff7ed' }}>{err}</div>}
      {ok && <div className="card" style={{ background: '#ecfdf5' }}>{ok}</div>}

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 10 }}>
          <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Số điện thoại" />
        </div>
        <div style={{ marginBottom: 10 }}>
          <textarea className="input" rows="3" value={address} onChange={e=>setAddress(e.target.value)} placeholder="Địa chỉ giao hàng" />
        </div>
        <button className="btn btn-primary" type="submit">Xác nhận đặt hàng</button>
      </form>
    </div>
  )
}
