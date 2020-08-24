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

router.get('/:id', async (req, res, next) => {
    try {
        const allDoctors = await Doctor.findAll({ where: { id: req.params.id } })
        if (allDoctors) {
            res.json(allDoctors)
        }
    } catch (error) {
        next(error)
    }
})