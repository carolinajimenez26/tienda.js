var express = require('express');
var Verify = require('../controllers/verify');
//var User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
  var decoded = Verify.verify(token);
  if (decoded) {
    if (decoded._doc.admin) res.redirect('/home_admin');
    else res.redirect('/home');
  }
  else res.redirect('/login');
});

router.get('/home_admin',function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
  var decoded = Verify.verify(token);
  if (decoded) {
    if (decoded._doc.admin) res.render('index_admin', {firstname: "", lastname: ""});
    else res.redirect('/login');
  }
  else res.redirect('/login');
});

router.get('/home', function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
  var decoded = Verify.verify(token);
  if (decoded) res.render('index', {firstname: "", lastname: ""});
  else res.redirect('/login');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

// Crear Factura
router.get('/invoice_admin', function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
  var decoded = Verify.verify(token);
  if (decoded) {
    if (decoded._doc.admin) res.render('invoice_admin');
    else res.redirect('error');
  }
  else res.redirect('error');
});

router.get('/invoice', function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
  var decoded = Verify.verify(token);
  if (decoded) res.render('invoice');
  else res.redirect('/error');
});

// Clientes
router.get('/clients_admin', function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
  var decoded = Verify.verify(token);
  if (decoded) {
    if (decoded._doc.admin) res.render('clients_admin');
    else res.redirect('error');
  }
  else res.redirect('error');
});

router.get('/clients', function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
  var decoded = Verify.verify(token);
  if (decoded) res.render('clients');
  else res.redirect('/error');
});

// Error
router.get('/error', function(req, res, next) {
  res.render('error', {message: req.query.err});
});

/*
router.get('/reg', function(req, res){

  var user = new User({
        username:     'admin',
        password:     'admin',
        firstname:   'Gustavo',
        lastname:      'Llano',
        admin:    true        
      });

      user.save(function(err, user) {
        if(err) return res.status(500).send(err.message);
        //res.status(200).jsonp(product);
        res.redirect('/');
      });

});
*/
module.exports = router;
