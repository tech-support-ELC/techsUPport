const router = require('express').Router()
module.exports = router
const Doctor = require('../db/models/doctor')

router.post('/', async (req, res, next) => {
    try {
        console.log('inside the add doctor route', req.body)
        const newDoctor = await Doctor.create(req.body)
        res.json(newDoctor)
    } catch (error) {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const allDoctors = await Doctor.findAll()
        res.json(allDoctors)
    } catch (error) {
        next(error)
    }
})