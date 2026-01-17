import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const { register } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [err, setErr] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      await register({ email, password, fullName })
      nav('/')
    } catch (e) {
      setErr(e?.response?.data?.message || 'Đăng ký thất bại')
    }
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="card flex flex-col justify-between bg-slate-900 p-6 text-white">
        <div>
          <h3 className="text-xl font-semibold">Tạo tài khoản TechShop</h3>
          <p className="mt-2 text-sm text-slate-200">
            Lưu cấu hình yêu thích, theo dõi đơn hàng và nhận tư vấn chuyên sâu.
          </p>
        </div>
        <div className="mt-6 space-y-3 text-sm text-slate-200">
          <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
            <span>Miễn phí tư vấn</span>
            <span className="font-semibold">1:1</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
            <span>Khuyến mãi độc quyền</span>
            <span className="font-semibold">Hàng tuần</span>
          </div>
        </div>
      </div>
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Đăng ký</h2>
        <p className="mt-2 text-sm text-slate-500">Tạo tài khoản để mua sắm nhanh hơn.</p>
        {err && <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{err}</div>}
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Họ tên</label>
            <input className="input mt-2" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Họ tên" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</label>
            <input className="input mt-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Mật khẩu</label>
            <input
              className="input mt-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
            />
          </div>
          <button className="btn btn-primary w-full" type="submit">Tạo tài khoản</button>
          <div className="text-center text-sm text-slate-500">
            Đã có tài khoản? <Link className="font-semibold text-slate-700" to="/login">Đăng nhập</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
