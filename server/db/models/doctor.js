const Sequelize = require('sequelize')
const db = require('../db');

const Doctor = db.define('doctors', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    doctorType: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Doctor
