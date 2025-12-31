import api from './api.js'

export async function createOrder(payload) {
  const { data } = await api.post('/orders', payload)
  return data
}

export async function getMyOrders() {
  const { data } = await api.get('/orders/my')
  return data
}

export async function listOrdersAdmin() {
  const { data } = await api.get('/orders')
  return data
}

export async function updateOrderStatus(id, status) {
  const { data } = await api.patch(`/orders/${id}/status`, { status })
  return data
}
