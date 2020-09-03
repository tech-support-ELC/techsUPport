const { expect } = require("chai");
const request = require("supertest");
const db = require("../server/db/db");
const app = require("../server");
const Medication = db.model("medication");

describe("Medication routes", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  describe("/api/medications", () => {
    beforeEach(() => {
      return Medication.create({
        name: "Ibuprofen",
        dosage: 250,
        dosageUnit: "mg",
        frequency: 2,
        frequencyUnit: "day",
        id:99,
      });
    });
    it("GET /api/medications responds with all medications", async () => {
      const res = await request(app).get("/api/medications").expect(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0].name).to.be.equal("Ibuprofen");
      expect(res.body[0].dosage).to.be.equal(250);
    });
    it("GET /api/medications/:id responds with specific condition", async () => {
      const res = await request(app).get("/api/medications/99").expect(200);
      expect(res.body).to.be.an("object");
      expect(res.body.name).to.be.equal("Ibuprofen");
      expect(res.body.frequencyUnit).to.be.equal("day");
    });
    it("POST /api/medications creates a new condition and sends it back", async () => {
      const res = await request(app)
        .post("/api/medications")
        .send({
          name: "Lamictal",
        dosage: 250,
        dosageUnit: "mg",
          userId: 1,
        })
        .expect(201);
      const createdMedication= await Medication.findByPk(res.body.id);
      expect(createdMedication.name).to.be.equal("Lamictal");
      expect(createdMedication.dosageUnit).to.be.equal("mg");
    });
    it("PUT /api/medications/:id updates an existing condition", async () => {
      const res = await request(app)
        .put(`/api/medications/99`)
        .send({
          dosage: 500,
        })
        .expect(200);
      expect(res.body).to.be.an("object");
      expect(res.body.dosage).to.equal(500);
      const medicationFromDatabase = await Medication.findByPk(res.body.id);
      expect(medicationFromDatabase.dosage).to.equal(500);
    });
    it("DELETE /api/medications/:id removes a condition from the database", async () => {
      const res = await request(app).delete("/api/medications/99").expect(204);
      const isIbuprofenInDb = await Medication.findByPk(res.body.id);
      expect(isIbuprofenInDb).to.equal(null);
      it("sends a 404 if not found", () => {
        return request(app).delete(`/api/medications/99).expect(404);
      });
    });
  });
});
