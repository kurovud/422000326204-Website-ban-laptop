import { created, ok } from '../utils/response.js'
import { loginSchema, registerSchema } from '../validations/auth.validation.js'
import * as AuthService from '../services/auth.service.js'

export async function register(req, res, next) {
  try {
    const { error, value } = registerSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error.message })
    const data = await AuthService.register(value)
    return created(res, data, 'Đăng ký thành công')
  } catch (e) { next(e) }
}

export async function login(req, res, next) {
  try {
    const { error, value } = loginSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error.message })
    const data = await AuthService.login(value)
    return ok(res, data, 'Đăng nhập thành công')
  } catch (e) { next(e) }
}

export async function me(req, res, next) {
  try {
    const data = await AuthService.me(req.user.id)
    return ok(res, data, 'Thông tin tài khoản')
  } catch (e) { next(e) }
}
