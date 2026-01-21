import { initialUsers } from '../utils/mockData.js'
import { readFromStorage, writeToStorage } from '../utils/storage.js'

const USERS_KEY = 'dashboard_users'
const SESSION_KEY = 'dashboard_session_user'

function ensureSeeded() {
  const existing = readFromStorage(USERS_KEY, [])
  if (!existing.length) {
    writeToStorage(USERS_KEY, initialUsers)
  }
}

export function getUsers() {
  ensureSeeded()
  return readFromStorage(USERS_KEY, [])
}

export function saveUsers(users) {
  writeToStorage(USERS_KEY, users)
}

export function getCurrentUser() {
  return readFromStorage(SESSION_KEY, null)
}

export function signupUser({ name, email, password }) {
  if (!name || !email || !password) {
    throw new Error('All fields are required')
  }

  const users = getUsers()
  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (exists) {
    throw new Error('Email already registered')
  }

  const newUser = {
    id: crypto.randomUUID?.() ?? String(Date.now()),
    name,
    email,
    password,
  }

  const updated = [...users, newUser]
  saveUsers(updated)
  writeToStorage(SESSION_KEY, newUser)
  return newUser
}

export function loginUser({ email, password }) {
  const users = getUsers()
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  )

  if (!user) {
    throw new Error('Invalid credentials')
  }

  writeToStorage(SESSION_KEY, user)
  return user
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY)
}

