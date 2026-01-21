import Input from './Input.jsx'

function FormFields({ fields, formData, errors, loading, onChange }) {
  return (
    <>
      {fields.map((field) => (
        <Input
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type || 'text'}
          value={formData[field.name] || ''}
          onChange={onChange}
          placeholder={field.placeholder}
          error={errors[field.name]}
          disabled={loading}
          required={field.required}
        />
      ))}
    </>
  )
}

export default FormFields
