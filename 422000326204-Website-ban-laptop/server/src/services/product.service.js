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

export async function create(payload) {
  const id = await ProductModel.createProduct(payload)
  return await ProductModel.getProductById(id)
}

export async function update(id, payload) {
  const ok = await ProductModel.updateProduct(id, payload)
  if (!ok) {
    const err = new Error('Không tìm thấy sản phẩm để cập nhật')
    err.status = 404
    throw err
  }
  return await ProductModel.getProductById(id)
}

export async function remove(id) {
  const ok = await ProductModel.deleteProduct(id)
  if (!ok) {
    const err = new Error('Không tìm thấy sản phẩm để xoá')
    err.status = 404
    throw err
  }
  return true
}
