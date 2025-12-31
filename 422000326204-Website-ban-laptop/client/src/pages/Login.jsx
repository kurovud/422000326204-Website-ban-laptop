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
    <div className="card" style={{ maxWidth: 420, margin: '0 auto' }}>
      <h2>Đăng nhập</h2>
      {err && <div className="card" style={{ background: '#fff7ed' }}>{err}</div>}
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 10 }}>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        </div>
        <div style={{ marginBottom: 10 }}>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mật khẩu" />
        </div>
        <button className="btn btn-primary" type="submit">Đăng nhập</button>
        <div style={{ marginTop: 10 }}>
          <small>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></small>
        </div>
      </form>
    </div>
  )
}
