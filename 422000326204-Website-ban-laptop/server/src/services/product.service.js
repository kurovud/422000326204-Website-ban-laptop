import * as ProductModel from '../models/product.model.js'

export async function list({ q, type }) {
  const rows = await ProductModel.listProducts({ q, type })
  return rows
}

export async function detail(id) {
  const p = await ProductModel.getProductById(id)
  if (!p) {
    const err = new Error('Không tìm thấy sản phẩm')
    err.status = 404
    throw err
  }
  return p
}
