const Sequelize = require("sequelize");
const db = require('../db');

const Medication = db.define("medication", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  dosage: {
    type: Sequelize.STRING,
  },
  frequency: {
    type: Sequelize.STRING,
  },
});
module.exports = Medication;
