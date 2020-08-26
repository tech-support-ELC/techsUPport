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
    // const [findCondition, created] = await Condition.findOrCreate({
    //   where: {
    //     userId: req.user.id,
    //   }
    // });
    // const conditionId = findCondition.id;
    const userId = req.user.id;
    const rate = req.body.rate.rate;
    const date = req.body.rate.date;
    const notes = req.body.rate.notes;
    const conditionId = req.body.rate.conditionId;
    console.log(req.body);
    const newScore = await Score.create({rate, date, notes, conditionId, userId});
    res.json(newScore);
  } catch (error) {
    next(error);
  }
});
