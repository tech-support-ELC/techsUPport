const Sequelize = require('sequelize');
const db = require('../db');

const Score = db.define('score', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rate: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 10
    }
  },
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
  },
  notes: {
    type: Sequelize.TEXT
  },
  name: {
    type: Sequelize.STRING
  }
});

module.exports = Score;
