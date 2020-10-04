const mongoose = require('mongoose');
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Practice = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      require: [true, 'User id is required'],
    },
    exerciseId: {
      type: Schema.Types.ObjectId,
      require: [true, 'Excercise id is required'],
    },
    count: {
      type: Number,
      default: 0,
    },
    timeSecond: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

Practice.query.byId = function (id) {
  return this.where({ _id: id });
};

Practice.query.byUserId = function (id) {
  return this.where({ userId: id });
};

Practice.query.byExerciseId = function (id) {
  return this.where({ exerciseId: id });
};

//plugins
// Practice.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.model('Practice', Practice);
