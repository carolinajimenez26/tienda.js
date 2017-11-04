var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    code: {
      type: String,
      require: true,
      unique: true
    },
    name: {
      type: String,
      require: true
    },
    amount: {
      type: Number,
      default: 0
    },
    price: { // stock mínimo
      type: Number,
      require: true
    },
    stock: { // stock mínimo
      type: Number,
      require: true
    },
    suplier: {
      type: mongoose.Schema.Types.ObjectId, // el proveedor que nos lo vende
      ref: 'Provider',
      require: true
    },
    sales_unit: { //unidad de venta (botella, libra, litro, bolsa)
      type: String,
      default: ''
    }
}, {
  timestamp: true
});

module.exports = mongoose.model('Product', ProductSchema);
