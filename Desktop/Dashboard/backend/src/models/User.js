import pool from '../config/database.js'
import bcrypt from 'bcryptjs'

export async function createUser(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, hashedPassword]
  )
  
  return result.rows[0]
}

export async function findUserByEmail(email) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
  return result.rows[0]
}

export async function findUserById(id) {
  const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [id])
  return result.rows[0]
}

export async function validatePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}
