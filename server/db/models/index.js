const Condition = require('./condition');
const User_Condition = require('./user_condition');
const Doctor = require('./doctor');
// const Doctor_User = require('./doctor_User');
const Medication = require('./medication');
const User = require('./user');
const User_Medication = require('./user_medication');


Doctor.belongsTo(User)
User.hasMany(Doctor)

Medication.belongsToMany(User, {
  through: {
    model: 'user_medication',
  }
});

User.belongsToMany(Medication, {
  through: {
    model: 'user_medication',
  }
});

Condition.belongsToMany(User, {
  through: {
    model: 'user_condition',
  }
});


User.belongsToMany(Condition, {
  through: {
    model: 'user_condition',
  }
});
// Condition.belongsTo(User)

module.exports = {
  Condition,
  User_Condition,
  Doctor,
  // Doctor_User,
  Medication,
  User_Medication,
  User
};