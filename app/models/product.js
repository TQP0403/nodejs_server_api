const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    id: { type: Number, default: 0 },
    name: { type: String, default: '' },
    color: { type: String, default: '' },
    price: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

autoIncrement.initialize(mongoose.connection);

Product.plugin(autoIncrement.plugin, { model: 'Product', field: 'id' });

module.exports = mongoose.model('Product', Product);
