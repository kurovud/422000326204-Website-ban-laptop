import { created, ok } from '../utils/response.js'
import { createOrderSchema } from '../validations/order.validation.js'
import * as OrderService from '../services/order.service.js'

export async function create(req, res, next) {
  try {
    const { error, value } = createOrderSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error.message })
    const data = await OrderService.createOrder({ userId: req.user.id, ...value })
    return created(res, data, 'Tạo đơn hàng thành công')
  } catch (e) { next(e) }
}

export async function my(req, res, next) {
  try {
    const data = await OrderService.myOrders(req.user.id)
    return ok(res, data, 'Đơn hàng của tôi')
  } catch (e) { next(e) }
}
