import { ok } from '../utils/response.js'
import * as UserService from '../services/user.service.js'
import { updateUserSchema } from '../validations/user.validation.js'

export async function list(req, res, next) {
  try {
    const data = await UserService.list()
    return ok(res, data, 'Danh sách người dùng')
  } catch (e) { next(e) }
}

export async function update(req, res, next) {
  try {
    const { error, value } = updateUserSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error.message })
    const data = await UserService.update(Number(req.params.id), value)
    return ok(res, data, 'Cập nhật người dùng thành công')
  } catch (e) { next(e) }
}
