const router = require('express').Router()
const { User } = require('../db/models/')
const authenticateToken = require('../auth/verifyToken')


router.get('/', authenticateToken, async (req, res, next) => {
  // after jwt, we have our req.user as the authenticated user
  try {
    const users = await User.findAll()
    res.json(users.filter(user => user.email === req.user.email))
  } catch (err) {
    next(err)
  }
})


module.exports = router
