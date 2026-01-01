import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const adminLinks = [
  { to: '/admin', label: 'Dashboard', roles: ['admin'] },
  { to: '/admin/inventory', label: 'Quản lý hàng hóa', roles: ['admin', 'staff'] },
  { to: '/admin/orders', label: 'Đơn hàng', roles: ['admin'] },
  { to: '/admin/users', label: 'Người dùng', roles: ['admin'] },
]

export default function AdminLayout({ title, subtitle, children }) {
  const { user } = useAuth()
  const links = adminLinks.filter(l => !l.roles || l.roles.includes(user?.role))

  return (
    <div className="admin-shell">
      <div className="card admin-topbar">
        <div>
          <p className="muted" style={{ margin: '0 0 4px' }}>Khu vực quản trị TechShop</p>
          <h2 style={{ margin: 0 }}>{title || 'Bảng điều khiển'}</h2>
          {subtitle && <p className="muted" style={{ margin: '6px 0 0' }}>{subtitle}</p>}
        </div>
        {user && (
          <div className="badge">Đăng nhập: {user.email} ({user.role})</div>
        )}
      </div>

      <div className="card admin-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => isActive ? 'admin-link active' : 'admin-link'}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="admin-content">
        {children}
      </div>
    </div>
  )
}
