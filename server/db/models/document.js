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
    defaultValue: 'https://cdn2.iconfinder.com/data/icons/files-lineal/64/file-blank-empty-default-512.png'
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
