const { expect } = require("chai");
const db = require("../server/db/db");
const Medication = db.model("medication");

describe("Medication model", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe("column definitions and validations", () => {
    let lamictal;

    beforeEach(async () => {
      lamictal = await Medication.create({
        name: "Lamictal",
        dosage: 250,
        dosageUnit: "mg",
        frequency: 2,
        frequencyUnit: "day",
        userId: 1,
      });
    });

    it("has a `name`, `dosage`, `dosageUnit`, `frequency`, and `frequencyUnit`", () => {
      expect(lamictal.name).to.equal("Hypertension");
      expect(lamictal.dosage).to.equal(250);
      expect(lamictal.dosageUnit).to.equal("mg");
      expect(lamictal.frequency).to.equal(2);
      expect(lamictal.frequencyUnit).to.equal("day");
      expect(lamictal.userId).to.equal(1);
    });

    it("`name` is required", async () => {
      const adderall = Medication.build();
      try {
        await adderall.validate();
        throw new Error("Validation should have failed!");
      } catch (err) {
        expect(err).to.be.an("error");
      }
    });
  });
});
