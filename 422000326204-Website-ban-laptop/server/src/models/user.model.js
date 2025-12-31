import { pool } from '../config/db.js'

export async function findUserByEmail(email) {
  const [rows] = await pool.query(
    'SELECT u.id, u.email, u.password_hash, u.full_name, r.name AS role FROM users u JOIN roles r ON r.id=u.role_id WHERE u.email=? LIMIT 1',
    [email]
  )
  return rows[0] || null
}

export async function findUserById(id) {
  const [rows] = await pool.query(
    'SELECT u.id, u.email, u.full_name, r.name AS role FROM users u JOIN roles r ON r.id=u.role_id WHERE u.id=? LIMIT 1',
    [id]
  )
  return rows[0] || null
}

export async function createUser({ email, passwordHash, fullName, roleId }) {
  const [res] = await pool.query(
    'INSERT INTO users (email, password_hash, full_name, role_id) VALUES (?,?,?,?)',
    [email, passwordHash, fullName, roleId]
  )
  return res.insertId
}

export async function getRoleIdByName(name) {
  const [rows] = await pool.query('SELECT id FROM roles WHERE name=? LIMIT 1', [name])
  return rows[0]?.id || null
}

export async function listUsers() {
  const [rows] = await pool.query(
    'SELECT u.id, u.email, u.full_name, r.name AS role, u.is_active, u.created_at FROM users u JOIN roles r ON r.id=u.role_id ORDER BY u.created_at DESC LIMIT 300'
  )
  return rows
}
