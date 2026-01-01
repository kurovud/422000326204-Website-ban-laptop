import api from './api.js'

export async function listUsers() {
  const { data } = await api.get('/users')
  return data
}

export async function updateUser(id, payload) {
  const { data } = await api.patch(`/users/${id}`, payload)
  return data
}
