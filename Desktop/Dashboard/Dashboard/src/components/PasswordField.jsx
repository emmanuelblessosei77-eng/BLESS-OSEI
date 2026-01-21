import { useRef, useState } from 'react'

function PasswordField({ label, name, value, onChange, placeholder, error, disabled = false, ...rest }) {
  const [show, setShow] = useState(false)
  const inputRef = useRef(null)

  const handleToggle = () => {
    setShow(!show)
    // Force focus after toggle to ensure visibility
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }

  return (
    <label className="field">
      {label && <span className="field-label">{label}</span>}
      <div className="password-field-wrapper">
        <input
          ref={inputRef}
          className={`field-input password-input ${error ? 'has-error' : ''} ${disabled ? 'is-disabled' : ''}`}
          name={name}
          type={show ? 'text' : 'password'}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          {...rest}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={(e) => {
            e.preventDefault()
            handleToggle()
          }}
          disabled={disabled}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          <span className="password-toggle-icon">
            {show ? '👁️' : '👁️‍🗨️'}
          </span>
        </button>
      </div>
      {error && <span className="field-error">{error}</span>}
    </label>
  )
}

export default PasswordField
