const router = require('express').Router();
const Score = require('../db/models/score');
const Condition = require('../db/models/condition');
module.exports = router;

router.get('/score', async (req, res, next) => {
  try {
    const findOrder = await Condition.findAll({
      where: {
        userId: req.user.id,
      }
    });
    if (findOrder) res.json(findOrder);
  } catch (error) {
    next(error);
  }
});
router.post('/score', async (req, res, next) => {
  try {
    const [findOrder, created] = await Condition.findOrCreate({
      where: {
        userId: req.user.id,
      }
    });
    const conditionId = findOrder.id;
    const userId = req.user.id;
    const value = req.body.value;
    const date = req.body.date;
    const notes = req.body.notes;
    await Score.create({value, date, notes, conditionId, userId});
    res.json(findOrder);
  } catch (error) {
    next(error);
  }
});
