import { ok } from '../utils/response.js'
import * as ProductService from '../services/product.service.js'

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
