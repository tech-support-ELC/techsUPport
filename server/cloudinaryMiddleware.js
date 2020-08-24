require('dotenv').config()
const express = require("express");
const cloudinary = require('cloudinary')
const formData = require('express-form-data');
const app = express()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

app.use(formData.parse())


