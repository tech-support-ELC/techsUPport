const router = require('express').Router()
module.exports = router
const Doctor = require('../db/models/doctor')

router.post('/', async (req, res, next) => {
    try {
        const newDoctor = await Doctor.create(req.body)
        res.json(newDoctor)
    } catch (error) {
        next(error)
    }
})