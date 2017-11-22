var Product = require('../models/product');
var Provider = require('../models/provider');
var Verify = require('./verify');

//Retornar todos los productos
exports.findAllProducts = function(req, res) {

	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
	var decoded = Verify.verify(token);
	if (decoded) {
		Provider.find(function(err, providersList) {
			if(err) return res.status(500).send(err.message);

			Product.find({})
				.populate('suplier')
				.exec(function (err, productList) {
					if (err) return res.status(500).send(err.message);
					res.render('products', {products: productList, providers: providersList, admin: decoded._doc.admin});
				});
		});
	}
	else res.redirect('../login');
};

//Retorna un producto especificando el ID
exports.findById = function(req, res) {

	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
	var decoded = Verify.verify(token);
	if (decoded) {
		Product.findById(req.params.id, function(err, product) {
			if(err) return res.status(500).send(err.message);

			console.log('GET /inventory/' + req.params.id);
			res.status(200).jsonp(product);
		});
	}
	else res.redirect('../login');
};

exports.search = function(req, res) {

	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
	var decoded = Verify.verify(token);
	if (decoded) {
	  if (decoded._doc.admin) {
			if (req.body) {
				var initdate = req.body.initdate.split("-");
				// console.log("initdate : ", initdate);
				var inittime = req.body.inittime.split(":");
				// console.log("inittime : ", inittime);
				//
				var finaldate = req.body.finaldate.split("-");
				// console.log("finaldate : ", finaldate);
				var finaltime = req.body.finaltime.split(":");
				// console.log("finaltime : ", finaltime);

				if (req.body.report == 'Productos agregados') {
					var query = {
						createdAt: {
					    $gte: new Date(initdate[0], initdate[1] - 1, initdate[2], inittime[0], inittime[1]), // "2017", "9", "10" || 2017, 9, 10, 11, 13, 0 || October 10, 2017 || October 10, 2017 11:13:00
					    $lt: new Date(finaldate[0], finaldate[1] - 1, finaldate[2], finaltime[0], finaltime[1])
					  }
					};
					Product.find(query, function(err, productList) {
						if(err) return res.status(500).send(err.message);
						//res.status(200).jsonp(productList);
						console.log("retorna ", productList);
						res.render('reportView', {result: productList, type: "agregados"});
					});
				} else { // req.body.report == 'Productos modificados'
					var query = {
						updatedAt: {
							$gte: new Date(initdate[0], initdate[1] - 1, initdate[2], inittime[0], inittime[1]), // "2017", "9", "10" || 2017, 9, 10, 11, 13, 0 || October 10, 2017 || October 10, 2017 11:13:00
							$lt: new Date(finaldate[0], finaldate[1] - 1, finaldate[2], finaltime[0], finaltime[1])
						}
					};
					Product.find(query, function(err, productList) {
						if(err) return res.status(500).send(err.message);
						//res.status(200).jsonp(productList);
						console.log("retorna ", productList);
						res.render('reportView', {result: productList, type: "modificados"});
					});
				}
			} else {
				return res.status(500).send("Error");
			}
		}
	  else res.redirect('../login');
	}
	else res.redirect('../error');
};

//Insertar un nuevo producto en la DB  (POST)
exports.addProduct = function(req, res) {
	console.log('POST');

	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
	var decoded = Verify.verify(token);
	if (decoded) {
	  if (decoded._doc.admin) {
			var product = new Product({
				code: 		req.body.code,
				name: 		req.body.name,
				amount: 	req.body.amount,
				price:      req.body.price,
				stock: 		req.body.stock,
				suplier: 	req.body.suplier,
				sales_unit: req.body.sales_unit
			});

			product.save(function(err, product) {
				if(err) return res.status(500).send(err.message);
				//res.status(200).jsonp(product);
				res.redirect('/products');
			});
		}
	  else res.redirect('../login');
	}
	else res.redirect('../error');
};


//Actualizar un registro producto en la DB (PUT)
exports.updateProduct = function(req, res) {

	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
	var decoded = Verify.verify(token);
	if (decoded) {
	  if (decoded._doc.admin) {
			Product.findById(req.params.id, function(err, product) {
				product.code= 		req.query.code;
				product.name= 		req.query.name;
				product.amount= 	req.query.amount;
				product.price=      req.query.price;
				product.stock= 		req.query.stock;
				product.suplier= 	req.query.suplier;
				product.sales_unit= req.query.sales_unit;

				product.save(function(err) {
					if(err) return res.status(500).send(err.message);
					//res.status(200).jsonp(product);
					res.redirect('/products');
				});
			});
		}
	  else res.redirect('../login');
	}
	else res.redirect('../error');
};


//Eliminar un registro producto de la BD (DELETE)
exports.deleteProduct = function(req, res) {

	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
	var decoded = Verify.verify(token);
	if (decoded) {
	  if (decoded._doc.admin) {
			Product.findById(req.params.id, function(err, product) {
				product.remove(function(err) {
					if(err) return res.status(500).send(err.message);
					//res.status(200).send();
					res.redirect('/products');
				});
			});
		}
	  else res.redirect('../login');
	}
	else res.redirect('../error');
};
