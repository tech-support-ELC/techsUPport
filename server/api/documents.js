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

router.post('/', async (req, res, next) => {
  try {
    console.log('formData', req.body)
    const { description, type, doctorId, conditionId, formData } = req.body;
    console.log('formData', formData)
    // req.files is the formData from frontend
    const values = Object.values(formData)
    const promises = values.map(image => cloudinary.uploader.upload(image.path, { type: 'private', upload_preset: 'capstone' }))
    const results = await Promise.all(promises)
    console.log('values', values)
    console.log('promises', promises)
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
    // const newDoc = await Document.create({
    //   description,
    //   type,
    //   imageUrl: 'result.secure_url',
    //   userId: req.user.id,
    //   doctorId,
    //   conditionId
    // })
    // console.log('documents', documents)
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
    const updatedDoc = await document.update({
      description,
      type,
      imageUrl: result.secure_url,
      userId: req.user.id,
      doctorId,
      conditionId
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

