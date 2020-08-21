const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("medication", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  dosage: {
    type: Sequelize.STRING,
  },
  frequency: {
    type: Sequelize.STRING,
  },
});
