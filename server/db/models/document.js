const Sequelize = require('sequelize')
const db = require('../db')

const Document = db.define('documents', {
  description: {
    type: Sequelize.STRING,
    defaultValue: 'Undefined',
  },
  type: {
    type: Sequelize.ENUM('Proof of Identity', 'Lab Result', 'Surgical Report', 'Pathology Report', 'Imaging', 'Visit Summary'),
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    valideat: {
      notEmpty: true
    }
  },
  doctorId: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  conditionId: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  timestamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
})

module.exports = Document
