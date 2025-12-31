import { nanoid } from 'nanoid'
import { pool } from '../config/db.js'
import * as ProductModel from '../models/product.model.js'
import * as OrderModel from '../models/order.model.js'

export async function createOrder({ userId, phone, shippingAddress, items }) {
  // Tính tổng + kiểm tra tồn kho (transaction ở model tạo order)
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    let total = 0
    const enriched = []
    for (const it of items) {
      const p = await ProductModel.getProductById(it.productId)
      if (!p) {
        const err = new Error(`Sản phẩm không tồn tại: ${it.productId}`)
        err.status = 400
        throw err
      }
      // khóa tồn kho bằng update có điều kiện
      const ok = await ProductModel.decreaseStock(conn, it.productId, it.qty)
      if (!ok) {
        const err = new Error(`Không đủ tồn kho: ${p.name}`)
        err.status = 400
        throw err
      }
      total += Number(p.price) * it.qty
      enriched.push({ productId: it.productId, qty: it.qty, price: p.price })
    }

    const code = 'TS' + nanoid(8).toUpperCase()
    const [oRes] = await conn.query(
      'INSERT INTO orders (code, user_id, phone, shipping_address, status, total) VALUES (?,?,?,?,?,?)',
      [code, userId, phone, shippingAddress, 'pending', total]
    )
    const orderId = oRes.insertId

    for (const it of enriched) {
      await conn.query(
        'INSERT INTO order_items (order_id, product_id, qty, price) VALUES (?,?,?,?)',
        [orderId, it.productId, it.qty, it.price]
      )
    }

    await conn.commit()
    return { id: orderId, code, total, status: 'pending' }
  } catch (e) {
    await conn.rollback()
    throw e
  } finally {
    conn.release()
  }
}

export async function myOrders(userId) {
  return await OrderModel.listMyOrders(userId)
}

export async function adminOrders() {
  return await OrderModel.listAllOrders()
}

export async function changeStatus(id, status) {
  const ok = await OrderModel.updateOrderStatus(id, status)
  if (!ok) {
    const err = new Error('Không tìm thấy đơn hàng')
    err.status = 404
    throw err
  }
  return true
}
