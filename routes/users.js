var express = require('express');
var User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  User.create({username: "cjg", password: 'cjg'}, function(err, doc) {

    User.find({}, function (err, data){
      if (err) return next(err);
      res.send(data);
    });

  });

});

module.exports = router;
