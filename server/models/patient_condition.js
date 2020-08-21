const Sequelize = require('sequelize')
const db = require('../db/db');

const Patient_Condition = db.define('patient_condition', {
  value: {
    type: Sequelize.INTEGER,
  },
  date: {
    type: Sequelize.DATE,
  },
  notes: {
    type: Sequelize.TEXT
  }
});

module.exports = Patient_Condition;
