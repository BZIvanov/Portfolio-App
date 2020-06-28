const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// load the model
require('./models/portfolio');
require('./models/user');
require('./models/forumCategory');
require('./models/topic');

exports.connect = () => {
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
};

exports.initSessionStore = () => {
  const store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: 'portfolioSessions',
  });

  return store;
};
