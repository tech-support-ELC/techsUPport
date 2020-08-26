const router = require("express").Router();
const cloudinary = require('cloudinary')
const authenticateToken = require('../auth/verifyToken')
const Document = require('../db/models')


// need to figure out the get request to get images from Cloudinary
//only authenticated user himself or admin can view, delete or update images
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const documents = await cloudinary.api.resources()
    if (documents) res.json(documents)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params
    const document = await Document.findByPk(id)
    if (document) res.json(document)
  } catch (err) {
    next(err)
  }
})

router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const values = Object.values(req.files)
    const promises = values.map(image => cloudinary.uploader.upload(image.path, { type: 'private' }))
    const documents = await Promise.all(promises)
    if (documents) res.json(documents)
  } catch (err) {
    next(err)
  }
})

//replaced the older document
// router.put('/', authenticateToken, async (req, res, next) => {
//   try {

//   } catch (err) {
//     next(err)
//   }
// })

router.delete('/:id', authenticateToken, async (req, res, next) => {
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

