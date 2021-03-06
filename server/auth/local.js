// require('dotenv').config()
const router = require('express').Router()
const { User, Doctor, Condition, Document } = require('../db/models/')
// const jwt = require('jsonwebtoken')

// function generateAccessToken(user) {
//   return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
// }

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    })
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      // const accessToken = generateAccessToken(user)
      // const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET)
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.delete('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.sendStatus(204)
})

router.get('/me', async (req, res) => {
  const { id } = req.user
  const user = await User.findByPk(id, { include: [Document, Doctor, Condition] })
  res.json(user)
})


module.exports = router
