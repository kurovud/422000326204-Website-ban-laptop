import { unauthorized } from '../utils/response.js'
import { verifyToken } from '../config/jwt.js'

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return unauthorized(res, 'Thiếu token')
  try {
    req.user = verifyToken(token)
    return next()
  } catch (e) {
    return unauthorized(res, 'Token không hợp lệ hoặc đã hết hạn')
  }
}

function requireRoles(roles) {
  return (req, res, next) => {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return unauthorized(res, 'Thiếu token')
    try {
      const user = verifyToken(token)
      if (!roles.includes(user.role)) return unauthorized(res, 'Bạn không có quyền truy cập')
      req.user = user
      return next()
    } catch (e) {
      return unauthorized(res, 'Token không hợp lệ hoặc đã hết hạn')
    }
  }
}

export const requireAdmin = requireRoles(['admin'])
export const requireAdminOrStaff = requireRoles(['admin', 'staff'])
