const mongoose = require('mongoose');
const db = mongoose.connection;
let mongoDB = process.env.MONGO_DB;

function connect() {
  mongoose
    .connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log('MongoDB connect success'))
    .catch((err) => {
      throw err;
    });
}

module.exports = { connect };
