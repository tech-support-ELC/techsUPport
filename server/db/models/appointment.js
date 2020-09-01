const Sequelize = require('sequelize');
const db = require('../db');


const Appointment = db.define('appointment', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    autoIncrement: true
  },

  appointmentDate: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
  },
  time: {
    type: Sequelize.TIME
  }
});

module.exports = Appointment;
