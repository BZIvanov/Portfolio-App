require('dotenv').config();
const mongoose = require('mongoose');
const fakeDb = require('./FakeDb');

mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  async () => {
    console.log('Starting populating DB...');
    await fakeDb.populate();
    await mongoose.connection.close();
    console.log('DB has been populated...');
  }
);
