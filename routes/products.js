var express = require('express');
var router = express.Router();
var productController = require('../controllers/product');

router.get('/', productController.findAllProducts);

//router.get('/products/:id', productController.findById);

router.post('/register', productController.addProduct);

router.get('/update', productController.updateProduct);

router.get('/delete/:id', productController.deleteProduct);


module.exports = router;