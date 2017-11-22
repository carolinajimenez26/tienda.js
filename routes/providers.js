var express = require('express');
var router = express.Router();
var providerController = require('../controllers/provider');

router.get('/', providerController.findAllProviders);

//router.get('/providers/:id', providerController.findById);

router.post('/register', providerController.addProvider);

router.post('/send-email', providerController.sendEmail);

router.get('/update', providerController.updateProvider);

router.get('/delete/:id', providerController.deleteProvider);


module.exports = router;
