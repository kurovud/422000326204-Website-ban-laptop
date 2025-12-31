import bcrypt from 'bcryptjs'
import { signToken } from '../config/jwt.js'
import * as UserModel from '../models/user.model.js'

export async function register({ email, password, fullName }) {
  const existed = await UserModel.findUserByEmail(email)
  if (existed) {
    const err = new Error('Email đã tồn tại')
    err.status = 400
    throw err
  }

  const hash = await bcrypt.hash(password, 10)
  const roleId = await UserModel.getRoleIdByName('user')
  const id = await UserModel.createUser({ email, passwordHash: hash, fullName, roleId })

  const user = await UserModel.findUserById(id)
  const token = signToken({ id: user.id, email: user.email, role: user.role })
  return { user, token }
}

export async function login({ email, password }) {
  const u = await UserModel.findUserByEmail(email)
  if (!u) {
    const err = new Error('Sai email hoặc mật khẩu')
    err.status = 401
    throw err
  }
  const ok = await bcrypt.compare(password, u.password_hash)
  if (!ok) {
    const err = new Error('Sai email hoặc mật khẩu')
    err.status = 401
    throw err
  }

  const token = signToken({ id: u.id, email: u.email, role: u.role })
  const user = { id: u.id, email: u.email, fullName: u.full_name, role: u.role }
  return { user, token }
}

export async function me(userId) {
  const user = await UserModel.findUserById(userId)
  if (!user) {
    const err = new Error('Không tìm thấy người dùng')
    err.status = 404
    throw err
  }
  return { id: user.id, email: user.email, fullName: user.full_name, role: user.role }
}
