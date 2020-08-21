const Condition = require('./condition');
const Patient_Condition = require('./patient_condition');
const Doctor = require('./doctor');
const Doctor_Patient = require('./doctor_patient');
const Medication = require('./medication');
const Patient = require('./patient');
const Patient_Medication = require('./patient_medication');


Doctor.belongsToMany(Patient, {
  through: {
    model: 'doctor_patient',
    as: 'doctorId',
    // unique: false
  }
});

Patient.belongsToMany(Doctor, {
  through: {
    model: 'doctor_patient',
    as: 'patientId',
    // unique: false
  }
});

Medication.belongsToMany(Patient, {
  through: {
    model: 'patient_medication',
  }
});

Patient.belongsToMany(Medication, {
  through: {
    model: 'patient_medication',
  }
});

Condition.belongsToMany(Patient, {
  through: {
    model: 'patient_condition',
  }
});


Patient.belongsToMany(Condition, {
  through: {
    model: 'patient_condition',
  }
});


module.exports = {
  Condition,
  Patient_Condition,
  Doctor,
  Doctor_Patient,
  Medication,
  Patient_Medication,
  Patient
};
