function SubTaskItem({ taskId, subtask, onToggle, onEdit, onDelete }) {
  return (
    <div className="subtask">
      <label className="subtask-title">
        <input
          type="checkbox"
          checked={subtask.completed}
          onChange={async () => {
            try {
              await onToggle(subtask)
            } catch (error) {
              console.error('Failed to toggle subtask:', error)
            }
          }}
        />
        <span className={subtask.completed ? 'muted strikethrough' : ''}>
          {subtask.title}
        </span>
      </label>
      <div className="subtask-actions">
        <button className="btn btn-ghost" type="button" onClick={() => onEdit(taskId, subtask)}>
          Edit
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={async () => {
            try {
              await onDelete(subtask.id)
            } catch (error) {
              console.error('Failed to delete subtask:', error)
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default SubTaskItem

