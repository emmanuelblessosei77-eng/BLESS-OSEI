function FormContainer({ children, onSubmit, disabled = false }) {
  return (
    <form className="form-container stack" onSubmit={onSubmit} disabled={disabled}>
      {children}
    </form>
  )
}

export default FormContainer
