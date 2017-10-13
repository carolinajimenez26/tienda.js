var mongoose = require('mongoose');
var Client = mongoose.model('Client');


//Retornar todos los clientes
exports.findAllClients = function(req, res) 
{
	Client.find(function(err, clients)
	{
		if(err) res.send(500, err.message);

		console.log('GET /clients');
		res.status(200).jsonp(clients);
	});
};


//Retorna un cliente especificando el ID
exports.findById = function(req, res)
{
	Client.findById(req.params.id, function(err, client)
	{
		if(err) return res.send(500, err.message);

		console.log('GET /clients/' + req.params.id);
		res.status(200).jsonp(client);
	});
};


//Insertar un nuevo cliente en la DB  (POST)
exports.addClient = function(req, res)
{
	console.log('POST');
	console.log(req.body);

	var client = new Client(
	{
		firstname: 		req.body.firstname, 	
		lastname: 		req.body.lastname,
		email: 			req.body.email,	
		phone: 			req.body.phone		
	});

	client.save(function(err, client)
	{
		if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(client);
	});
};


//Actualizar un registro cliente en la DB (PUT)
exports.updateClient = function(req, res)
{
	Client.findById(req.params.id, function(err, client)
	{
		client.firstname: 		req.body.firstname; 	
		client.lastname: 		req.body.lastname;
		client.email: 			req.body.email;	
		client.phone: 			req.body.phone;	
		
		client.save(function(err)
		{
			if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(client);
		});	
	});
};


//Eliminar un registro cliente de la BD (DELETE)
exports.deleteClient = function(req, res)
{
	Client.findById(req.params.id, function(err, client)
	{
		client.remove(function(err)
		{
			if(err) return res.status(500).send(err.message);
			res.status(200).send();
		});
	});
};