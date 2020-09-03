const router = require("express").Router();
module.exports = router;


router.use('/conditions', require('./conditions'));
router.use('/users', require('./users'));
router.use('/doctors', require('./doctors'));
router.use("/medications", require("./medications"));
router.use('/dailycheckin', require('./dailycheckin'));
router.use('/score', require('./score'));
router.use("/documents", require("./documents"));




router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
