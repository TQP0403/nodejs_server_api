const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const autoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    id: { type: Number, default: 0 },
    name: { type: String, default: '', required: [true, 'Name required'] },
    color: { type: String, default: '', required: [true, 'Color required'] },
    price: { type: Number, default: 0, required: [true, 'Price required'] },
  },
  { timestamps: true, versionKey: false }
);

Product.query.byId = function (id) {
  return this.where({ id: Number(id) || 0 });
};

Product.post('update', function (error, res, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    res.send('Hello');
  }
});

//plugins
Product.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });
Product.plugin(autoIncrement, { inc_field: 'id', id: 'products_seq' });

module.exports = mongoose.model('Product', Product);
