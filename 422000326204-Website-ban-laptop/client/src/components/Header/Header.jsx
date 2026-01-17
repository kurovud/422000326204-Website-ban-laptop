import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'

export default function Header() {
  const { user, logout } = useAuth()
  const { count } = useCart()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">TS</span>
            TechShop
          </Link>
          <Link to="/products" className="text-sm font-semibold text-slate-600 hover:text-slate-900">Sản phẩm</Link>
          <Link to="/products" className="text-sm text-slate-500 hover:text-slate-800">Laptop</Link>
          <Link to="/products" className="text-sm text-slate-500 hover:text-slate-800">PC</Link>
          <Link to="/products" className="text-sm text-slate-500 hover:text-slate-800">Linh kiện</Link>
          <Link to="/chatbot" className="text-sm text-slate-500 hover:text-slate-800">Chatbot</Link>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Link to="/cart" className="flex items-center gap-2 font-semibold text-slate-700 hover:text-slate-900">
            Giỏ hàng <span className="badge">{count}</span>
          </Link>
          {user ? (
            <>
              <span className="badge">{user.email} · {user.role}</span>
              <Link to="/orders" className="font-semibold text-slate-600 hover:text-slate-900">Đơn hàng</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="font-semibold text-slate-600 hover:text-slate-900">Admin</Link>
              )}
              <button className="btn btn-outline" onClick={logout}>Đăng xuất</button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-semibold text-slate-600 hover:text-slate-900">Đăng nhập</Link>
              <Link to="/register" className="btn btn-primary">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
