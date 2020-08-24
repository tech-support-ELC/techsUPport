const router = require('express').Router()
const localRouter = require('./local')
const googleRouter = require('./google')
const facebookRouter = require('./facebook')

router.use('/local', localRouter)
router.use('/google', googleRouter)
router.use('/facebook', facebookRouter)

module.exports = router
