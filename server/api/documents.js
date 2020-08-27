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
    const { description, type, doctorId, conditionId, formData } = req.body
    // req.files is the formData from frontend
    const values = Object.values(formData)
    const promises = values.map(image => cloudinary.uploader.upload(image.path, { type: 'private', upload_preset: 'capstone' }))
    const results = await Promise.all(promises)
    const documents = results.map(async result => {
      await Document.create({
        description,
        type,
        imageUrl: result.secure_url,
        userId: req.user.id,
        doctorId,
        conditionId
      })
    })
    res.json(documents)

  } catch (err) {
    next(err)
  }
})

// replaced the older document
router.put('/:id', isOwnerOrAdmin, async (req, res, next) => {
  try {
    const { description, type, doctorId, conditionId, formData } = req.body
    const { id } = req.params
    const document = await Document.findByPk(id)

    const image = formData.key
    const result = await cloudinary.uploader.upload(image.path, { type: 'private', upload_preset: 'capstone' })
    const document = await Document.update({
      description,
      type,
      imageUrl: result.secure_url,
      userId: req.user.id,
      doctorId,
      conditionId
    })
    res.json(document)
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

