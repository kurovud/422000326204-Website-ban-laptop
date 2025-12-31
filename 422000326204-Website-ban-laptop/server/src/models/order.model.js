import { pool } from '../config/db.js'

export async function createOrderTx({ userId, phone, shippingAddress, items, code, total }) {
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    const [oRes] = await conn.query(
      'INSERT INTO orders (code, user_id, phone, shipping_address, status, total) VALUES (?,?,?,?,?,?)',
      [code, userId, phone, shippingAddress, 'pending', total]
    )
    const orderId = oRes.insertId

    for (const it of items) {
      await conn.query(
        'INSERT INTO order_items (order_id, product_id, qty, price) VALUES (?,?,?,?)',
        [orderId, it.productId, it.qty, it.price]
      )
    }

    await conn.commit()
    return { orderId }
  } catch (e) {
    await conn.rollback()
    throw e
  } finally {
    conn.release()
  }
}

export async function listMyOrders(userId) {
  const [rows] = await pool.query(
    'SELECT id, code, status, total, created_at FROM orders WHERE user_id=? ORDER BY created_at DESC LIMIT 200',
    [userId]
  )
  return rows
}
