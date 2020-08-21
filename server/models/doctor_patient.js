const Sequelize = require('sequelize')
const db = require('../db/db');

const Doctor_Patient = db.define('doctor_patients', {
    appointmentDate: {
        type: Sequelize.DATEONLY
    }
})

module.exports = Doctor_Patient
