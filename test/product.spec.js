const Product = require('../models/product'); // Sellers and Admin
const ProductControllers = require('../controllers/product');
var mongoose = require("mongoose");
var chai = require('chai');
var chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
var server = require('../app');
chai.use(chaiHttp);

describe('Product module', () => {

  // new User({'username': 'cjg', 'password': 'cjg'}, function(err) {
  //   if (!err) console.log('deleted!');
  //   else console.log('error deleting');
  // }).save();

  beforeEach(function(done){
    done();
  });
  afterEach(function(done){
    Product.collection.drop();
    done();
  });

  it('should register a product', function (done) { // Create
    chai.request(server)
    .post('/products/register')
    .send({'code': 'Super', 'name': 'Man', 'amount': 3, 'price': 30000, 'stock': 20, 'suplier': 'colombina', 'sales_unit': 'hdgshj'})
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.status.should.equal('Registration Successful!');
      done();
    });
  });

  it('should show all products', function (done) { // Read
    chai.request(server)
    .get('/products')
    .end(function(err, res) {
      res.should.have.status(200);
      res.body.should.be.a('array');
      if (res.body.length > 0) res.body[0].should.be.a('object');
      done();
    });
  });

  it('should update an product with an id', function (done) { // Update
    var product = new Product( {
    code:     'req.body.code',
    name:     'req.body.name',
    amount:   20,
    price:     3000,
    stock:    4,
    suplier:  'req.body.suplier',
    sales_unit: 'req.body.sales_unit'
   // products:   'req.body.products' //Verificar como se pasaria una lista de productos
  });
    product.save(function(err, data) {
      chai.request(server)
        .get('/products/update/' + data.id)
        .send({'code': 'Super', 'name': 'Man', 'amount': 3, 'price': 30000, 'stock': 20, 'suplier': 'colombina', 'sales_unit': 'hdgshj'})
        .end(function(err, res){
          console.log("body ", res.body);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('code');
          res.body.should.have.property('name');
          res.body.should.have.property('amount');
          res.body.should.have.property('price');
          res.body.should.have.property('stock');
          res.body.should.have.property('suplider');
          res.body.should.have.property('sales_unit');
          //res.body._id.should.equal(data.id);
          done();
        });
    });
  });

  it('should delete an product with an id', function (done) { // Delete
    var product = new Product( {
    code:     'req.body.code',
    name:     'req.body.name',
    amount:   20,
    price:     3000,
    stock:    4,
    suplier:  'req.body.suplier',
    sales_unit: 'req.body.sales_unit'
    //products:   'req.body.products' //Verificar como se pasaria una lista de productos
   });
    product.save(function(err, data) {
      chai.request(server)
        .get('/products/delete/' + data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.text.should.equal('Product has been deleted');
          done();
        });
    });
  });

  /*it('should find an product with an id', function (done) {
    var user = new Product({
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
      expect(ProductControllers.login).to.be.a('function');
    });
  });

  describe('"logout"', () => {
    it('should export a function', () => {
      expect(ProductControllers.logout).to.be.a('function');
    });
  });

  // it('should login an user', function (done) {
  //   var user = new Product({
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
