import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('admin@techshop.vn')
  const [password, setPassword] = useState('Admin@123')
  const [err, setErr] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      await login(email, password)
      nav('/')
    } catch (e) {
      setErr(e?.response?.data?.message || 'Đăng nhập thất bại')
    }
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Đăng nhập</h2>
        <p className="mt-2 text-sm text-slate-500">Chào mừng bạn quay lại TechShop.</p>
        {err && <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{err}</div>}
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
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
          <button className="btn btn-primary w-full" type="submit">Đăng nhập</button>
          <div className="text-center text-sm text-slate-500">
            Chưa có tài khoản? <Link className="font-semibold text-slate-700" to="/register">Đăng ký</Link>
          </div>
        </form>
      </div>
      <div className="card flex flex-col justify-between bg-slate-900 p-6 text-white">
        <div>
          <h3 className="text-xl font-semibold">Đồng hành cùng game thủ & creator</h3>
          <p className="mt-2 text-sm text-slate-200">
            Đăng nhập để theo dõi đơn hàng, nhận ưu đãi và cấu hình phù hợp nhất.
          </p>
        </div>
        <div className="mt-6 space-y-3 text-sm text-slate-200">
          <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
            <span>Ưu đãi hội viên</span>
            <span className="font-semibold">Giảm 5%</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
            <span>Hỗ trợ kỹ thuật</span>
            <span className="font-semibold">24/7</span>
          </div>
        </div>
      </div>
    </div>
  )
}
