const Condition = require('./condition');
const Patient_Condition = require('./patient_condition');
const Doctor = require('./doctor');
const Doctor_Patient = require('./doctor_patient');
const Medication = require('./medication');
const Patient = require('./patient');
const Patient_Medication = require('./patient_medication');
// Doctor.belongsToMany(Patient, {
// through: {
//     model: 'Doctor_Patient',
//     as: 'doctorId',
//     // unique: false
//     }
// });

// Patient.belongsToMany(Doctor, {
//   through: {
//       model: 'Doctor_Patient',
//       as: 'patientId',
//       // unique: false
//     }
// });

// Medication.belongsToMany(Patient, {
//   through: {
//     model: 'Patient_Medication',
//     }
// });

// Condition.belongsToMany(Patient, {
//   through: {
//     model: 'Patient_Condition',
//   }
// });

module.exports = {
  Condition,
  Patient_Condition,
  Doctor,
  Doctor_Patient,
  Medication,
  Patient_Medication,
  Patient
};
