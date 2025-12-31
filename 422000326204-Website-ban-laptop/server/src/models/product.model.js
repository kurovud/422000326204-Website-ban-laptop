import { pool } from '../config/db.js'

export async function listProducts({ q = '', type = '' }) {
  const like = `%${q}%`
  const params = [like, like]
  let where = '(p.name LIKE ? OR p.sku LIKE ?)'
  if (type) { where += ' AND p.type=?'; params.push(type) }

  const [rows] = await pool.query(
    `SELECT p.id, p.sku, p.name, p.type, p.price, p.stock, p.description, p.created_at
     FROM products p
     WHERE ${where}
     ORDER BY p.created_at DESC
     LIMIT 200`,
    params
  )
  return rows
}

export async function getProductById(id) {
  const [rows] = await pool.query(
    'SELECT id, sku, name, type, price, stock, description, created_at FROM products WHERE id=? LIMIT 1',
    [id]
  )
  return rows[0] || null
}

export async function decreaseStock(conn, productId, qty) {
  const [res] = await conn.query(
    'UPDATE products SET stock = stock - ? WHERE id=? AND stock >= ?',
    [qty, productId, qty]
  )
  return res.affectedRows === 1
}
