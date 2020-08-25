const router = require("express").Router();
const cloudinary = require('cloudinary')

router.post('/', async (req, res, next) => {
  try {
    const values = Object.values(req.files)
    console.log(req.files)
    const promises = values.map(image => cloudinary.uploader.upload(image.path))
    const documents = await Promise.all(promises)
    res.json(documents)

  } catch (err) {
    next(err)
  }

})

module.exports = router;

