export function authMiddleware(req, res, next) {
  try {
    const userId = req.body.user_id || req.query.user_id || req.headers['x-user-id']

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' })
    }

    req.userId = userId
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid authentication' })
  }
}
