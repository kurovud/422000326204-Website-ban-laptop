import { ok } from '../utils/response.js'
import * as UserService from '../services/user.service.js'

export async function list(req, res, next) {
  try {
    const data = await UserService.list()
    return ok(res, data, 'Danh sách người dùng')
  } catch (e) { next(e) }
}
