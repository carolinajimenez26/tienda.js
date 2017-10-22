var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/invoice', function(req, res, next) {
  res.render('invoice');
});

router.get('/inventory', function(req, res, next) {
  res.render('inventory');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/clients', function(req, res, next) {
  res.render('clients');
});

/*
router.get('/providers', function(req, res, next) {
  res.render('providers');
});
*/
router.get('/report', function(req, res, next) {
  res.render('report');
});

router.get('/staff', function(req, res, next) {
  res.render('staff');
});

module.exports = router;
