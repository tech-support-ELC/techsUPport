module.exports = function (req, res, next) {
  if (req.user.isAdmin === false) {
    res.sendStatus(401)
    next()
  } else {
    next()
  }
}
