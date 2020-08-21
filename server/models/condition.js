const Sequelize = require('sequelize')
// const db = require('./db')

const Condition = db.define('condition', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  diagnosed: {
    type: Sequelize.BOOLEAN,
  },
  typeOfPain: {
    type: Sequelize.ENUM('physical', 'mental health')
  }
});

module.exports = Condition;
