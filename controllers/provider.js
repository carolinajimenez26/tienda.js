var Provider = require('../models/provider');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
var Verify = require('./verify');

//Retornar todos los proveedores
exports.findAllProviders = function(req, res) {

	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
	var decoded = Verify.verify(token);
	if (decoded) {
	  if (decoded._doc.admin) {
			Provider.find(function(err, data) {
				if(err) res.send(500, err.message);

				console.log('GET /providers');
				//res.status(200).jsonp(providers);
				res.render('providers',{providers:data});

			});
		}
	  else res.redirect('../login');
	}
	else res.redirect('../error');

};


//Retorna un proveedor especificando el ID
exports.findById = function(req, res) {

	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
	var decoded = Verify.verify(token);
	if (decoded) {
	  if (decoded._doc.admin) {
			Provider.findById(req.params.id, function(err, provider)
			{
				if(err) return res.send(500, err.message);

				console.log('GET /providers/' + req.params.id);
				res.status(200).jsonp(provider);
			});
		}
	  else res.redirect('../login');
	}
	else res.redirect('../error');
};


//Insertar un nuevo proveedor en la DB  (POST)
exports.addProvider = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
	var decoded = Verify.verify(token);
	if (decoded) {
	  if (decoded._doc.admin) {
			var provider = new Provider({
				NIT: 		req.body.nit,
				name: 		req.body.name,
				email: 		req.body.email,
				phone: 		req.body.phone,
				address: 	req.body.address,
				products: 	req.body.products	//Verificar como se pasaria una lista de productos
			});

			provider.save(function(err, provider) {
				if(err) return res.status(500).send(err.message);
				res.redirect('/providers');
				//res.status(200).jsonp(provider);
			});
		}
	  else res.redirect('../login');
	}
	else res.redirect('../error');
};


//Actualizar un registro proveedor en la DB (PUT)
exports.updateProvider = function(req, res) {

	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
	var decoded = Verify.verify(token);
	if (decoded) {
	  if (decoded._doc.admin) {
			Provider.findById(req.query._id, function(err, provider) {
				console.log('provider', provider);

				provider.NIT= 			req.query.NIT,
				provider.name= 			req.query.name,
				provider.email= 		req.query.email,
				provider.phone= 		req.query.phone,
				provider.address= 		req.query.address

				//provider.products= 		req.body.products	//Verificar como se pasaria una lista de productos


				provider.save(function(err) {
					if(err) return res.status(500).send(err.message);
					//res.status(200).jsonp(provider);
					res.redirect('/providers');
				});
			});
		}
	  else res.redirect('../login');
	}
	else res.redirect('../error');
};


//Eliminar un registro proveedor de la BD (DELETE)
exports.deleteProvider = function(req, res) {

	var idProvider = req.params.id;

	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
	var decoded = Verify.verify(token);
	if (decoded) {
	  if (decoded._doc.admin) {
			Provider.findById(idProvider, function(err, provider) {
				provider.remove(function(err) {
					if(err) return res.render('error', {
						message: 'Se ha producido un error. Contacte con el administrador.',
						error: null
					});//res.status(500).send(err.message);
					//res.status(200).send();
					res.redirect('/providers');
				});
			});
		}
	  else res.redirect('../login');
	}
	else res.redirect('../error');
};

exports.sendEmail = function(req, res, next) {

	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.jwttoken;
	var decoded = Verify.verify(token);
	if (decoded) {
	  if (decoded._doc.admin) {
			var transporter = nodemailer.createTransport({
		        service: 'Gmail',
		        auth: {
		            user: 'tiendajss', // Your email id
		            pass: 'tiendajs123' // Your password
		        }
		  });

		  var mailOptions = {
		    to: req.body.email, // list of receivers
		    subject: req.body.subject, // Subject line
		    html: req.body.message
		  };

		  transporter.sendMail(mailOptions, function(error, info) {
		    if (error) {
		        console.log(error);
		        return res.render('error', {
							message: 'Se ha producido un error. Contacte con el administrador.',
							error: null
						});
		    } else {
		        console.log('Mensaje enviado: ' + info.response);
		        //res.render('index.ejs');
		        res.redirect('/providers');
		    };
		  });
		}
	  else res.redirect('../login');
	}
	else res.redirect('../error');
};
