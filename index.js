const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
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
require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);

