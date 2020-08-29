const {expect} = require('chai');
const request = require('supertest');
const db = require('../server/db/db');
const app = require('../server');
const Score = db.model('score');
describe('Score routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });
  describe('/api/dailycheckin/score', () => {
      beforeEach(() => {
        return Score.create({
          date: "2020-08-28",
          notes:
            "eros non enim commodo hendrerit. Donec porttitor tellus non magna.",
          rate: 1,
          conditionId: 1,
          userId: 1,
        });
      });
      it('GET /api/dailycheckin/score responds with all scores', async () => {
        const res = await request(app)
          .get('/api/dailycheckin/score')
          .expect(200);
        expect(res.body).to.be.an('array');
        expect(res.body.date).to.be.equal('2020-08-28');
        expect(res.body.rate).to.be.equal(1);
      });
      it('POST /api/dailycheckin/score creates a new score and sends it back', async () => {
        const res = await request(app)
          .post('/api/dailycheckin/score')
          .send({
            date: "2020-08-28",
            notes:
              "eros non enim commodo hendrerit. Donec porttitor tellus non magna.",
            rate: 2,
            conditionId: 1,
            userId: 1,
          })
          .expect(201);
        const createdScore = await Score.findByPk(res.body.id);
        expect(createdScore.date).to.be.equal('2020-08-28');
        expect(createdScore.rate).to.be.equal(2);
      });
    });
});
