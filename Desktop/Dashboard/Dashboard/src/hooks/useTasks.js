import { useEffect, useState } from 'react'
import {
  addSubtask,
  addTask,
  deleteSubtask,
  deleteTask,
  getTasks,
  updateSubtask,
  updateTask,
  toggleSubtask,
  toggleTask,
  updateTaskStatus,
} from '../services/taskService.js'

export function useTasks(userId) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTasks = async () => {
    if (!userId) {
      setTasks([])
      return
    }

    setLoading(true)
    setError(null)
    try {
      const fetchedTasks = await getTasks()
      console.log('✅ Tasks fetched from PostgreSQL:', fetchedTasks)
      setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : [])
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch tasks'
      setError(errorMessage)
      console.error('❌ Failed to fetch tasks:', err)
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      })
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const refresh = async () => {
    await fetchTasks()
  }

  return {
    tasks,
    loading,
    error,
    addTask: async (task) => {
      try {
        await addTask(task)
        await refresh()
      } catch (err) {
        console.error('Failed to add task:', err)
        throw err
      }
    },
    updateTask: async (taskId, updates) => {
      try {
        await updateTask(taskId, updates)
        await refresh()
      } catch (err) {
        console.error('Failed to update task:', err)
        throw err
      }
    },
    deleteTask: async (taskId) => {
      try {
        await deleteTask(taskId)
        await refresh()
      } catch (err) {
        console.error('Failed to delete task:', err)
        throw err
      }
    },
    toggleTask: async (task) => {
      try {
        await toggleTask(task)
        await refresh()
      } catch (err) {
        console.error('Failed to toggle task:', err)
        throw err
      }
    },
    addSubtask: async (taskId, subtask) => {
      try {
        await addSubtask(taskId, subtask)
        await refresh()
      } catch (err) {
        console.error('Failed to add subtask:', err)
        throw err
      }
    },
    updateSubtask: async (subtaskId, updates) => {
      try {
        await updateSubtask(subtaskId, updates)
        await refresh()
      } catch (err) {
        console.error('Failed to update subtask:', err)
        throw err
      }
    },
    deleteSubtask: async (subtaskId) => {
      try {
        await deleteSubtask(subtaskId)
        await refresh()
      } catch (err) {
        console.error('Failed to delete subtask:', err)
        throw err
      }
    },
    toggleSubtask: async (subtask) => {
      try {
        await toggleSubtask(subtask)
        await refresh()
      } catch (err) {
        console.error('Failed to toggle subtask:', err)
        throw err
      }
    },
    updateTaskStatus: async (taskId, status) => {
      try {
        await updateTaskStatus(taskId, status)
        await refresh()
      } catch (err) {
        console.error('Failed to update task status:', err)
        throw err
      }
    },
  }
}

