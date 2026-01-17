import { useEffect, useState } from 'react'
import { getAdminUsers } from '../../services/admin.service.js'
import Loading from '../../components/Loading/Loading.jsx'

export default function ManageUser() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    getAdminUsers().then(setUsers)
  }, [])

  if (!users) return <Loading />

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Quản lý người dùng</h2>
        <p className="mt-2 text-sm text-slate-500">Phân quyền tài khoản và quản lý hỗ trợ khách hàng.</p>
      </div>
      <div className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">Danh sách người dùng</p>
            <p className="text-xs text-slate-500">Tổng {users.length} tài khoản.</p>
          </div>
          <button className="btn btn-outline">Xuất danh sách</button>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Họ tên</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Vai trò</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-semibold text-slate-900">{user.fullName}</td>
                  <td className="px-4 py-3 text-slate-500">{user.email}</td>
                  <td className="px-4 py-3 text-slate-500">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
