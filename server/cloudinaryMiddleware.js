require('dotenv').config()
const express = require("express");
const router = express.Router()
const cloudinary = require('cloudinary')
const formData = require('express-form-data');

cloudinary.config({
  cloud_name: 'elementhealth',
  api_key: '871743681155392',
  api_secret: 'BY9zyEdrC_o7qWN4KdF_A8bSE6o'
})
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// })
router.use(formData.parse())


module.exports = router;
