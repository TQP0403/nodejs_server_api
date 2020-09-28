const mongoose = require('mongoose');

let mongoDB = 'mongodb://localhost:27017/test';

async function connect() {
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('MongoDB connect success');
  } catch (err) {
    console.log('MongoDB connect failed');
    // console.error(err);
  }
}

module.exports = { connect };
