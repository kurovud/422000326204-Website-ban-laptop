import * as UserModel from '../models/user.model.js'
import { getRoleIdByName } from '../models/user.model.js'

export async function list() {
  return await UserModel.listUsers()
}

export async function update(id, { role, isActive }) {
  const roleId = await getRoleIdByName(role)
  if (!roleId) {
    const err = new Error('Vai trò không hợp lệ')
    err.status = 400
    throw err
  }
  const ok = await UserModel.updateUserRoleStatus(id, { roleId, isActive })
  if (!ok) {
    const err = new Error('Không tìm thấy người dùng')
    err.status = 404
    throw err
  }
  return await UserModel.findUserById(id)
}
