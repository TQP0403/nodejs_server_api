const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    avatar: { type: String, default: '' },
    birthday: { type: Date, required: [true, 'Birthday is required'] },
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: [true, 'Gender is required'],
    },
    phone: {
      type: String,
      maxlength: 15,
      required: [true, 'Phone is required'],
    },
  },
  { timestamps: true, versionKey: false }
);

User.query.byId = function (id) {
  return this.where({ _id: id });
};

module.exports = mongoose.model('User', User);
