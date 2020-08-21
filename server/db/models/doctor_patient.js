const Sequelize = require('sequelize')
const db = require('../db');


const Doctor_Patient = db.define('doctor_patient', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    appointmentDate: {
        type: Sequelize.DATEONLY
    }
})

module.exports = Doctor_Patient
