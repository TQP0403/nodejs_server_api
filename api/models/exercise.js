const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const autoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Excercise = new Schema(
  {
    name: { type: String, required: [true, 'Excercise name is required'] },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    body_part: {
      type: String,
      default: '',
    },
    equipment: {
      type: String,
      default: 'No equipment needed',
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: [true, 'difficulty is required'],
    },
  },
  { timestamps: true, versionKey: false }
);

Excercise.post('update', function (error, res, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  }
});

//plugins
// Excercise.plugin(autoIncrement, { inc_field: 'id', id: 'products_seq' });
Excercise.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.model('Excercise', Excercise);
