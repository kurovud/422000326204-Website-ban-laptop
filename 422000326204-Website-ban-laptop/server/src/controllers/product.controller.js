import { ok } from '../utils/response.js'
import * as ProductService from '../services/product.service.js'
import { upsertProductSchema } from '../validations/product.validation.js'

export async function list(req, res, next) {
  try {
    const { q = '', type = '' } = req.query
    const data = await ProductService.list({ q, type })
    return ok(res, data, 'Danh sách sản phẩm')
  } catch (e) { next(e) }
}

export async function detail(req, res, next) {
  try {
    const data = await ProductService.detail(Number(req.params.id))
    return ok(res, data, 'Chi tiết sản phẩm')
  } catch (e) { next(e) }
}

export async function create(req, res, next) {
  try {
    const { error, value } = upsertProductSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error.message })
    const data = await ProductService.create(value)
    return res.status(201).json({ message: 'Tạo sản phẩm thành công', data })
  } catch (e) { next(e) }
}

export async function update(req, res, next) {
  try {
    const { error, value } = upsertProductSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error.message })
    const data = await ProductService.update(Number(req.params.id), value)
    return ok(res, data, 'Cập nhật sản phẩm thành công')
  } catch (e) { next(e) }
}

export async function remove(req, res, next) {
  try {
    await ProductService.remove(Number(req.params.id))
    return ok(res, true, 'Xoá sản phẩm thành công')
  } catch (e) { next(e) }
}
