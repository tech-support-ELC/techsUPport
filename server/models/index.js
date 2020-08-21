const Doctor = require('./doctor')
const Doctor_Patient = require('./doctor_patient')


//Doctor.belongsToMany(Patient, {
// through: {
//     model: 'Doctor_Patient',
//         as: doctorId
//     }
// })
module.exports = {
    Doctor,
    Doctor_Patient
}