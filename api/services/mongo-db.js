const mongoose = require('mongoose');
const db = mongoose.connection;
let mongoDB = process.env.MONGO_DB;

function connect() {
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  db.once('open', () => console.log('MongoDB connect success'));

  db.on('error', (err) => {
    throw err;
  });
}

module.exports = { connect };
