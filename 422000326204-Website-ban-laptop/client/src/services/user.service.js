import api from './api.js'

export async function listUsers() {
  const { data } = await api.get('/users')
  return data
}
