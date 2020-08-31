const {expect} = require('chai');
const db = require('../server/db/db');
const Condition = db.model('condition');

describe('Condition model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('column definitions and validations', () => {
    let hypertension;

    beforeEach(async () => {
      hypertension = await Condition.create({
        name: "Hypertension",
        diagnosed: "yes",
        typeOfPain: "physical",
        userId: 1,
      })
    })

    it('has a `name`, `diagnosed`, `typeOfPain`, `userId`', () => {
      expect(hypertension.name).to.equal('Hypertension');
      expect(hypertension.diagnosed).to.equal('yes');
      expect(hypertension.typeOfPain).to.equal('physical');
      expect(hypertension.userId).to.equal(1);
    });

    it('`name` is required', async () => {
      const majorDepression = Condition.build();
      try {
        await majorDepression.validate();
        throw new Error('Validation should have failed!');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });
  });
});
