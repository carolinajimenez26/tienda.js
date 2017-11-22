var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: '',
      min: 9,
      max : 15
    }
}, {
  timestamps: true
});

ClientSchema.methods.getName =  function () {
  return (this.firstname + ' ' + this.lastname);
};

module.exports = mongoose.model('Client', ClientSchema);
