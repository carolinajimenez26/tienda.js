var express = require('express');
var router = express.Router();
var productController = require('../controllers/product');

router.get('/', productController.findAllProducts);

router.get('/:id', productController.findById);

router.post('/search', productController.search);

module.exports = router;
