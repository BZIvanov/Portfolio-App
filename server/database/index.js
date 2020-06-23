const mongoose = require('mongoose');
// load the model
require('./models/portfolio');

mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log('Connected to DB');
  }
);
