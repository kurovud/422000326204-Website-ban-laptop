import api from './api.js'

export async function createOrder(payload) {
  const { data } = await api.post('/orders', payload)
  return data
}

export async function getMyOrders() {
  const { data } = await api.get('/orders/my')
  return data
}
