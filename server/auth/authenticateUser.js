const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).send('You are not the admin')
  }
}

const isOwner = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.status(401).send('You are not the owner')
  }
}

module.exports = {
  isAdmin,
  isOwner
}
