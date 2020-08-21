const router = require('express').Router();
const {Condition} = require('../db/models');
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const conditions = await Condition.findAll();
    res.json(conditions);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const condition = await Condition.findOne({
      where: {id: req.params.id}
    });
    res.json(condition);
  } catch (error) {
    next(error);
  }
});

 router.post('/', async (req, res, next) => {
   try {
     const newCondition = await 
   } catch (error) {
    next(error);
   }
 })
