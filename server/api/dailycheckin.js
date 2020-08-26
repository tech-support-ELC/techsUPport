const router = require('express').Router();
const Score = require('../db/models/score');
const Condition = require('../db/models/condition');
const Doctor = require('../db/models/doctor');
const Appointment = require('../db/models/appointment');
module.exports = router;

router.get('/score', async (req, res, next) => {
  try {
    const conditions = await Condition.findAll({
      where: {
        userId: req.user.id,
      }
    });
    if (conditions) res.json(conditions);
  } catch (error) {
    next(error);
  }
});
router.post('/score', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const rate = req.body.rate.rate;
    const date = req.body.rate.date;
    const notes = req.body.rate.notes;
    const conditionId = req.body.rate.conditionId;
    // console.log(req.body);
    const newScore = await Score.create({rate, date, notes, conditionId, userId});
    res.json(newScore);
  } catch (error) {
    next(error);
  }
});

router.get('/appointment', async (req, res, next) => {
  try {
    const appointments = await Doctor.findAll({
      where: {
        userId: req.user.id,
      }
    });
    if (appointments) res.json(appointments);
  } catch (error) {
    next(error);
  }
});
router.post('/appointment', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const time = req.body.appointmentDate.time;
    const doctorId = req.body.appointmentDate.doctorId;
    console.log(req.body);
    const newAppointment = await Appointment.create({time, doctorId, userId});
    res.json(newAppointment);
  } catch (error) {
    next(error);
  }
});
