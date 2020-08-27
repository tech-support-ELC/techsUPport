require('dotenv').config()
const jwt = require('jsonwebtoken')

//authenticate verifies if the user is the logged in user?

// authentication token middleware
module.exports = function (req, res, next) {
  // formate of token
  //Authorization: Bearer <TOKEN>
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).send(`You don't have a token!`)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // no longer valid token, Forbidden
    if (err) return res.status(403).send(`Your token is not valid!`)
    //req.user can be accessed anywhere
    req.user = user
    next()
  })
}

