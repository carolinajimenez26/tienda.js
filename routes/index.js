var express = require('express');
var Verify = require('../controllers/verify');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Verify.verify(req, res, next);
});

router.get('/home', /*Verify.verifyOrdinaryUser,*/ function(req, res, next) {
  res.render('index', {firstname: req.firstname, lastname: req.lastname});
});

router.get('/home_admin', /*Verify.verifyAdmin,*/ function(req, res, next) {
  res.render('index_admin', {firstname: req.firstname, lastname: req.lastname});
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
