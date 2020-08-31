const {expect} = require('chai');
const request = require('supertest');
const db = require('../server/db/db');
const app = require('../server');
const Condition = db.model('condition');
describe('Condition routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });
  describe('/api/conditions', () => {
      beforeEach(() => {
        return Condition.create({
          name: "Hypertension",
          diagnosed: "yes",
          typeOfPain: "physical",
          userId: 1,
        });
      });
      it('GET /api/conditions responds with all conditions', async () => {
        const res = await request(app)
          .get('/api/conditions')
          .expect(200);
        expect(res.body).to.be.an('array');
        expect(res.body.name).to.be.equal('Hypertension');
        expect(res.body.diagnosed).to.be.equal('yes');
      });
      it('GET /api/conditions/:id responds with specific condition', async () => {
        const res = await request(app)
          .get('/api/conditions/1')
          .expect(200);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.be.equal('Hypertension');
        expect(res.body.diagnosed).to.be.equal('yes');
      });
      it('POST /api/conditions creates a new condition and sends it back', async () => {
        const res = await request(app)
          .post('/api/conditions')
          .send({
            name: 'Major Depression',
            diagnosed: 'yes',
            typeOfPain: "mental health",
            userId: 1,
          })
          .expect(201);
        const createdCondition = await Condition.findByPk(res.body.id);
        expect(createdCondition.name).to.be.equal('Major Depression');
        expect(createdCondition.diagnosed).to.be.equal('yes');
      });
      it('PUT /api/conditions/:id updates an existing condition', async () => {
        const res = await request(app)
          .put(`/api/conditions/1`)
          .send({
            diagnosed: 'no'
          })
          .expect(200);
        expect(res.body).to.be.an('object');
        expect(res.body.diagnosed).to.equal('no');
        const conditionFromDatabase = await Condition.findByPk(res.body.id);
        expect(conditionFromDatabase.diagnosed).to.equal('no');
      });
      it('DELETE /api/conditions/:id removes a condition from the database', async () => {
        const res = await request(app)
          .delete('/api/conditions/1')
          .expect(204);
        const isHypertensionInDB = await Condition.findByPk(res.body.id);
        expect(isHypertensionInDB).to.equal(null);
      it('sends a 404 if not found', () => {
        return request(app)
          .delete(`/api/conditions/1`)
          .expect(404);
      });
    });
  });
});
