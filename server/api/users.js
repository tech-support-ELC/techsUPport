require('dotenv').config()

const router = require('express').Router()
const { User } = require('../db/models/')
const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
  //Bearer TOKEN
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // no longer valid token
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

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
