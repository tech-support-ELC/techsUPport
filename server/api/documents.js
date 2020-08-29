const router = require("express").Router();
const cloudinary = require('cloudinary')
// const authenticateToken = require('../auth/verifyToken')
const { Document } = require('../db/models')
const { isOwnerOrAdmin } = require('../auth/authenticateUser')

router.param('id', async (req, res, next, id) => {
  try {
    id = req.params.id
    const document = await Document.findByPk(id)
    if (!document) res.sendStatus(404)
    req.requestedDoc = document
    next()
    return null
  } catch (err) {
    next(err)
  }
})

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
    const document = await req.requestedDoc
    res.json(document)
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
    const updatedDoc = await req.requestedDoc.update(req.body)
    res.json(updatedDoc)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isOwnerOrAdmin, async (req, res, next) => {
  try {
    await req.requestedDoc.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})


module.exports = router;

