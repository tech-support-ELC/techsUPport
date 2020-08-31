const {expect} = require('chai');
const request = require('supertest');
const db = require('../server/db/db');
const app = require('../server');
const Appointment = db.model('appointment');
describe('appointment routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });
  describe('/api/dailycheckin/appointment', () => {
      beforeEach(() => {
        return Appointment.create({
          appointmentDate: '2020-08-28',
          time: '13:00',
          doctorId: 1,
          userId: 1,
        });
      });
      it('GET /api/dailycheckin/appointment responds with all appointments', async () => {
        const res = await request(app)
          .get('/api/dailycheckin/appointment')
          .expect(200);
        expect(res.body).to.be.an('array');
        expect(res.body.appointmentDate).to.be.equal('2020-08-28');
        expect(res.body.time).to.be.equal('13:00');
      });
      it('POST /api/dailycheckin/appointment creates a new appointment and sends it back', async () => {
        const res = await request(app)
          .post('/api/dailycheckin/appointment')
          .send({
            appointmentDate: '2020-08-28',
            time: '13:00',
            doctorId: 1,
            userId: 1,
          })
          .expect(201);
        const createdAppointment = await Appointment.findByPk(res.body.id);
        expect(createdAppointment.appointmentDate).to.be.equal('2020-08-28');
        expect(createdAppointment.time).to.be.equal('13:00');
      });
    });
});
