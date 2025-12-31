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
    <div className="card" style={{ maxWidth: 420, margin: '0 auto' }}>
      <h2>Đăng ký</h2>
      {err && <div className="card" style={{ background: '#fff7ed' }}>{err}</div>}
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 10 }}>
          <input className="input" value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Họ tên" />
        </div>
        <div style={{ marginBottom: 10 }}>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        </div>
        <div style={{ marginBottom: 10 }}>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mật khẩu" />
        </div>
        <button className="btn btn-primary" type="submit">Tạo tài khoản</button>
        <div style={{ marginTop: 10 }}>
          <small>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></small>
        </div>
      </form>
    </div>
  )
}
