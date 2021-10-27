const express = require('express');
const products = require('../controllers/products');

const router = express.Router();

// // routes
router.get('/', products.search);
router.get('/:productId', products.detail);

module.exports = router;
