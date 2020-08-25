const Sequelize = require('sequelize');
const db = require('../db');

const Condition = db.define('condition', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  diagnosed: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  typeOfPain: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
});

module.exports = Condition;
