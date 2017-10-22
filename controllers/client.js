var Client = require('../models/user');
var passport = require('passport');
var Verify = require('../routes/verify');

//Retornar todos los clientes
exports.findAllClients = function(req, res, next) {
  Client.find({}, function (err, data){
    if (err) return next(err);
    res.json(data);
  });
}

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log("user: ", user);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {

        return res.status(500).json({
          err: 'Could not log in user'
        });
      }

      var token = Verify.getToken(user);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
}

exports.logout = function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
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

exports.registerClient = function(req, res) {
  Client.register(new Client({ username : req.body.username }),
  req.body.password, function(err, user) {
    if (err) {
      return res.status(500).json({err: err});
    }
    if(req.body.firstname) {
      user.firstname = req.body.firstname;
    }
    if(req.body.lastname) {
      user.lastname = req.body.lastname;
    }

    user.save(function(err,user) {
      passport.authenticate('local')(req, res, function () {
        return res.status(200).json({status: 'Registration Successful!'});
      });
    });

  });
}

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
