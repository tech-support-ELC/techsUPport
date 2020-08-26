const router = require("express").Router();
const cloudinary = require('cloudinary')
const authenticateToken = require('../auth/verifyToken')

// need to figure out the get request to get images from Cloudinary
//only authenticated user himself or admin can view, delete or update images
router.get('/', async (req, res, next) => {
  try {
    const documents = await cloudinary.v2.search.execute()
    if (documents) res.json(documents)
  } catch (err) {
    next(err)
  }
})


router.post('/', async (req, res, next) => {
  try {
    const values = Object.values(req.files)
    const promises = values.map(image => cloudinary.uploader.upload(image.path, { type: 'private' }))
    const documents = await Promise.all(promises)
    res.json(documents)

  } catch (err) {
    next(err)
  }

})

module.exports = router;

