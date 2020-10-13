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
        callbackURL: '/auth/google/callback',
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
          const existingUser = await User.findOne({ googleId: profile.id });

          if(existingUser) {
            return done(null, existingUser);
          } 
            const user = await new User({ googleId: profile.id }).save()
            done(null, user);
      }
    )
  );
  