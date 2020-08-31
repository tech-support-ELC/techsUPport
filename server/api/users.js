const router = require('express').Router()
const { User, Document, Doctor, Condition } = require('../db/models/')
const { isAdmin } = require('../auth/authenticateUser')

// for any /users/:id routes, this piece of middleware
// will be executed, and put the user on `req.requestedUser`
router.param('id', async (req, res, next, id) => {
  try {
    id = req.user.id
    const user = await User.findByPk(id, { include: [Doctor, Condition, Document] })
    if (!user) res.sendStatus(404)
    req.requestedUser = user
    next()
    return null
  } catch (err) {
    next(err)
  }
})

router.get('/', isAdmin, async (req, res, next) => {
  // after jwt, we have our req.user as the authenticated user
  try {
    const users = await User.findAll(
      { attributes: ['firstName', 'lastName', 'id', 'email'] })
    if (users) res.json(users)
    else res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isAdmin, async (req, res, next) => {
  try {
    const user = await req.requestedUser
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const updatedUser = await req.requestedUser.update(req.body)
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    await req.requestedUser.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
