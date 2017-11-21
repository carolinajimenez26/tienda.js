var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/home', function(req, res, next) {
  res.render('index_admin');
});

router.get('/invoice', function(req, res, next) {
  res.render('invoice_admin');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/clients', function(req, res, next) {
  res.render('clients_admin');
});

module.exports = router;
