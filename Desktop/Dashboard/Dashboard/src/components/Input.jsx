function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  ...rest
}) {
  return (
    <label className="field">
      {label && <span className="field-label">{label}</span>}
      <input
        className={`field-input ${error ? 'has-error' : ''} ${disabled ? 'is-disabled' : ''}`}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      {error && <span className="field-error">{error}</span>}
    </label>
  )
}

export default Input

