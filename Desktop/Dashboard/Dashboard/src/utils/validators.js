export const validateEmail = (email) => {
  if (!email) return 'Email is required'
  if (!email.includes('@') || !email.includes('.')) {
    return 'Valid email required'
  }
  return null
}

export const validatePassword = (password, minLength = 6) => {
  if (!password) return 'Password is required'
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters`
  }
  return null
}

export const validateName = (name) => {
  if (!name.trim()) return 'Name is required'
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters'
  }
  return null
}

export const validateConfirmPassword = (confirmPassword, formData) => {
  let password, confirm
  
  if (typeof formData === 'object' && formData !== null) {
    password = formData.password || ''
    confirm = confirmPassword
  } else {
    password = confirmPassword
    confirm = formData
  }

  if (!confirm) return 'Confirm password is required'
  if (password !== confirm) {
    return 'Passwords do not match'
  }
  return null
}

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`
  }
  return null
}

export const validateMinLength = (value, minLength, fieldName) => {
  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`
  }
  return null
}

export const validateMaxLength = (value, maxLength, fieldName) => {
  if (value.length > maxLength) {
    return `${fieldName} must not exceed ${maxLength} characters`
  }
  return null
}

export const validatePattern = (value, pattern, message) => {
  if (!pattern.test(value)) {
    return message || 'Invalid format'
  }
  return null
}

export default {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validatePattern,
}
