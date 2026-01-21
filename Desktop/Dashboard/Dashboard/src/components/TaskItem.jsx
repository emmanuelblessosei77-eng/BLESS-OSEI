import SubTaskItem from './SubTaskItem.jsx'

const STATUS_COLORS = {
  pending: '#94a3b8',
  ongoing: '#f59e0b',
  completed: '#10b981',
}

const STATUS_LABELS = {
  pending: 'Pending',
  ongoing: 'Ongoing',
  completed: 'Completed',
}

function TaskItem({
  task,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  onAddSubtask,
  onEditSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  onUpdateStatus,
}) {
  const statuses = ['pending', 'ongoing', 'completed']
  const currentStatusIndex = statuses.indexOf(task.status || 'pending')

  const handleStatusChange = () => {
    const nextStatusIndex = (currentStatusIndex + 1) % statuses.length
    onUpdateStatus?.(task.id, statuses[nextStatusIndex])
  }

  return (
    <div className="task">
      <div className="task-header">
        <div>
          <div className="task-title-row">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
            />
            <h3 className={task.completed ? 'strikethrough' : ''}>{task.title}</h3>
            <button
              className="status-badge"
              onClick={handleStatusChange}
              style={{ backgroundColor: STATUS_COLORS[task.status || 'pending'] }}
              title="Click to change status"
            >
              {STATUS_LABELS[task.status || 'pending']}
            </button>
          </div>
          {task.description && <p className="muted">{task.description}</p>}
        </div>
        <div className="task-actions">
          <button className="btn btn-ghost" type="button" onClick={() => onEditTask(task)}>
            Edit
          </button>
          <button className="btn btn-danger" type="button" onClick={() => onDeleteTask(task.id)}>
            Delete
          </button>
        </div>
      </div>

      <div className="subtask-list">
        {task.subtasks?.length > 0 ? (
          task.subtasks.map((subtask) => (
            <SubTaskItem
              key={subtask.id}
              taskId={task.id}
              subtask={subtask}
              onToggle={onToggleSubtask}
              onEdit={onEditSubtask}
              onDelete={onDeleteSubtask}
            />
          ))
        ) : (
          <p className="muted small">No subtasks yet</p>
        )}
      </div>
      <div className="task-footer">
        <button className="btn btn-primary" type="button" onClick={() => onAddSubtask(task.id)}>
          Add subtask
        </button>
      </div>
    </div>
  )
}

export default TaskItem

