import Spinner from './Spinner.jsx'

function FormMessage({ type = 'error', message }) {
  if (!message) return null

  const classes =
    type === 'error'
      ? 'form-message form-message-error'
      : 'form-message form-message-success'

  return <div className={classes}>{message}</div>
}

export default FormMessage
