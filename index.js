const express = require('express');
const mongoose = require('mongoose');

//Session and passport for authentication
const cookieSession = require('cookie-session');
const passport = require('passport');


const keys = require('./config/keys');
const User = require('./models/User');
require('./services/passport');


mongoose
  .connect(keys.mongoURI)
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


const app = express();


//Express session configuration
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
