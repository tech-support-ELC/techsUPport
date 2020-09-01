const Sequelize = require('sequelize');
const db = require('../db');


const Appointment = db.define('appointment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  appointmentDate: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
  },
  time: {
    type: Sequelize.TIME
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

module.exports = Appointment;
