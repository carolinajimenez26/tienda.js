var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username : {
      type: String,
      max: 10,
      min: 1,
      require : true
    },
    password : {
      type: String,
      max: 10,
      min: 6,
      require : true
    },
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
  timestamp: true
});

UserSchema.methods.getName =  function () {
  return (this.firstname + ' ' + this.lastname);
};

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
