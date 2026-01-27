import { createUser, findUserByEmail, validatePassword } from '../models/User.js'

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const user = await createUser(name, email, password)
    
    res.status(201).json({
      message: 'User created successfully',
      user
    })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' })
    }

    const user = await findUserByEmail(email)
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isPasswordValid = await validatePassword(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    res.json({
      message: 'Login successful',
      user: userWithoutPassword
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}
