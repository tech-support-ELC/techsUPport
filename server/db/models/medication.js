const Sequelize = require("sequelize");
const db = require("../db");

const Medication = db.define("medication", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  dosage: {
    type: Sequelize.FLOAT,
  },
  dosageUnit: {
    type: Sequelize.ENUM(
      "g",
      "mg",
      "mg/kg",
      "mL",
      "pills",
      "capsules",
      "tablets",
      "drops"
    ),
  },
  frequency: {
    type: Sequelize.INTEGER,
  },
  frequencyUnit: {
    type: Sequelize.ENUM("day", "hour", "week", "as needed"),
  },
});
module.exports = Medication;
