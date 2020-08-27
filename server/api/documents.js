const router = require("express").Router();
const cloudinary = require('cloudinary')
// const authenticateToken = require('../auth/verifyToken')
const { Document, User } = require('../db/models')
const { isOwner } = require('../auth/authenticateUser')


router.get('/', isOwner, async (req, res, next) => {
  try {
    const documents = await Document.findAll({
      where: { userId: req.user.id }
    })
    if (documents) res.json(documents)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isOwner, async (req, res, next) => {
  try {
    const { id } = req.params
    const document = await Document.findByPk(id, { where: { userId: id } })
    if (document) res.json(document)
  } catch (err) {
    next(err)
  }
})

router.post('/', isOwner, async (req, res, next) => {
  try {
    const { description, type, labelDoctor, labelCondition, formData } = req.body
    // req.files is the formData from frontend
    const values = Object.values(formData)
    const promises = values.map(image => cloudinary.uploader.upload(image.path, { type: 'private', upload_preset: 'capstone' }))
    const documents = await Promise.all(promises)
    documents.forEach(async document => {
      await Document.create({
        description,
        imageUrl: document.secure_url,
        userId: req.user.id,
        doctorId:
          conditionId
      })
    })
    res.json(documents)

  } catch (err) {
    next(err)
  }
})

//replaced the older document
// router.p ut('/', authenticateToken, async (req, res, next) => {
//   try {

//   } catch (err) {
//     next(err)
//   }
// })

router.delete('/:id', isOwner, async (req, res, next) => {
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

