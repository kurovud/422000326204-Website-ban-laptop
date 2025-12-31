import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'

export default function Header() {
  const { user, logout } = useAuth()
  const { count } = useCart()

  return (
    <header className="card" style={{ borderRadius: 0 }}>
      <div className="container nav">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link to="/"><b>TechShop</b></Link>
          <Link to="/products">Sản phẩm</Link>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link to="/cart">Giỏ hàng <span className="badge">{count}</span></Link>
          {user ? (
            <>
              <span className="badge">{user.email} ({user.role})</span>
              <Link to="/orders">Đơn hàng</Link>
              {user.role === 'admin' && <Link to="/admin">Admin</Link>}
              <button className="btn btn-outline" onClick={logout}>Đăng xuất</button>
            </>
          ) : (
            <>
              <Link to="/login">Đăng nhập</Link>
              <Link to="/register">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
