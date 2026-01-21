import { useState, useCallback, useRef } from 'react'

export function useFormValidation(initialState, validators) {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const formRef = useRef(form)

  formRef.current = form

  const validateField = useCallback(
    (name, value, currentForm) => {
      const validator = validators[name]
      if (!validator) return null
      return validator(value, currentForm)
    },
    [validators],
  )

  const validateForm = useCallback(
    (formData) => {
      const nextErrors = {}
      let valid = true

      Object.keys(validators).forEach((fieldName) => {
        const error = validateField(fieldName, formData[fieldName], formData)
        if (error) {
          nextErrors[fieldName] = error
          valid = false
        }
      })

      setErrors(nextErrors)
      setIsValid(valid)
      return valid
    },
    [validators, validateField],
  )

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target
      const updatedForm = { ...form, [name]: value }
      setForm(updatedForm)
      validateForm(updatedForm)
    },
    [form, validateForm],
  )

  const setFormValues = useCallback((values) => {
    setForm(values)
    validateForm(values)
  }, [validateForm])

  const resetForm = useCallback(() => {
    setForm(initialState)
    setErrors({})
    setIsValid(false)
  }, [initialState])

  return {
    form,
    errors,
    isValid,
    handleChange,
    setFormValues,
    resetForm,
    validateForm,
  }
}

export default useFormValidation
