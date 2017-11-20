var Client = require('../models/user');
var passport = require('passport');

//Retornar todos los clientes
exports.findAllClients = function(req, res, next) {
  Client.find({}, function (err, data){
    if (err) return next(err);
    res.json(data);
  });
}

//Retorna un cliente especificando el ID
exports.findById = function(req, res) {
	Client.findById(req.params.id, function(err, client) {
		if(err) return res.send(500, err.message);

		console.log('GET /clients/' + req.params.id);
		res.status(200).jsonp(client);
	});
};


//Actualizar un registro cliente en la DB (PUT)
exports.updateClient = function(req, res) {
	Client.findById(req.params.id, function(err, client) {
		client.firstname = req.body.firstname;
		client.lastname = req.body.lastname;
		client.email = req.body.email;
		client.phone = req.body.phone;

		client.save(function(err) {
			if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(client);
		});
	});
};


//Eliminar un registro cliente de la BD (DELETE)
exports.deleteClient = function(req, res) {
	Client.findById(req.params.id, function(err, client) {
		client.remove(function(err) {
			if(err) return res.status(500).send(err.message);
			res.status(200).send();
		});
	});
};
