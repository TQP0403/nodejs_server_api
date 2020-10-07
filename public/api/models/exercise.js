const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exercise = new Schema(
  {
    name: { type: String, required: [true, 'Exercise name is required'] },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      // required: [true, 'Image is required'],
      default: '',
    },
    bodyPart: {
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

Exercise.query.byId = function (id) {
  return this.where({ _id: id });
};

//plugins
module.exports = mongoose.model('Exercise', Exercise);
