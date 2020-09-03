const router = require('express').Router()
module.exports = router
const Doctor = require('../db/models/doctor')
const Appointment = require('../db/models/appointment')

router.post('/', async (req, res, next) => {
    try {
        const newDoctor = await Doctor.create(req.body)
        res.json(newDoctor)
    } catch (error) {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const allDoctors = await Doctor.findAll({ where: { userId: req.user.id } })
        if (allDoctors) {
            res.json(allDoctors)
        }
    } catch (error) {
        next(error)
    }
})
router.get('/appointments', async (req, res, next) => {
    try {
        const allDoctors = await Appointment.findAll({ where: { userId: req.user.id } })
        if (allDoctors) {
            res.json(allDoctors)
        }
    } catch (error) {
        next(error)
    }
})
router.get('/:id', async (req, res, next) => {
    try {
        const oneDoctor = await Doctor.findOne({
            where: { id: req.params.id, userId: req.user.id }
        })
        if (oneDoctor) {
            res.json(oneDoctor)
        }
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const doctorToChange = await Doctor.findOne({ where: { id: req.params.id } })
        if (doctorToChange) {
            const updatedDoc = await doctorToChange.update(req.body)
            res.json(updatedDoc)
        } else {
            res.status(404).send('doctor not found')
        }

    } catch (error) {
        next(error)
    }
})


router.delete('/:id', async (req, res, next) => {
    try {
        await Doctor.destroy({ where: { id: req.params.id } })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})