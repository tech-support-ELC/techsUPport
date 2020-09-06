if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { User } = require('../db/models')
module.exports = router

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `/auth/google/callback`
}

const strategy = new GoogleStrategy(
  googleConfig,
  async (token, refreshToken, profile, done) => {
    try {
      const googleId = profile.id
      const email = profile.emails[0].value
      const firstName = profile.name.givenName
      const lastName = profile.name.familyName

      const [user] = await User.findOrCreate({
        where: { googleId },
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
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

