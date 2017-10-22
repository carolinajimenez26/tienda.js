var express = require('express');
var router = express.Router();
var providerController = require('../controllers/provider');

router.get('/', providerController.findAllProviders);

//router.get('/providers/:id', providerController.findById);

router.post('/register', providerController.addProvider);

router.put('/update/:id', providerController.updateProvider);

router.delete('/delete/:id', providerController.deleteProvider);


module.exports = router;