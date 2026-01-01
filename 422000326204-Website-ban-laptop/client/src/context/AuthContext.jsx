import { createContext, useContext, useEffect, useState } from 'react'
import * as AuthService from '../services/auth.service.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }
    AuthService.me()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem('token')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const res = await AuthService.login(email, password)
    localStorage.setItem('token', res.token)
    setUser(res.user)
    setLoading(false)
  }

  const register = async (payload) => {
    const res = await AuthService.register(payload)
    localStorage.setItem('token', res.token)
    setUser(res.user)
    setLoading(false)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setLoading(false)
  }

  const value = { user, loading, login, register, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
