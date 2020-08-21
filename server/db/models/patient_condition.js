const Sequelize = require('sequelize')
const db = require('../db');

const Patient_Condition = db.define('patient_condition', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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
