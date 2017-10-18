var Provider = mongoose.model('../controllers/provider');


//Retornar todos los proveedores
exports.findAllProviders = function(req, res) {
	Provider.find(function(err, providers) {
		if(err) res.send(500, err.message);

		console.log('GET /providers');
		res.status(200).jsonp(providers);
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
		NIT: 		req.body.NIT,
		name: 		req.body.name,
		email: 		req.body.email,
		phone: 		req.body.phone,
		address: 	req.body.address,
		products: 	req.body.products	//Verificar como se pasaria una lista de productos
	});

	provider.save(function(err, provider) {
		if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(provider);
	});
};


//Actualizar un registro proveedor en la DB (PUT)
exports.updateProvider = function(req, res) {
	Provider.findById(req.params.id, function(err, provider) {
		provider.NIT: 			req.body.NIT,
		provider.name: 			req.body.name,
		provider.email: 		req.body.email,
		provider.phone: 		req.body.phone,
		provider.address: 		req.body.address,
		provider.products: 		req.body.products	//Verificar como se pasaria una lista de productos


		provider.save(function(err) {
			if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(provider);
		});
	});
};


//Eliminar un registro proveedor de la BD (DELETE)
exports.deleteProvider = function(req, res) {
	Provider.findById(req.params.id, function(err, provider) {
		provider.remove(function(err) {
			if(err) return res.status(500).send(err.message);
			res.status(200).send();
		});
	});
};
