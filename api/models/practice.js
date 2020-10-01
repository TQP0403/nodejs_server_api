const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const autoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Practice = new Schema(
  {
    id_user: {
      type: Schema.Types.ObjectId,
      require: [true, 'User id is required'],
    },
    id_excercise: {
      type: Schema.Types.ObjectId,
      require: [true, 'Excercise id is required'],
    },
  },
  { timestamps: true, versionKey: false }
);

Practice.post('update', function (error, res, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  }
});

//plugins
// Practice.plugin(autoIncrement, { inc_field: 'id', id: 'products_seq' });
Practice.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.model('Practice', Practice);
