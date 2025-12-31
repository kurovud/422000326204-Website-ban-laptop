import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'

export default function Header() {
  const { user, logout } = useAuth()
  const { count } = useCart()

  return (
    <header style={{ background: 'rgba(255,255,255,0.95)', borderBottom: '1px solid rgba(15,23,42,0.08)', position: 'sticky', top: 0, zIndex: 20, backdropFilter: 'blur(14px)', boxShadow: '0 10px 32px rgba(15,23,42,0.16)' }}>
      <div className="container nav">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div className="pill">TechShop Pro</div>
            <span className="muted">Laptop • PC • Build</span>
          </Link>
          <div className="nav-links">
            <Link to="/products">Sản phẩm</Link>
            <a href="#builder">Build PC</a>
            <a href="#support">Hỗ trợ</a>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link to="/cart" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span>Giỏ hàng</span>
            <span className="badge">{count}</span>
          </Link>
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
              <Link to="/register" className="btn btn-primary">Tạo tài khoản</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
