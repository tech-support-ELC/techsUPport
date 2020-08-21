const Condition = require('./condition');
const Patient_Condition = require('./patient_condition');
const Doctor = require('./doctor')
const Doctor_Patient = require('./doctor_patient')





//Doctor.belongsToMany(Patient, {
// through: {
//     model: 'Doctor_Patient',
//         as: doctorId
//     }
// })



module.exports = {
  Condition,
  Patient_Condition,
  Doctor,
  Doctor_Patient
};