var express = require('express');
var Verify = require('../controllers/verify');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var decoded = Verify.verify(token);
  if (decoded._doc.admin) res.redirect('/home_admin');
  else if (decoded) res.redirect('/home');
  else res.redirect('/login');
});

router.get('/home_admin',function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var decoded = Verify.verify(token);
  if (decoded) {
    if (decoded._doc.admin) res.render('index_admin', {firstname: "", lastname: ""});
    else res.redirect('../login');
  }
  else res.redirect('../login');
});

router.get('/home', function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var decoded = Verify.verify(token);
  if (decoded) res.render('index', {firstname: "", lastname: ""});
  else res.redirect('../login');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

// Crear Factura
router.get('/invoice_admin', function(req, res, next) {
  res.render('invoice_admin');
});

router.get('/invoice', function(req, res, next) {
  res.render('invoice');
});

// Clientes
router.get('/clients_admin', function(req, res, next) {
  res.render('clients_admin');
});

router.get('/clients', function(req, res, next) {
  res.render('clients');
});

// Error
router.get('/error', function(req, res, next) {
  res.render('error', {message: req.err});
});

module.exports = router;
