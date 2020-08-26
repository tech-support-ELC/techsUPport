const Condition = require("./condition");
const Score = require("./score");
const Doctor = require("./doctor");
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
    model: "score",
  },
});

User.belongsToMany(Condition, {
  through: {
    model: "score",
  },
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
