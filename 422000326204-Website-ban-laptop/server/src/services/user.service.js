import * as UserModel from '../models/user.model.js'

export async function list() {
  return await UserModel.listUsers()
}
