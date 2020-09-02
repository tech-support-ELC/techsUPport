const Sequelize = require('sequelize');
const db = require('../db');

const DailyMed = db.define('dailyMed', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  notes: {
    type: Sequelize.TEXT
  },
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
  },
  name: {
    type: Sequelize.STRING
  }
});

module.exports = DailyMed;
