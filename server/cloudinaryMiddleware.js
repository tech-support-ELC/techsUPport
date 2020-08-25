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


module.exports = router;
