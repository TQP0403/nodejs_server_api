const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: { type: String, default: '', required: [true, 'Name is required'] },
    color: { type: String, default: '', required: [true, 'Color is required'] },
    price: { type: Number, default: 0, required: [true, 'Price is required'] },
  },
  { timestamps: true, versionKey: false }
);

Product.query.byId = function (id) {
  return this.where({ id: Number(id) || 0 });
};

Product.post('update', function (error, res, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  }
});

//plugins
Product.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.model('Product', Product);