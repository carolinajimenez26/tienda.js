var express = require('express');
var router = express.Router();
var Verify = require('../controllers/verify');
var userController = require('../controllers/user');

router.get('/', /*Verify.verifyAdmin, */userController.findAllUsers);

router.post('/register', userController.registerUser);

router.get('/update', userController.updateUser);

router.get('/delete/:id', userController.deleteUser);

// router.post('/login', userController.login);

router.post('/login', function(req, res, next) {

  userController.login(req, res, function (info) {
    if (info.flag) {
      req.user = info.user;
      Verify.verify(req, res, next);
    } else {
      console.log("Error, could not log in");
      res.redirect('../login');
    }
  });
});

router.get('/logout', userController.logout);

module.exports = router;
