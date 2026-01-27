import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import {
  getTasks,
  addTask,
  updateTaskHandler,
  deleteTaskHandler,
  addSubtaskHandler,
  updateSubtaskHandler,
  deleteSubtaskHandler,
} from '../controllers/taskController.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/', getTasks)
router.post('/', addTask)
router.put('/:taskId', updateTaskHandler)
router.delete('/:taskId', deleteTaskHandler)

router.post('/:taskId/subtasks', addSubtaskHandler)
router.put('/subtasks/:subtaskId', updateSubtaskHandler)
router.delete('/subtasks/:subtaskId', deleteSubtaskHandler)

export default router
