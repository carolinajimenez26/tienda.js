var express = require('express');
var router = express.Router();
var Verify = require('../controllers/verify');
var userController = require('../controllers/user');
const url = require('url');

router.get('/', userController.findAllUsers);

router.post('/register', userController.registerUser);

router.get('/update', userController.updateUser);

router.get('/delete/:id', userController.deleteUser);

router.post('/login', function(req, res, next) {

  userController.login(req, res, function (info) {
    if (info.flag) {
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      var decoded = Verify.verify(token);
      if (decoded) {
        if (decoded._doc.admin) res.redirect(url.format(
          {
            pathname:"../home_admin",
            query: {
              'token': token
            }
          }
        ));
         //res.redirect('../home_admin');
        else res.redirect(url.format(
          {
            pathname:"../home",
            query: {
              'token': token
            }
          }
        ));
      }
      else res.redirect('../login');
    } else {
      console.log("Could not log in user");
      res.redirect('../error');
    }
  });
});

router.get('/logout', userController.logout);

module.exports = router;
