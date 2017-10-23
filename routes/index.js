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

router.get('/inventory', function(req, res, next) {
  res.render('inventory_admin');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/clients', function(req, res, next) {
  res.render('clients_admin');
});

/*
router.get('/providers', function(req, res, next) {
	let locals = {
		providers : [
			{NIT: "1001", name: "Colombina", email: "contacto@colombina.com", phone: "123 321", address: "cra 4 # 3 -29"},
			{NIT: "1002", name: "Super", email: "contacto@super.com", phone: "456 789", address: "cra 6 # 28 -29"}
		]
	}
  res.render('providers', locals);
});
*/
router.get('/report', function(req, res, next) {
  res.render('report');
});

router.get('/staff', function(req, res, next) {
  let locals = {
  	clients : [ 
  		 {username:"Caro", password:"rGFHFGjjkhgfgWEAaswqQWSe", firstname: "Carolina", lastname:"Jimenez"},
 		 {username:"julidavid", password:"HJHgfFGGFWQWQWqqwredWE", firstname:"Julian", lastname:"Hoyos"},
 		 {username:"tavo", password:"HJHgfFGGFWQWQWqqwredWE", firstname:"Gustavo", lastname:"Llano"}
  	]
  }
  res.render('staff', locals);
});

module.exports = router;
