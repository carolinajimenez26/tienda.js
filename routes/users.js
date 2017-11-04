var express = require('express');
var router = express.Router();
var Verify = require('./verify');
var userController = require('../controllers/user');

router.get('/', /*Verify.verifyAdmin, */userController.findAllUsers);

router.post('/register', userController.registerUser);

router.get('/update', userController.updateUser);

router.get('/delete/:id', userController.deleteUser);

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.post('/send-email', userController.sendEmail);

module.exports = router;
