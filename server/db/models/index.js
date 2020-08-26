<<<<<<< HEAD
const Condition = require("./condition");
// const User_Condition = require('./user_condition');
const Doctor = require("./doctor");
=======
const Condition = require('./condition');
const Score = require('./score');
const Doctor = require('./doctor');
>>>>>>> b9a45833a8e6731363923532f8c58d3154621fb3
// const Doctor_User = require('./doctor_User');
const Medication = require("./medication");
const User = require("./user");
const User_Medication = require("./user_medication");

Doctor.belongsTo(User);
User.hasMany(Doctor);

Medication.belongsTo(User);
User.hasMany(Medication);

Medication.belongsToMany(User, {
  through: {
    model: "user_medication",
  },
});

User.belongsToMany(Medication, {
  through: {
    model: "user_medication",
  },
});

Condition.belongsToMany(User, {
  through: {
    model: 'score',
    unique: false
  }
});

User.belongsToMany(Condition, {
  through: {
    model: 'score',
    unique: false
  }
});
Condition.belongsTo(User);
User.hasMany(Condition);
module.exports = {
  Condition,
  // User_Condition,
  Doctor,
  // Doctor_User,
  Medication,
  // User_Medication,
  User,
};
