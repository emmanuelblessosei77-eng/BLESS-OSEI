export const initialUsers = [
  { id: 'demo-1', name: 'Demo User', email: 'demo@example.com', password: 'password' },
]

export const TASK_STATUSES = {
  PENDING: 'pending',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
}

export const initialTasks = [
  {
    id: 'task-1',
    title: 'Plan project setup',
    description: 'Create reusable components and folder structure',
    status: 'ongoing',
    completed: false,
    subtasks: [
      { id: 'sub-1', title: 'Scaffold pages', completed: true },
      { id: 'sub-2', title: 'Define hooks/services', completed: false },
    ],
  },
  {
    id: 'task-2',
    title: 'Implement Dashboard UI',
    description: 'Wire task CRUD with localStorage',
    status: 'pending',
    completed: false,
    subtasks: [{ id: 'sub-3', title: 'Add modals for edit', completed: false }],
  },
]

