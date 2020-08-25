require('dotenv').config()
const express = require("express");
const router = express.Router()
const cloudinary = require('cloudinary')
const formData = require('express-form-data');
const cors = require('cors')
const CLIENT_ORIGIN = 'http://localhost:5000'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

router.use(cors({
  origin: CLIENT_ORIGIN
}))

router.use(formData.parse())

router.post('/uploadDocuments', async (req, res, next) => {
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
