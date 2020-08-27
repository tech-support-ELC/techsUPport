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
  }
});

module.exports = DailyMed;
