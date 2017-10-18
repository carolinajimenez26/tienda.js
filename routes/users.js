var express = require('express');
var router = express.Router();
var Verify = require('./verify');
var clientController = require('../controllers/client');

router.get('/', Verify.verifyAdmin, clientController.findAllClients);

router.post('/register', clientController.registerClient);

router.post('/login', clientController.login);

router.get('/logout', clientController.logout);

module.exports = router;
