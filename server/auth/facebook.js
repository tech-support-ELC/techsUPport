require('dotenv').config()
const passport = require('passport')
const router = require('express').Router()
const FacebookStrategy = require('passport-facebook').Strategy
const { User } = require('../db/models')
module.exports = router

const facebookConfig = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `/auth/facebook/verify`,
  profileFields: ['id', 'emails', 'name']
}

const strategy = new FacebookStrategy(
  facebookConfig,
  async (token, refreshToken, profile, done) => {
    try {
      const facebookId = profile.id
      const email = profile.emails[0].value
      const firstName = profile.name.givenName
      const lastName = profile.name.familyName

      const [user] = await User.findOrCreate({
        where: { facebookId },
        defaults: { email, firstName, lastName }
      })
      done(null, user)
    } catch (err) {
      done(err)
    }
  }
)

passport.use(strategy)

router.get(
  '/',
  passport.authenticate('facebook')
)

router.get(
  '/verify',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

