var Provider = require('../models/provider');


//Retornar todos los proveedores
exports.findAllProviders = function(req, res) {
	Provider.find(function(err, data) {
		if(err) res.send(500, err.message);

		console.log('GET /providers');
		//res.status(200).jsonp(providers);
		res.render('providers',{providers:data});

	});
};


//Retorna un proveedor especificando el ID
exports.findById = function(req, res) {
	Provider.findById(req.params.id, function(err, provider)
	{
		if(err) return res.send(500, err.message);

		console.log('GET /providers/' + req.params.id);
		res.status(200).jsonp(provider);
	});
};


//Insertar un nuevo proveedor en la DB  (POST)
exports.addProvider = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var provider = new Provider( {
		NIT: 		req.body.nit,
		name: 		req.body.name,
		email: 		req.body.email,
		phone: 		req.body.phone,
		address: 	req.body.address,
		products: 	req.body.products	//Verificar como se pasaria una lista de productos
	});

	provider.save(function(err, provider) {
		if(err) return res.status(500).send("hola");
		res.status(200).jsonp(provider);
	});
};


//Actualizar un registro proveedor en la DB (PUT)
exports.updateProvider = function(req, res) {
	console.log("ENTROOOOO");
	Provider.findById(req.body._id, function(err, provider) {
		console.log('proveder', provider);
		console.log('nit', req.body.NIT);
		provider.NIT= 			req.body.NIT,
		provider.name= 			req.body.name,
		provider.email= 		req.body.email,
		provider.phone= 		req.body.phone,
		provider.address= 		req.body.address
		//provider.products= 		req.body.products	//Verificar como se pasaria una lista de productos


		provider.save(function(err) {
			if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(provider);
		});
	});
};


//Eliminar un registro proveedor de la BD (DELETE)
exports.deleteProvider = function(req, res) {
	
	var idProvider = req.params.id;
	
	Provider.findById(idProvider, function(err, provider) {
		provider.remove(function(err) {
			if(err) return res.render('error', {
				message: 'Se ha producido un error. Contacte con el administrador.',
				error: null
			});//res.status(500).send(err.message);
			res.status(200).send();
		});
	});
};
