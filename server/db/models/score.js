const Sequelize = require('sequelize');
const db = require('../db');

const Score = db.define('score', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  value: {
    type: Sequelize.INTEGER,
  },
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
  },
  notes: {
    type: Sequelize.TEXT
  }
});

module.exports = Score;
