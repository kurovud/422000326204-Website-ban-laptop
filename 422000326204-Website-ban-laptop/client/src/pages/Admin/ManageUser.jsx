import { useEffect, useState } from 'react'
import { listUsers } from '../../services/user.service.js'
import AdminLayout from '../../components/Admin/AdminLayout.jsx'

export default function ManageUser() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const res = await listUsers()
      setUsers(res.data || [])
      setMessage(null)
    } catch (e) {
      setMessage({ type: 'error', text: 'Không tải được danh sách người dùng' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    active: users.filter(u => u.is_active).length,
  }

  return (
    <AdminLayout
      title="Quản lý người dùng"
      subtitle="Theo dõi tài khoản, vai trò và trạng thái hoạt động."
    >
      {message && <div className={`alert ${message.type}`}>{message.text}</div>}
      <div className="row" style={{ marginBottom: 10, alignItems: 'center' }}>
        <div className="chip">Tổng: {stats.total}</div>
        <div className="chip">Admin: {stats.admins}</div>
        <div className="chip">Hoạt động: {stats.active}</div>
        <button className="btn btn-outline" onClick={load} disabled={loading}>Làm mới</button>
      </div>
      {loading && <div className="muted">Đang tải...</div>}

      <div className="card" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr style={{ textAlign: 'left', background: '#f8fafc' }}>
              <th style={{ padding: 10 }}>Email</th>
              <th style={{ padding: 10 }}>Tên</th>
              <th style={{ padding: 10 }}>Vai trò</th>
              <th style={{ padding: 10 }}>Kích hoạt</th>
              <th style={{ padding: 10 }}>Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                <td style={{ padding: 10 }}>{u.email}</td>
                <td style={{ padding: 10 }}>{u.full_name}</td>
                <td style={{ padding: 10 }}><span className="badge">{u.role}</span></td>
                <td style={{ padding: 10 }}>{u.is_active ? 'Hoạt động' : 'Khoá'}</td>
                <td style={{ padding: 10 }}>{new Date(u.created_at).toLocaleDateString('vi-VN')}</td>
              </tr>
            ))}
            {!users.length && (
              <tr>
                <td colSpan={5} style={{ padding: 12, color: '#64748b' }}>Chưa có người dùng.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
