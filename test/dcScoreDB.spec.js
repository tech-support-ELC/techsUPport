const {expect} = require('chai');
const db = require('../server/db/db');
const Score = db.model('score');

describe('Score model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('column definitions and validations', () => {
    let score;

    beforeEach(async () => {
      score = await Score.create({
        date: "2020-07-01",
        notes:
          "ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque neque",
        rate: 7,
        conditionId: 1,
        userId: 1,
      });
    });

    it('has a `date`, `notes`, `rate`, `conditionId`, `userId`', () => {
      expect(score.date).to.equal('2020-07-01');
      expect(score.notes).to.equal('ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque neque');
      expect(score.rate).to.equal(7);
      expect(score.conditionId).to.equal(1);
      expect(score.userId).to.equal(1);
    });
  });
});
