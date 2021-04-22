const mongoose = require('mongoose');

// add your database path
var mongoDB = 'mongodb://localhost:27017/myData';
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
