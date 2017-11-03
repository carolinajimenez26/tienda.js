const User = require('../models/provider'); // Sellers and Admin
const UserControllers = require('../controllers/provider');
var mongoose = require("mongoose");
var chai = require('chai');
var chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
var server = require('../app');
chai.use(chaiHttp);
