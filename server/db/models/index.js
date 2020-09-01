const Condition = require('./condition');
const Score = require('./score');
const Doctor = require('./doctor');
const Appointment = require('./appointment');
const Medication = require("./medication");
const User = require("./user");
const Document = require("./document")
const DailyMed = require('./dailyMed');


// Uploaded documents associations
User.hasMany(Document)
Document.belongsTo(User)
Doctor.hasMany(Document)
Document.belongsTo(Doctor)
Document.belongsTo(Condition)
Condition.hasMany(Document)

Medication.belongsTo(User);
User.hasMany(Medication);
Medication.belongsToMany(User, {
  through: {
    model: "dailyMed",
    unique: false
  },
});

User.belongsToMany(Medication, {
  through: {
    model: "dailyMed",
    unique: false
  },
});

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

// Doctor.belongsTo(User);
// User.hasMany(Doctor);
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
  DailyMed,
  User,
  Document
};
