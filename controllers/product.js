var Product = require('../models/product');


//Retornar todos los productos
exports.findAllProducts = function(req, res) {
	Product.find(function(err, products) {
		if(err) res.send(500, err.message);

		console.log('GET /inventory');
		res.status(200).jsonp(products);
	});
};


//Retorna un producto especificando el ID
exports.findById = function(req, res) {
	Product.findById(req.params.id, function(err, product) {
		if(err) return res.send(500, err.message);

		console.log('GET /inventory/' + req.params.id);
		res.status(200).jsonp(product);
	});
};


//Insertar un nuevo producto en la DB  (POST)
exports.addProduct = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var product = new Product({
		code: 		req.body.code,
		name: 		req.body.name,
		amount: 	req.body.amount,
		stock: 		req.body.stock,
		suplier: 	req.body.suplier,
		sales_unit: req.body.sales_unit
	});

	product.save(function(err, product) {
		if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(product);
	});
};


//Actualizar un registro producto en la DB (PUT)
exports.updateProduct = function(req, res) {
	Product.findById(req.params.id, function(err, product) {
		product.code: 		req.body.code;
		product.name: 		req.body.name;
		product.amount: 	req.body.amount;
		product.stock: 		req.body.stock;
		product.suplier: 	req.body.suplier;
		product.sales_unit: req.body.sales_unit;

		product.save(function(err) {
			if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(product);
		});
	});
};


//Eliminar un registro producto de la BD (DELETE)
exports.deleteProduct = function(req, res) {
	Product.findById(req.params.id, function(err, product) {
		product.remove(function(err) {
			if(err) return res.status(500).send(err.message);
			res.status(200).send();
		});
	});
};
