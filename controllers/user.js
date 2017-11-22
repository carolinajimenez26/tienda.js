var User = require('../models/user');
var passport = require('passport');
var Verify = require('./verify');

//Retornar todos los useres
exports.findAllUsers = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
  var decoded = Verify.verify(token);
  if (decoded) {
    if (decoded._doc.admin) {
      User.find({}, function (err, data){
        if (err) return next(err);
        res.render('staff',{users:data});
      });
    }
    else res.redirect('../login');
  }
  else res.redirect('../error');
};

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    // console.log("user: ", user);
    if (err) {
      // return next(err);
      return next({
        'flag':false,
        'err': err.message
      });
    }
    if (!user) {
      // return res.status(401).json({
      //   err: info
      // });
      return next({
        'flag':false,
        'err': info
      });
    }
    req.logIn(user, function(err) {
      if (err) {

        // return res.status(500).json({
        //   err: 'Could not log in user'
        // });
        return next({
          'flag':false,
          'err': 'Could not log in user'
        });
      }

      var token = Verify.getToken(user);
      req.body.token = token;
      res.cookie('jwttoken', token);//, { expires: new Date(Date.now() + 3600)});
      return next({
        'flag':true,
        'token': token,
        'user': user
      });
      /*
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });*/
    });
  })(req,res,next);
};

exports.logout = function(req, res) {
  req.logout();
  res.cookie('jwttoken', '');
  res.redirect('/login');
  /*
  res.status(200).json({
    status: 'Bye!'
  });*/
};

//Retorna un usere especificando el ID
exports.findById = function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
  var decoded = Verify.verify(token);
  if (decoded) {
    if (decoded._doc.admin) {
      User.findById(req.params.id, function(err, user) {
    		if(err) return res.send(500, err.message);

    		console.log('GET /users/' + req.params.id);
    		res.status(200).jsonp(user);
    	});
    }
    else res.redirect('../login');
  }
  else res.redirect('../error');
};

exports.registerUser = function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
  var decoded = Verify.verify(token);
  console.log("token users ", token);
  if (decoded) {
    if (decoded._doc.admin) {
      // req.body.username = 'admin';
      // req.body.password = 'admin';
      User.register(new User({ username : req.body.username }),
      req.body.password, function(err, user) {
        // user.admin = true;
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
    else res.redirect('../login');
  }
  else res.redirect('../error');
};

//Actualizar un registro usere en la DB (PUT)
exports.updateUser = function(req, res) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
  var decoded = Verify.verify(token);
  if (decoded) {
    if (decoded._doc.admin) {
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
    }
    else res.redirect('../login');
  }
  else res.redirect('../error');
};


///Eliminar un registro proveedor de la BD (DELETE)
exports.deleteUser = function(req, res) {

  var idUser = req.params.id;

  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
  var decoded = Verify.verify(token);
  if (decoded) {
    if (decoded._doc.admin) {
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
    }
    else res.redirect('../login');
  }
  else res.redirect('../error');
};
