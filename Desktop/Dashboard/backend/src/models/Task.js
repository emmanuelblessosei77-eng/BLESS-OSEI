import pool from '../config/database.js'

export async function createTask(userId, title, description) {
  const result = await pool.query(
    'INSERT INTO tasks (user_id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, title, description || '', 'pending']
  )
  
  const task = result.rows[0]
  task.subtasks = []
  return task
}

export async function getTasksByUserId(userId) {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  )
  
  const tasks = result.rows
  
  for (let task of tasks) {
    const subtasksResult = await pool.query(
      'SELECT id, title, completed FROM subtasks WHERE task_id = $1 ORDER BY created_at ASC',
      [task.id]
    )
    task.subtasks = subtasksResult.rows
  }
  
  return tasks
}

export async function updateTask(taskId, updates) {
  const fields = []
  const values = []
  let paramIndex = 1

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = $${paramIndex}`)
    values.push(value)
    paramIndex++
  }

  fields.push(`updated_at = NOW()`)
  values.push(taskId)

  const result = await pool.query(
    `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  )

  return result.rows[0]
}

export async function deleteTask(taskId) {
  await pool.query('DELETE FROM tasks WHERE id = $1', [taskId])
}

export async function createSubtask(taskId, title) {
  const result = await pool.query(
    'INSERT INTO subtasks (task_id, title) VALUES ($1, $2) RETURNING *',
    [taskId, title]
  )
  
  return result.rows[0]
}

export async function updateSubtask(subtaskId, updates) {
  const fields = []
  const values = []
  let paramIndex = 1

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = $${paramIndex}`)
    values.push(value)
    paramIndex++
  }

  values.push(subtaskId)

  const result = await pool.query(
    `UPDATE subtasks SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  )

  return result.rows[0]
}

export async function deleteSubtask(subtaskId) {
  await pool.query('DELETE FROM subtasks WHERE id = $1', [subtaskId])
}
