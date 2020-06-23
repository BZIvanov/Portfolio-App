const mongoose = require('mongoose');
// load the model
require('./models/portfolio');
require('./models/user');

mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log('Connected to DB');
  }
);
