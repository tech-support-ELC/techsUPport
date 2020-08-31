const {expect} = require('chai');
const db = require('../server/db/db');
const DailyMed = db.model('dailyMed');

describe('DailyMed model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('column definitions and validations', () => {
    let dailyMed;

    beforeEach(async () => {
      dailyMed = await DailyMed.create({
        notes: "Makes feel sleepy",
        medicationId: 1,
        userId: 1,
      });
    });

    it('has a `notes`, `medicationId`, `userId`', () => {
      expect(dailyMed.notes).to.equal('Makes feel sleepy');
      expect(dailyMed.medicationId).to.equal(1);
      expect(dailyMed.userId).to.equal(1);
    });
  });
});
