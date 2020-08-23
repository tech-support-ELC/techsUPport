const Sequelize = require('sequelize')
const db = require('../db');

const User_Condition = db.define('user_condition', {
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

module.exports = User_Condition;
