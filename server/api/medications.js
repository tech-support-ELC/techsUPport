const router = require("express").Router();
const { Medication } = require("../db/models");

//GET ALL MEDS
router.get("/", async (req, res, next) => {
  try {
    const medication = await Medication.findAll({
      where: { userId: req.user.id },
    });
    res.json(medication);
  } catch (err) {
    next(err);
  }
});

//GET SINGLE MED
router.get("/:id", async (req, res, next) => {
  try {
    const medication = await Medication.findByPk(req.params.id);
    res.json(medication);
  } catch (err) {
    next(err);
  }
});

//ADD MED
router.post("/", async (req, res, next) => {
  try {
    console.log("post");
    const { name, dosage, dosageUnit, frequency, frequencyUnit } = req.body;
    const newMedication = await Medication.create({
      name,
      dosage,
      dosageUnit,
      frequency,
      frequencyUnit,
      userId: req.user.id,
    });
    res.json(newMedication);
  } catch (err) {
    next(err);
  }
});

//EDIT MED
// eslint-disable-next-line complexity
router.put("/:id", async (req, res, next) => {
  try {
    console.log("put");
    const { name, dosage, dosageUnit, frequency, frequencyUnit } = req.body;

    const medication = await Medication.findByPk(req.params.id);

    const updatedMedication = await medication.update({
      name: name || medication.name,
      dosage: dosage || medication.dosage,
      dosageUnit: dosageUnit || medication.dosageUnit,
      frequency: frequency || medication.frequency,
      frequencyUnit: frequencyUnit || medication.frequencyUnit,
    });
    res.status(201).json(updatedMedication);
  } catch (err) {
    next(err);
  }
});

//DELETE MED
router.delete("/:id", async (req, res, next) => {
  try {
    const medication = await Medication.findByPk(req.params.id);
    await medication.destroy();
    res.status(204).send("deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
