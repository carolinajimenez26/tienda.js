const Provider = require('../models/provider'); // Sellers and Admin
const ProviderControllers = require('../controllers/provider');
var mongoose = require("mongoose");
var chai = require('chai');
var chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
var server = require('../app');
chai.use(chaiHttp);

describe('Provider module', () => {

  // new User({'username': 'cjg', 'password': 'cjg'}, function(err) {
  //   if (!err) console.log('deleted!');
  //   else console.log('error deleting');
  // }).save();

  beforeEach(function(done){
    done();
  });
  afterEach(function(done){
    Provider.collection.drop();
    done();
  });

  it('should register a provider', function (done) { // Create
    chai.request(server)
    .post('/providers/register')
    .send({'nit': 'Super', 'name': 'Man', 'email': 'superman', 'phone': 'superman', 'address': 'blabla'})
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.status.should.equal('Registration Successful!');
      done();
    });
  });

  it('should show all providers', function (done) { // Read
    chai.request(server)
    .get('/providers')
    .end(function(err, res) {
      res.should.have.status(200);
      res.body.should.be.a('array');
      if (res.body.length > 0) res.body[0].should.be.a('object');
      done();
    });
  });

  it('should update an provider with an id', function (done) { // Update
    var provider = new Provider( {
    NIT:    'req.body.nit',
    name:     'req.body.name',
    email:    'req.body.email',
    phone:    'req.body.phone',
    address:  'req.body.address',
   // products:   'req.body.products' //Verificar como se pasaria una lista de productos
  });
    provider.save(function(err, data) {
      chai.request(server)
        .get('/providers/update/' + data.id)
        .send({'nit': 'Super', 'name': 'Woman', 'email': 'superman', 'phone': 'superman', 'address': 'blabla'})
        .end(function(err, res){
          console.log("body ", res.body);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('nit');
          res.body.should.have.property('name');
          res.body.should.have.property('email');
          res.body.should.have.property('phone');
          res.body.should.have.property('address');
          res.body.should.have.property('products');
          //res.body._id.should.equal(data.id);
          done();
        });
    });
  });

  it('should delete an provider with an id', function (done) { // Delete
    var provider = new Provider( {
    NIT:    'req.body.nit',
    name:     'req.body.name',
    email:    'req.body.email',
    phone:    'req.body.phone',
    address:  'req.body.address',
    //products:   'req.body.products' //Verificar como se pasaria una lista de productos
   });
    provider.save(function(err, data) {
      chai.request(server)
        .get('/providers/delete/' + data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.text.should.equal('Provider has been deleted');
          done();
        });
    });
  });

  /*it('should find an provider with an id', function (done) {
    var user = new Provider({
      firstname: 'Green',
      lastname: 'Lantern',
      username: 'green',
      password: 'green'
    });
    user.save(function(err, data) {
      chai.request(server)
        .get('/users/' + data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('firstname');
          res.body.should.have.property('lastname');
          res.body.should.have.property('username');
          res.body.should.have.property('password');
          res.body.firstname.should.equal('Green');
          res.body.lastname.should.equal('Lantern');
          res.body.username.should.equal('green');
          res.body.password.should.equal('green');
          res.body._id.should.equal(data.id);
          done();
        });
    });
  });

  describe('"login"', () => {
    it('should export a function', () => {
      expect(ProviderControllers.login).to.be.a('function');
    });
  });

  describe('"logout"', () => {
    it('should export a function', () => {
      expect(ProviderControllers.logout).to.be.a('function');
    });
  });

  // it('should login an user', function (done) {
  //   var user = new Provider({
  //     firstname: 'Spider',
  //     lastname: 'Man',
  //     username: 'spider',
  //     password: 'spider'
  //   });
  //   Register();
  //   user.save(function(err, data) {
  //     chai.request(server)
  //       .post('/users/login')
  //       .send({'username': 'spider', 'password': 'spider'})
  //       .end(function(err, res){
  //         console.log("body ", res.body);
  //         res.should.have.status(200);
  //         res.should.be.json;
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('username');
  //         res.body.should.have.property('password');
  //         res.body.username.should.equal('spider');
  //         res.body.password.should.equal('spider');
  //         res.body._id.should.equal(data.id);
  //         done();
  //       });
  //   });
  // });

  // it('should logout an user', function (done) {
  //   user.save(function(err, data) {
  //     chai.request(server)
  //       .get('/users/logout')
  //       .end(function(err, res){
  //         console.log("body ", body);
  //         res.should.have.status(200);
  //         res.should.be.json;
  //         // res.body.should.be.a('object');
  //         done();
  //       });
  //   });
  // });*/

});
