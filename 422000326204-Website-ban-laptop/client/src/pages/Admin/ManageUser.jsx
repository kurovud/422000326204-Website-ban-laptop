import { useEffect, useState } from 'react'
import { listUsers, updateUser } from '../../services/user.service.js'
import AdminLayout from '../../components/Admin/AdminLayout.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'staff', label: 'Staff' },
  { value: 'user', label: 'User' },
]

export default function ManageUser() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(null)
  const [message, setMessage] = useState(null)
  const { user: currentUser } = useAuth()

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

  const onUpdate = async (id, payload) => {
    setSaving(id)
    try {
      await updateUser(id, payload)
      setMessage({ type: 'success', text: 'Đã cập nhật người dùng' })
      await load()
    } catch (e) {
      setMessage({ type: 'error', text: e?.response?.data?.message || 'Cập nhật thất bại' })
    } finally {
      setSaving(null)
    }
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
              <th style={{ padding: 10, width: 140 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const isSelf = currentUser?.id === u.id
              const disableRow = isSelf && u.role === 'admin'
              return (
                <tr key={u.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                  <td style={{ padding: 10 }}>{u.email}</td>
                  <td style={{ padding: 10 }}>{u.full_name}</td>
                  <td style={{ padding: 10 }}>
                    <select
                      className="input"
                      value={u.role}
                      disabled={disableRow}
                      onChange={(e) => onUpdate(u.id, { role: e.target.value, isActive: u.is_active })}
                    >
                      {roleOptions.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: 10 }}>
                    <select
                      className="input"
                      value={u.is_active ? 'active' : 'inactive'}
                      disabled={disableRow}
                      onChange={(e) => onUpdate(u.id, { role: u.role, isActive: e.target.value === 'active' })}
                    >
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Khóa</option>
                    </select>
                  </td>
                  <td style={{ padding: 10 }}>{new Date(u.created_at).toLocaleDateString('vi-VN')}</td>
                  <td style={{ padding: 10 }}>
                    {saving === u.id && <span className="muted">Đang lưu...</span>}
                    {disableRow && <div className="muted" style={{ fontSize: 12 }}>Không thể tự khoá tài khoản admin</div>}
                  </td>
                </tr>
              )
            })}
            {!users.length && (
              <tr>
                <td colSpan={6} style={{ padding: 12, color: '#64748b' }}>Chưa có người dùng.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
