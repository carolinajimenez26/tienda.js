const User = require('../models/user'); // Sellers and Admin
const UserControllers = require('../controllers/user');
var mongoose = require("mongoose");
var chai = require('chai');
var chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
var server = require('../app');
chai.use(chaiHttp);

describe('User module', function() {

  // new User({'username': 'cjg', 'password': 'cjg'}, function(err) {
  //   if (!err) console.log('deleted!');
  //   else console.log('error deleting');
  // }).save();

  beforeEach(function(done){
    done();
  });
  afterEach(function(done){
    User.collection.drop();
    done();
  });

  describe('POST /users/register', function() {
    it('should register a user', function (done) { // Create
      chai.request(server)
      .post('/users/register')
      .send({'firstname': 'Super', 'lastname': 'Man', 'username': 'superman', 'password': 'superman'})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.status.should.equal('Registration Successful!');
        done();
      });
    });
  });

  describe('GET /users', function() {
    it('should show all users', function (done) { // Read
      chai.request(server)
      .get('/users')
      .end(function(err, res) {
        res.should.have.status(200);
        // res.body.should.be.a('array');
        // if (res.body.length > 0) res.body[0].should.be.a('object');
        done();
      });
    });
  });

  describe('GET /users', function() {
    it('should update an user with an id', function (done) { // Update
      var user = new User({
        firstname: 'Bat',
        lastname: 'Man',
        username: 'batman',
        password: 'robin'
      });
      user.save(function(err, data) {
        chai.request(server)
          .post('/users/update/' + data.id)
          .send({'firstname': 'Bat', 'lastname': 'Man', 'username': 'batman', 'password': 'batman'})
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('firstname');
            res.body.should.have.property('lastname');
            res.body.should.have.property('username');
            res.body.should.have.property('password');
            res.body.firstname.should.equal('Bat');
            res.body.lastname.should.equal('Man');
            res.body.username.should.equal('batman');
            res.body.password.should.equal('batman');
            res.body._id.should.equal(data.id);
            done();
          });
      });
    });
  });

  describe('GET /users/delete/:id', function() {
    it('should delete an user with an id', function (done) { // Delete
      var user = new User({
        firstname: 'Wonder',
        lastname: 'Woman',
        username: 'ww',
        password: 'ww'
      });
      user.save(function(err, data) {
        chai.request(server)
          .get('/users/delete/' + data.id)
          .end(function(err, res){
            res.should.have.status(200);
            res.text.should.equal('User has been deleted');
            done();
          });
      });
    });
  });

  describe('GET /users/:id', function() {
    it('should find an user with an id', function (done) {
      var user = new User({
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
  });

  describe('"login"', () => {
    it('should export a function', () => {
      expect(UserControllers.login).to.be.a('function');
    });
  });

  describe('"logout"', () => {
    it('should export a function', () => {
      expect(UserControllers.logout).to.be.a('function');
    });
  });

  // it('should login an user', function (done) {
  //   var user = new User({
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
  // });

});
