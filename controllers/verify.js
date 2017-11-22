var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verify = function (token) {
  var decoded = false;
  try {
    decoded = jwt.verify(token, config.secretKey);
  } catch (e) {
    decoded = false; // still false
  }
  return decoded;
}
