var Client = require('../models/user');
var Verify = require('./verify');

//Retornar todos los clientes
exports.findAllClients = function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
  var decoded = Verify.verify(token);
  if (decoded) {
    Client.find({}, function (err, data){
      if (err) return next(err);
      res.json(data);
    });
  }
  else res.redirect('../login');
}

//Retorna un cliente especificando el ID
exports.findById = function(req, res) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
  var decoded = Verify.verify(token);
  if (decoded) {
    Client.findById(req.params.id, function(err, client) {
  		if(err) return res.send(500, err.message);

  		console.log('GET /clients/' + req.params.id);
  		res.status(200).jsonp(client);
  	});
  }
  else res.redirect('../login');
};


//Actualizar un registro cliente en la DB (PUT)
exports.updateClient = function(req, res) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
  var decoded = Verify.verify(token);
  if (decoded) {
    if (decoded._doc.admin) {
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
    }
    else res.redirect('../login');
  }
  else res.redirect('../error');
};

// TODO: ADD CLIENT

//Eliminar un registro cliente de la BD (DELETE)
exports.deleteClient = function(req, res) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
  var decoded = Verify.verify(token);
  if (decoded) {
    if (decoded._doc.admin) {
      Client.findById(req.params.id, function(err, client) {
    		client.remove(function(err) {
    			if(err) return res.status(500).send(err.message);
    			res.status(200).send();
    		});
    	});
    }
    else res.redirect('../login');
  }
  else res.redirect('../error');
};
