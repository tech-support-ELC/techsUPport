const router = require('express').Router();
const {Score} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const scores = await Score.findAll({where: {
      userId: req.user.id,
    }});
    res.json(scores);
  } catch (error) {
    next(error);
  }
});
