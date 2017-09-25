var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/index_admin', function(req, res, next) {
  res.render('index_admin');
});

router.get('/invoice', function(req, res, next) {
  res.render('invoice');
});

router.get('/invoice_admin', function(req, res, next) {
  res.render('invoice_admin');
});

router.get('/inventory', function(req, res, next) {
  res.render('inventory');
});

router.get('/inventory_admin', function(req, res, next) {
  res.render('inventory_admin');
});

router.get('/clients', function(req, res, next) {
  res.redirect('/users/clients');
});

module.exports = router;
