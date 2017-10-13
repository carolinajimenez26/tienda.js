var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var config = require('./config');

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// passport config
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;

//Enlace al controlador product
var ProductModel = require('./models/Product')(app, mongoose);//Ojo con la sintaxis
var ProductCtrl = require('./controllers/product');

var products = express.Router();

products.route('/inventory').get(ProductCtrl.findAllProducts).post(ProductCtrl.addProduct);

products.route('/inventory/:id').get(ProductCtrl.findById).put(ProductCtrl.updateProduct).delete(ProductCtrl.deleteProduct);

app.use('/inventory', products);


//Enlace al controlador client
var ClientModel = require('./models/Client')(app, mongoose);//Ojo con la sintaxis
var ClientCtrl = require('./controllers/client');

var clients = express.Router();

clients.route('/clients').get(ClientCtrl.findAllClients).post(ClientCtrl.addClient);

clients.route('/clients/:id').get(ClientCtrl.findById).put(ClientCtrl.updateClient).delete(ProductCtrl.deleteClient);

app.use('/clients', clients);


//Enlace al controlador provider
var ProviderModel = require('./models/Provider')(app, mongoose);//Ojo con la sintaxis
var ProviderCtrl = require('./controllers/provider');

var providers = express.Router();

providers.route('/providers').get(ProviderCtrl.findAllProviders).post(ProviderCtrl.addProvider);

providers.route('/providers/:id').get(ProviderCtrl.findById).put(ProviderCtrl.updateProvider).delete(ProviderCtrl.deleteProvider);

app.use('/providers', providers);