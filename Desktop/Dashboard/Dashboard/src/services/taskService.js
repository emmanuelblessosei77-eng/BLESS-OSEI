const API_URL = 'http://localhost:5000/api'

function getHeaders() {
  const user = JSON.parse(localStorage.getItem('dashboard_session_user') || '{}')
  return {
    'Content-Type': 'application/json',
    'x-user-id': user.id || ''
  }
}

export async function getTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'GET',
      headers: getHeaders()
    })

    if (!response.ok) {
      throw new Error('Failed to fetch tasks')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }
}

export async function addTask(task) {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(task)
    })

    if (!response.ok) {
      throw new Error('Failed to create task')
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

export async function updateTask(taskId, updates) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates)
    })

    if (!response.ok) {
      throw new Error('Failed to update task')
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

export async function deleteTask(taskId) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: getHeaders()
    })

    if (!response.ok) {
      throw new Error('Failed to delete task')
    }
  } catch (error) {
    throw error
  }
}

export async function toggleTask(task) {
  return updateTask(task.id, { completed: !task.completed })
}

export async function updateTaskStatus(taskId, status) {
  return updateTask(taskId, { status })
}

export async function addSubtask(taskId, subtask) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}/subtasks`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(subtask)
    })

    if (!response.ok) {
      throw new Error('Failed to create subtask')
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

export async function updateSubtask(subtaskId, updates) {
  try {
    const response = await fetch(`${API_URL}/tasks/subtasks/${subtaskId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates)
    })

    if (!response.ok) {
      throw new Error('Failed to update subtask')
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

export async function deleteSubtask(subtaskId) {
  try {
    const response = await fetch(`${API_URL}/tasks/subtasks/${subtaskId}`, {
      method: 'DELETE',
      headers: getHeaders()
    })

    if (!response.ok) {
      throw new Error('Failed to delete subtask')
    }
  } catch (error) {
    throw error
  }
}

export async function toggleSubtask(subtask) {
  return updateSubtask(subtask.id, { completed: !subtask.completed })
}