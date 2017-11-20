var Product = require('../models/product');
var Provider = require('../models/provider');


//Retornar todos los productos
exports.findAllProducts = function(req, res) {
	Provider.find(function(err, providersList) {
		if(err) return res.status(500).send(err.message);

		Product.find({})
			.populate('suplier')
			.exec(function (err, productList) {
				if (err) return res.status(500).send(err.message);
				res.render('products', {products: productList, providers: providersList});
			});
	});
};

exports.search = function(req, res) {
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
};

//Retorna un producto especificando el ID
exports.findById = function(req, res) {
	Product.findById(req.params.id, function(err, product) {
		if(err) return res.status(500).send(err.message);

		console.log('GET /inventory/' + req.params.id);
		res.status(200).jsonp(product);
	});
};
