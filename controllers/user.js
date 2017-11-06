var User = require('../models/user');
var passport = require('passport');
var Verify = require('../routes/verify');

//Retornar todos los useres
exports.findAllUsers = function(req, res, next) {
  User.find({}, function (err, data){
    if (err) return next(err);
    //res.json(data);
    res.render('staff',{users:data});
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
      res.redirect('/users');
      /*
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });*/
    });
  })(req,res,next);
}

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/login')
  /*
  res.status(200).json({
    status: 'Bye!'
  });*/
}

//Retorna un usere especificando el ID
exports.findById = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		if(err) return res.send(500, err.message);

		console.log('GET /users/' + req.params.id);
		res.status(200).jsonp(user);
	});
};

exports.registerUser = function(req, res) {
  User.register(new User({ username : req.body.username }),
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
       // return res.status(200).json({status: 'Registration Successful!'});
       res.redirect('/users');
      });
    });

  });
}

//Actualizar un registro usere en la DB (PUT)
exports.updateUser = function(req, res) {
	User.findById(req.query._id, function(err, user) {
    user.username = req.query.username;
		user.firstname = req.query.firstname;
		user.lastname = req.query.lastname;

		user.save(function(err) {
			if(err) return res.status(500).send(err.message);
			//res.status(200).jsonp(user);
      res.redirect('/users')
		});
	});
};


///Eliminar un registro proveedor de la BD (DELETE)
exports.deleteUser = function(req, res) {

  var idUser = req.params.id;

  User.findById(idUser, function(err, user) {
    user.remove(function(err) {
      if(err) return res.render('error', {
        message: 'Se ha producido un error. Contacte con el administrador.',
        error: null
      });//res.status(500).send(err.message);
      //res.status(200).send();
      res.redirect('/users');
    });
  });
};
