import {
  createTask,
  getTasksByUserId,
  updateTask,
  deleteTask,
  createSubtask,
  updateSubtask,
  deleteSubtask,
} from '../models/Task.js'

export async function getTasks(req, res) {
  try {
    const userId = req.userId

    const tasks = await getTasksByUserId(userId)
    
    res.json(tasks)
  } catch (err) {
    console.error('Get tasks error:', err)
    res.status(500).json({ message: 'Failed to fetch tasks' })
  }
}

export async function addTask(req, res) {
  try {
    const userId = req.userId
    const { title, description } = req.body

    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    const task = await createTask(userId, title, description)
    
    res.status(201).json(task)
  } catch (err) {
    console.error('Add task error:', err)
    res.status(500).json({ message: 'Failed to create task' })
  }
}

export async function updateTaskHandler(req, res) {
  try {
    const { taskId } = req.params
    const updates = req.body

    const task = await updateTask(taskId, updates)
    
    res.json(task)
  } catch (err) {
    console.error('Update task error:', err)
    res.status(500).json({ message: 'Failed to update task' })
  }
}

export async function deleteTaskHandler(req, res) {
  try {
    const { taskId } = req.params

    await deleteTask(taskId)
    
    res.json({ message: 'Task deleted' })
  } catch (err) {
    console.error('Delete task error:', err)
    res.status(500).json({ message: 'Failed to delete task' })
  }
}

export async function addSubtaskHandler(req, res) {
  try {
    const { taskId } = req.params
    const { title } = req.body

    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    const subtask = await createSubtask(taskId, title)
    
    res.status(201).json(subtask)
  } catch (err) {
    console.error('Add subtask error:', err)
    res.status(500).json({ message: 'Failed to create subtask' })
  }
}

export async function updateSubtaskHandler(req, res) {
  try {
    const { subtaskId } = req.params
    const updates = req.body

    const subtask = await updateSubtask(subtaskId, updates)
    
    res.json(subtask)
  } catch (err) {
    console.error('Update subtask error:', err)
    res.status(500).json({ message: 'Failed to update subtask' })
  }
}

export async function deleteSubtaskHandler(req, res) {
  try {
    const { subtaskId } = req.params

    await deleteSubtask(subtaskId)
    
    res.json({ message: 'Subtask deleted' })
  } catch (err) {
    console.error('Delete subtask error:', err)
    res.status(500).json({ message: 'Failed to delete subtask' })
  }
}
