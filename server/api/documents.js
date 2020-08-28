const router = require("express").Router();
const cloudinary = require('cloudinary')
// const authenticateToken = require('../auth/verifyToken')
const { Document, User } = require('../db/models')
const { isOwnerOrAdmin } = require('../auth/authenticateUser')

router.get('/', isOwnerOrAdmin, async (req, res, next) => {
  try {
    const documents = await Document.findAll({
      where: { userId: req.user.id }
    })
    if (documents) res.json(documents)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isOwnerOrAdmin, async (req, res, next) => {
  try {
    const { id } = req.params
    const document = await Document.findByPk(id)
    if (document) res.json(document)
  } catch (err) {
    next(err)
  }
})

router.post('/', isOwnerOrAdmin, async (req, res, next) => {
  try {
    const { description, type, doctorId, conditionId, imageUrl } = req.body
    const document = await Document.create({
      description, type, doctorId, conditionId, imageUrl,
      userId: req.user.id
    })
    res.json(document)
  } catch (err) {
    next(err)
  }
})

// replaced the older document
router.put('/:id', isOwnerOrAdmin, async (req, res, next) => {
  try {
    const { description, type, doctorId, conditionId, imageUrl } = req.body
    const { id } = req.params
    const document = await Document.findByPk(id)
    const updatedDoc = await document.update({
      description, type, doctorId, conditionId, imageUrl,
      userId: req.user.id,
    })
    res.json(updatedDoc)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isOwnerOrAdmin, async (req, res, next) => {
  try {
    const { id } = req.params
    const document = await Document.findByPk(id)
    if (document) {
      await document.destroy()
      res.sendStatus(204)
    }
  } catch (err) {
    next(err)
  }
})


module.exports = router;

