const Sequelize = require('sequelize')
const db = require('../db')

const Document = db.define('documents', {
  description: {
    type: Sequelize.STRING,
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
  timestamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
})

module.exports = Document
