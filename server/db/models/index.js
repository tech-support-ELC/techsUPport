const Condition = require('./condition');
const Score = require('./score');
const Doctor = require('./doctor');
const Appointment = require('./appointment');
const Medication = require("./medication");
const User = require("./user");
const User_Medication = require("./user_medication");
const Document = require("./document")


// Uploaded documents associations
User.hasMany(Document)
Document.belongsTo(User)
Doctor.hasMany(Document)
Document.belongsTo(Doctor)
Document.belongsTo(Condition)
Condition.hasMany(Document)

Medication.belongsTo(User);
User.hasMany(Medication);

// Medication.belongsToMany(User, {
//   through: {
//     model: "user_medication",
//   },
// });

// User.belongsToMany(Medication, {
//   through: {
//     model: "user_medication",
//   },
// });
Condition.belongsTo(User);
User.hasMany(Condition);
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

Doctor.belongsTo(User);
User.hasMany(Doctor);
Doctor.belongsToMany(User, {
  through: {
    model: 'appointment',
    unique: false
  }
});
User.belongsToMany(Doctor, {
  through: {
    model: 'appointment',
    unique: false
  }
});

module.exports = {
  Condition,
  Score,
  Doctor,
  Appointment,
  Medication,
  // User_Medication,
  User,
  Document
};
