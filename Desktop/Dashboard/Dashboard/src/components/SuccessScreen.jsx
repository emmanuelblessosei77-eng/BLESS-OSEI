function SuccessScreen({ title, message }) {
  return (
    <div className="form-success">
      <div className="success-icon">✓</div>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  )
}

export default SuccessScreen
