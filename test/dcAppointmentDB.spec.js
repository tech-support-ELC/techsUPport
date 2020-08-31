const {expect} = require('chai');
const db = require('../server/db/db');
const Appointment = db.model('appointment');

describe('Appointment model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('column definitions and validations', () => {
    let appointment;

    beforeEach(async () => {
      appointment = await Appointment.create({
        appointmentDate: "2020-07-01",
        time: "13:00",
        doctorId: 1,
        userId: 1,
      });
    });

    it('has a `appointmentDate`, `time`, `doctorId`, `userId`', () => {
      expect(appointment.appointmentDate).to.equal('2020-07-01');
      expect(appointment.time).to.equal('13:00');
      expect(appointment.doctorId).to.equal(1);
      expect(appointment.userId).to.equal(1);
    });
  });
});
