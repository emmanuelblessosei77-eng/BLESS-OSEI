function CheckboxField({ label, name, checked, onChange, disabled = false }) {
  return (
    <label className="checkbox-label">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span>{label}</span>
    </label>
  )
}

export default CheckboxField
