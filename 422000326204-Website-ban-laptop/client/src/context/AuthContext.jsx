import { createContext, useContext, useEffect, useState } from 'react'
import * as AuthService from '../services/auth.service.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    AuthService.me().then(setUser).catch(() => {
      localStorage.removeItem('token')
      setUser(null)
    })
  }, [])

  const login = async (email, password) => {
    const res = await AuthService.login(email, password)
    localStorage.setItem('token', res.token)
    setUser(res.user)
  }

  const register = async (payload) => {
    const res = await AuthService.register(payload)
    localStorage.setItem('token', res.token)
    setUser(res.user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
