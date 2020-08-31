const {expect} = require('chai');
const request = require('supertest');
const db = require('../server/db/db');
const app = require('../server');
const DailyMed = db.model('dailyMed');
describe('DailyMed routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });
  describe('/api/dailycheckin/meds', () => {
      beforeEach(() => {
        return DailyMed.create({
          notes: "Makes feel sleepy",
          medicationId: 1,
          userId: 1,
        });
      });
      it('GET /api/dailycheckin/meds responds with all dailyMeds', async () => {
        const res = await request(app)
          .get('/api/dailycheckin/meds')
          .expect(200);
        expect(res.body).to.be.an('array');
        expect(res.body.notes).to.be.equal('Makes feel sleepy');
        expect(res.body.medicationId).to.be.equal(1);
      });
      it('POST /api/dailycheckin/meds creates a new dailyMed and sends it back', async () => {
        const res = await request(app)
          .post('/api/dailycheckin/meds')
          .send({
            notes: "Makes feel dizzy",
            medicationId: 1,
            userId: 1,
          })
          .expect(201);
        const createdDailyMed = await DailyMed.findByPk(res.body.id);
        expect(createdDailyMed.notes).to.be.equal('Makes feel dizzy');
        expect(createdDailyMed.userId).to.be.equal(1);
      });
    });
});
