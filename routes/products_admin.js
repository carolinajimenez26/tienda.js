var express = require('express');
var router = express.Router();
var productController = require('../controllers/product_admin');

router.get('/', productController.findAllProducts);

router.get('/:id', productController.findById);

router.post('/search', productController.search);

router.post('/register', productController.addProduct);

router.get('/update/:id', productController.updateProduct);

router.get('/delete/:id', productController.deleteProduct);


module.exports = router;
