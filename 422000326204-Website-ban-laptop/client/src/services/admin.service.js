import api from './api.js'

export async function getAdminUsers() {
  const { data } = await api.get('/admin/users')
  return data
}

export async function getAdminOrders() {
  const { data } = await api.get('/admin/orders')
  return data
}
