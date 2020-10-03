const mongoose = require('mongoose');
// const mongooseDelete = require('mongoose-delete');
// const autoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Practice = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      require: [true, 'User id is required'],
    },
    excerciseId: {
      type: Schema.Types.ObjectId,
      require: [true, 'Excercise id is required'],
    },
    startedAt: {
      type: Date,
      default: Date.now(),
    },
    pausedAt: {
      type: Date,
      default: null,
    },
    endedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

Practice.pre('update', () => this.set({ pausedAt: new Date() }));

//plugins
// Practice.plugin(autoIncrement, { inc_field: 'id', id: 'products_seq' });
// Practice.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.model('Practice', Practice);
