import { initialTasks } from '../utils/mockData.js'
import { readFromStorage, writeToStorage } from '../utils/storage.js'

const TASK_KEY_PREFIX = 'dashboard_tasks_'

const keyFor = (userId) => `${TASK_KEY_PREFIX}${userId}`

function ensureSeeded(userId) {
  const existing = readFromStorage(keyFor(userId), null)
  if (!existing) {
    writeToStorage(keyFor(userId), initialTasks)
  }
}

export function getTasks(userId) {
  if (!userId) return []
  ensureSeeded(userId)
  return readFromStorage(keyFor(userId), [])
}

export function saveTasks(userId, tasks) {
  writeToStorage(keyFor(userId), tasks)
}

function generateId(prefix) {
  return `${prefix}-${crypto.randomUUID?.() ?? Date.now()}`
}

export function addTask(userId, task) {
  const tasks = getTasks(userId)
  const newTask = {
    id: generateId('task'),
    title: task.title,
    description: task.description || '',
    status: task.status || 'pending',
    completed: false,
    subtasks: [],
  }
  tasks.push(newTask)
  saveTasks(userId, tasks)
  return newTask
}

export function updateTask(userId, taskId, updates) {
  const tasks = getTasks(userId).map((task) =>
    task.id === taskId ? { ...task, ...updates } : task,
  )
  saveTasks(userId, tasks)
}

export function deleteTask(userId, taskId) {
  const tasks = getTasks(userId).filter((task) => task.id !== taskId)
  saveTasks(userId, tasks)
}

export function toggleTask(userId, taskId) {
  const tasks = getTasks(userId).map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task,
  )
  saveTasks(userId, tasks)
}

export function updateTaskStatus(userId, taskId, status) {
  const tasks = getTasks(userId).map((task) =>
    task.id === taskId ? { ...task, status } : task,
  )
  saveTasks(userId, tasks)
}

export function addSubtask(userId, taskId, subtask) {
  const tasks = getTasks(userId).map((task) => {
    if (task.id !== taskId) return task
    const newSubtask = {
      id: generateId('sub'),
      title: subtask.title,
      completed: false,
    }
    return { ...task, subtasks: [...(task.subtasks || []), newSubtask] }
  })
  saveTasks(userId, tasks)
}

export function updateSubtask(userId, taskId, subtaskId, updates) {
  const tasks = getTasks(userId).map((task) => {
    if (task.id !== taskId) return task
    return {
      ...task,
      subtasks: task.subtasks.map((sub) =>
        sub.id === subtaskId ? { ...sub, ...updates } : sub,
      ),
    }
  })
  saveTasks(userId, tasks)
}

export function deleteSubtask(userId, taskId, subtaskId) {
  const tasks = getTasks(userId).map((task) => {
    if (task.id !== taskId) return task
    return { ...task, subtasks: task.subtasks.filter((sub) => sub.id !== subtaskId) }
  })
  saveTasks(userId, tasks)
}

export function toggleSubtask(userId, taskId, subtaskId) {
  const tasks = getTasks(userId).map((task) => {
    if (task.id !== taskId) return task
    return {
      ...task,
      subtasks: task.subtasks.map((sub) =>
        sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub,
      ),
    }
  })
  saveTasks(userId, tasks)
}

