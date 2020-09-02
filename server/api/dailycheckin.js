const router = require('express').Router();
const Score = require('../db/models/score');
const Condition = require('../db/models/condition');
const Doctor = require('../db/models/doctor');
const Appointment = require('../db/models/appointment');
const Medication = require('../db/models/medication');
const DailyMed = require('../db/models/dailyMed');
module.exports = router;

router.post('/score', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const rate = req.body.rate.rate;
    const notes = req.body.rate.notes;
    const conditionId = req.body.rate.conditionId;
    const isSubmitted = req.body.rate.isSubmitted;
    const condition = await Condition.findOne({
      where: {
        id: conditionId
      }
    });
    const name = condition.name;
    const newScore = await Score.create({rate, notes, conditionId, userId, name, isSubmitted});
    res.status(201).json(newScore);
  } catch (error) {
    next(error);
  }
});

router.get('/dcscore', async (req, res, next) => {
  try {
    const date = new Date();
    const conditions = await Score.findAll({
      where: {
        userId: req.user.id,
        date
      }
    });
    if (conditions) res.status(200).json(conditions);
  } catch (error) {
    next(error);
  }
});
router.put('/dcscore/:id', async (req, res, next) => {
  try {
   const { name, rate, notes } = req.body;
   const selectedScore = await Score.findOne({
     where: {id: req.params.id}
   });
   if (selectedScore) {
     const updatedScore = await selectedScore.update({
       name: name || selectedScore.name,
       rate: rate || selectedScore.rate,
       notes: notes || selectedScore.notes,
     });
     res.status(200).json(updatedScore);
   } else {
     res.status(404).send('Score not found');
   }
  } catch (error) {
   next(error);
  }
});

router.post('/appointment', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const time = req.body.appointmentDate.time;
    const doctorId = req.body.appointmentDate.doctorId;
    const doctor = await Doctor.findOne({
      where: {
        id: doctorId
      }
    });
    const firstName = doctor.firstName;
    const lastName = doctor.lastName;
    const newAppointment = await Appointment.create({time, doctorId, userId, firstName, lastName});
    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
});

router.get('/dcappointment', async (req, res, next) => {
  try {
    const date = new Date();
    const appointments = await Appointment.findAll({
      where: {
        userId: req.user.id,
        appointmentDate: date
      }
    });
    if (appointments) res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
});
router.put('/dcappointment/:id', async (req, res, next) => {
  try {
   const { firstName, lastName, time } = req.body;
   const selectedAppointment = await Appointment.findOne({
     where: {id: req.params.id}
   });
   if (selectedAppointment) {
     const updatedAppointment = await selectedAppointment.update({
       firstName: firstName || selectedAppointment.firstName,
       lastName: lastName || selectedAppointment.lastName,
       time: time || selectedAppointment.time,
     });
     res.status(200).json(updatedAppointment);
   } else {
     res.status(404).send('Score not found');
   }
  } catch (error) {
   next(error);
  }
});
router.post('/meds', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const notes = req.body.notes.notes;
    const medicationId = req.body.notes.medicationId;
    const medication = await Medication.findOne({
      where: {
        id: medicationId
      }
    });
    const name = medication.name;
    const newDailyMed = await DailyMed.create({notes, medicationId, userId, name});
    res.status(201).json(newDailyMed);
  } catch (error) {
    next(error);
  }
});

router.get('/dcmeds', async (req, res, next) => {
  try {
    const date = new Date();
    const medications = await DailyMed.findAll({
      where: {
        userId: req.user.id,
        date
      }
    });
    if (medications) res.status(200).json(medications);
  } catch (error) {
    next(error);
  }
});
router.put('/dcmeds/:id', async (req, res, next) => {
  try {
   const { name, notes } = req.body;
   const selectedDailyMed = await DailyMed.findOne({
     where: {id: req.params.id}
   });
   if (selectedDailyMed) {
     const updatedDailyMed = await selectedDailyMed.update({
       name: name || selectedDailyMed.name,
       notes: notes || selectedDailyMed.notes,
     });
     res.status(200).json(updatedDailyMed);
   } else {
     res.status(404).send('DailyMed not found');
   }
  } catch (error) {
   next(error);
  }
});
