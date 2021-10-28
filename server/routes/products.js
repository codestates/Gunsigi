const express = require('express');
const products = require('../controllers/products');
const { tokenCheck } = require('../middlware/token');

const router = express.Router();

router.use(tokenCheck);

// // routes
router.get('/', products.search);
router.get('/:productId', products.detail);

module.exports = router;
