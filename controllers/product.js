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
	Product.findById(req.params.id, function(err, product) {
		if(err) return res.status(500).send(err.message);
		res.send("createdAt: " + product.createdAt + " \nupdatedAt: " + product.updatedAt);
	});
};

//Retorna un producto especificando el ID
exports.findById = function(req, res) {
	Product.findById(req.params.id, function(err, product) {
		if(err) return res.status(500).send(err.message);

		console.log('GET /inventory/' + req.params.id);
		res.status(200).jsonp(product);
	});
};


//Insertar un nuevo producto en la DB  (POST)
exports.addProduct = function(req, res) {
	console.log('POST');

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
};


//Actualizar un registro producto en la DB (PUT)
exports.updateProduct = function(req, res) {
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
};


//Eliminar un registro producto de la BD (DELETE)
exports.deleteProduct = function(req, res) {
	Product.findById(req.params.id, function(err, product) {
		product.remove(function(err) {
			if(err) return res.status(500).send(err.message);
			//res.status(200).send();
			res.redirect('/products');
		});
	});
};
