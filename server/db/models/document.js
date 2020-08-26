const Sequelize = require('sequelize')
const db = require('../db')

const Document = db.define('documents', {
  type: {
    type: Sequelize.ENUM('Lab Result', 'Surgical Report', 'Imaging', 'Visit Summary'),
  },
  imageUrl: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false
  },
  timestamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
})

module.exports = Document
