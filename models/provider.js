var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProviderSchema = new Schema({
    NIT: {
      type: String,
      require: true,
      unique: true
    },
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      require: true,
      min: 9,
      max : 15
    },
    address: {
      type: String,
      default: ''}
    },
  /*  products: {
      [ { type: String, require: true} ] // array de productos
    }
}, */{
  timestamp: true
});

module.exports = mongoose.model('Provider', ProviderSchema);
