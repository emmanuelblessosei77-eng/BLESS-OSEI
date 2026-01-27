const API_URL = 'http://localhost:5000/api'

export async function signupUser({ name, email, password }) {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Signup failed')
    }

    const data = await response.json()
    localStorage.setItem('dashboard_session_user', JSON.stringify(data.user))
    
    return data.user
  } catch (error) {
    throw new Error(error.message || 'Signup failed')
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }

    const data = await response.json()
    localStorage.setItem('dashboard_session_user', JSON.stringify(data.user))
    
    return data.user
  } catch (error) {
    throw new Error(error.message || 'Login failed')
  }
}

export async function logoutUser() {
  localStorage.removeItem('dashboard_session_user')
}

export function getCurrentUser() {
  const user = localStorage.getItem('dashboard_session_user')
  return user ? JSON.parse(user) : null
}