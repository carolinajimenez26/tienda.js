const Product = require('../models/product'); // Sellers and Admin
const ProductControllers = require('../controllers/product');
var mongoose = require("mongoose");
var chai = require('chai');
var chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
var server = require('../app');
chai.use(chaiHttp);

describe('Product module', function() {

  beforeEach(function(done){
    done();
  });
  afterEach(function(done){
    Product.collection.drop();
    done();
  });

  describe('POST /products/register', function() {
    it('should register a product', function (done) { // Create
      chai.request(server)
      .post('/products/register')
      .send({'code': '1234', 'name': 'Bombom', 'amount': 3, 'price': 30000, 'stock': 20, 'suplier': 'Colombina', 'sales_unit': 'bolsas'})
      .end(function(err, res) {
        res.should.have.status(200);
        // should render
        done();
      });
    });
  });

  describe('GET /products', function() {
    it('should show all products', function (done) { // Read
      chai.request(server)
      .get('/products')
      .end(function(err, res) {
        res.should.have.status(200);
        // should render
        done();
      });
    });
  });

  describe('POST /products/update/:id', function() {
    it('should update a product with an id', function (done) { // Update
      var product = new Product({
      code:     '1111',
      name:     'Chocolate',
      amount:   20,
      price:     3000,
      stock:    4,
      suplier:  'Colombina',
      sales_unit: 'bolsas'
    });
    product.save(function(err, data) {
      chai.request(server)
        .post('/products/update/' + data.id)
        .send({'code':'1222', 'name':product.name, 'amount': 25, 'price':2000, 'stock':product.stock,'suplier':product.suplier, 'sales_unit': 'cajas'})
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('code');
          res.body.should.have.property('name');
          res.body.should.have.property('amount');
          res.body.should.have.property('price');
          res.body.should.have.property('stock');
          res.body.should.have.property('suplier');
          res.body.should.have.property('sales_unit');
          res.body._id.should.equal(data.id);
          done();
        });
      });
    });
  });

  describe('GET /products/delete/:id', function() {
    it('should delete an product with an id', function (done) { // Delete
      var product = new Product( {
        code:     '1111',
        name:     'Gomitas',
        amount:   20,
        price:    3000,
        stock:    4,
        suplier:  'Colombina',
        sales_unit: 'Cajas'
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
  });

});
