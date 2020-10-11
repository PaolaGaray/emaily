const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = require('../models/User');

passport.serializeUser((loggedInUser, done) => {
   done(null, loggedInUser._id)
})

passport.deserializeUser((userIdFromSession, done) => {
  User.findById(userIdFromSession) 
  .then(user => {
    done(null, user);
  })
})

passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
      },
      (accessToken, refreshToken, profile, done) => {
          User.findOne({ googleId: profile.id })
          .then((existingUser) => {
              if(existingUser) {
                // we already have a records with the given profile ID
                done(null, existingUser)
              } else {
                // we don't have a user record with this ID, make a new record
                new User({ googleId: profile.id })
                  .save()
                  .then(user => done(null, user));
              }
          })
      }
    )
  );
  