const Sequelize = require('sequelize');
const db = require('../db');

const Patient_Medication = db.define('patient_medication', {
  date: {
    type: Sequelize.DATEONLY,
  }
});

module.exports = Patient_Medication;
