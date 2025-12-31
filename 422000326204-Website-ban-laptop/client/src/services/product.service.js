import api from './api.js'

export async function getProducts(params = {}) {
  const { data } = await api.get('/products', { params })
  return data
}

export async function getProduct(id) {
  const { data } = await api.get(`/products/${id}`)
  return data
}
