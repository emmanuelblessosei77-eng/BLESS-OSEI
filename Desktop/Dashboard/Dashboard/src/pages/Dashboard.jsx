import { useState } from 'react'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Input from '../components/Input.jsx'
import Modal from '../components/Modal.jsx'
import TaskItem from '../components/TaskItem.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import { useTasks } from '../hooks/useTasks.js'

const emptyTask = { title: '', description: '' }
const emptySubtask = { title: '' }

function Dashboard() {
  const { user, logout } = useAuth()

  const {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    addSubtask,
    updateSubtask,
    deleteSubtask,
    toggleSubtask,
    updateTaskStatus,
  } = useTasks(user?.id)

  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [subtaskModalOpen, setSubtaskModalOpen] = useState(false)
  const [taskForm, setTaskForm] = useState(emptyTask)
  const [subtaskForm, setSubtaskForm] = useState(emptySubtask)
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editingSubtaskId, setEditingSubtaskId] = useState(null)
  const [targetTaskId, setTargetTaskId] = useState(null)

  const openNewTask = () => {
    setEditingTaskId(null)
    setTaskForm(emptyTask)
    setTaskModalOpen(true)
  }

  const openEditTask = (task) => {
    setEditingTaskId(task.id)
    setTaskForm({ title: task.title, description: task.description })
    setTaskModalOpen(true)
  }

  const handleSaveTask = async (e) => {
    e.preventDefault()
    if (!taskForm.title.trim()) return

    try {
      if (editingTaskId) {
        await updateTask(editingTaskId, taskForm)
      } else {
        await addTask(taskForm)
      }

      setTaskModalOpen(false)
      setTaskForm(emptyTask)
      setEditingTaskId(null)
    } catch (error) {
      return
    }
  }

  const openAddSubtask = (taskId) => {
    setTargetTaskId(taskId)
    setEditingSubtaskId(null)
    setSubtaskForm(emptySubtask)
    setSubtaskModalOpen(true)
  }

  const openEditSubtask = (taskId, subtask) => {
    setTargetTaskId(taskId)
    setEditingSubtaskId(subtask.id)
    setSubtaskForm({ title: subtask.title })
    setSubtaskModalOpen(true)
  }

  const handleSaveSubtask = async (e) => {
    e.preventDefault()
    if (!subtaskForm.title.trim() || !targetTaskId) return

    try {
      if (editingSubtaskId) {
        await updateSubtask(editingSubtaskId, { title: subtaskForm.title })
      } else {
        await addSubtask(targetTaskId, subtaskForm)
      }

      setSubtaskModalOpen(false)
      setSubtaskForm(emptySubtask)
      setEditingSubtaskId(null)
    } catch (error) {
      return
    }
  }

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <p className="muted small">Logged in as {user?.email}</p>
          <h1>Task Dashboard</h1>
        </div>
        <div className="topbar-actions">
          <Button variant="primary" onClick={openNewTask}>
            New task
          </Button>
          <Button variant="ghost" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>

      <div className="grid">
        {loading && (
          <Card title="Loading...">
            <p className="muted">Fetching your tasks from PostgreSQL...</p>
            <p className="muted small">Please wait...</p>
          </Card>
        )}

        {error && (
          <Card title="Error Loading Tasks">
            <p className="muted" style={{ color: 'red', marginBottom: '1rem' }}>
              {error}
            </p>
            <p className="muted small">
              Make sure:
              <br />• Backend server is running (php artisan serve)
              <br />• PostgreSQL is connected
              <br />• You are logged in
            </p>
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
              style={{ marginTop: '1rem' }}
            >
              Retry
            </button>
          </Card>
        )}

        {!loading && !error && tasks.length === 0 && (
          <Card title="No tasks yet">
            <p className="muted">Create a task to get started.</p>
            <p className="muted small">
              Your tasks will be saved to PostgreSQL and displayed here.
            </p>
          </Card>
        )}

        {!loading && !error && tasks.length > 0 && (
          <div style={{ width: '100%' }}>
            <p className="muted small" style={{ marginBottom: '1rem' }}>
              Showing {tasks.length} task{tasks.length !== 1 ? 's' : ''} from PostgreSQL
            </p>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleTask={toggleTask}
                onEditTask={openEditTask}
                onDeleteTask={deleteTask}
                onAddSubtask={openAddSubtask}
                onEditSubtask={openEditSubtask}
                onToggleSubtask={toggleSubtask}
                onDeleteSubtask={deleteSubtask}
                onUpdateStatus={updateTaskStatus}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        open={taskModalOpen}
        title={editingTaskId ? 'Edit task' : 'New task'}
        onClose={() => setTaskModalOpen(false)}
        footer={
          <div className="modal-actions">
            <Button variant="ghost" onClick={() => setTaskModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveTask}>
              Save
            </Button>
          </div>
        }
      >
        <form className="stack" onSubmit={handleSaveTask}>
          <Input
            label="Title"
            name="title"
            value={taskForm.title}
            onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
            placeholder="Build reusable components"
            required
          />
          <Input
            label="Description"
            name="description"
            value={taskForm.description}
            onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
            placeholder="Optional details..."
          />
        </form>
      </Modal>

      <Modal
        open={subtaskModalOpen}
        title={editingSubtaskId ? 'Edit subtask' : 'New subtask'}
        onClose={() => setSubtaskModalOpen(false)}
        footer={
          <div className="modal-actions">
            <Button variant="ghost" onClick={() => setSubtaskModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveSubtask}>
              Save
            </Button>
          </div>
        }
      >
        <form className="stack" onSubmit={handleSaveSubtask}>
          <Input
            label="Title"
            name="title"
            value={subtaskForm.title}
            onChange={(e) => setSubtaskForm({ ...subtaskForm, title: e.target.value })}
            placeholder="Add design tokens"
            required
          />
        </form>
      </Modal>
    </div>
  )
}
export default Dashboard

