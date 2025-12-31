import { forbidden } from '../utils/response.js'

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return forbidden(res, 'Chưa xác thực')
    if (req.user.role !== role) return forbidden(res, 'Không đủ quyền')
    return next()
  }
}
