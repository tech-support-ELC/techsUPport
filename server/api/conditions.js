const router = require('express').Router();
const {Condition} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const conditions = await Condition.findAll({where: {
      userId: req.user.id
    }});
    res.status(200).json(conditions);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const condition = await Condition.findOne({
      where: {id: req.params.id}
    });
    res.status(200).json(condition);
  } catch (error) {
    next(error);
  }
});

 router.post('/', async (req, res, next) => {
   try {
     const newCondition = await Condition.create(req.body);
     res.status(201).json(newCondition);
   } catch (error) {
    next(error);
   }
 });

 router.put('/:id', async (req, res, next) => {
   try {
    const { name, diagnosed, typeOfPain } = req.body;
    const selectedCondition = await Condition.findOne({
      where: {id: req.params.id}
    });
    if (selectedCondition) {
      const updatedCondition = await selectedCondition.update({
        name: name || selectedCondition.name,
        diagnosed: diagnosed || selectedCondition.diagnosed,
        typeOfPain: typeOfPain || selectedCondition.typeOfPain,
      });
      res.status(200).json(updatedCondition);
    } else {
      res.status(404).send('Condition not found');
    }
   } catch (error) {
    next(error);
   }
 });

 router.delete('/:id', async (req, res, next) => {
   try {
     await Condition.destroy({where: {id: req.params.id}});
     res.sendStatus(204);
   } catch (error) {
    next(error);
   }
 });
